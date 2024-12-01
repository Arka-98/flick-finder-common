import { KAFKA_SERVICE_TOKEN, TOPICS } from '@app/common/constants';
import type { CustomKafkaMessage } from '@app/common/interfaces';
import { Inject, Injectable, Logger } from '@nestjs/common';
import type { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaService {
  private readonly logger = new Logger(KafkaService.name);

  constructor(
    @Inject(KAFKA_SERVICE_TOKEN) private readonly kafkaClient: ClientKafka,
  ) {}

  emit(
    topic: (typeof TOPICS)[keyof typeof TOPICS][keyof (typeof TOPICS)[keyof typeof TOPICS]],
    message: CustomKafkaMessage,
  ) {
    this.kafkaClient.emit(topic, message).subscribe({
      next: () => {
        this.logger.log(`Event published to kafka topic ${topic}`);
      },
      error: (err) => {
        this.logger.error(
          `Error publishing event to kafka topic ${topic}: ${err}`,
        );
      },
    });
  }
}
