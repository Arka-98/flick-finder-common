import { KAFKA_SERVICE_TOKEN, TOPICS } from '@app/common/constants';
import { Inject, Injectable, Logger } from '@nestjs/common';
import type { ClientKafka } from '@nestjs/microservices';
import type { KafkaMessage } from 'kafkajs';

@Injectable()
export class KafkaService {
  private readonly logger = new Logger(KafkaService.name);

  constructor(
    @Inject(KAFKA_SERVICE_TOKEN) private readonly kafkaClient: ClientKafka,
  ) {}

  emit(
    topic: (typeof TOPICS)[keyof typeof TOPICS][keyof (typeof TOPICS)[keyof typeof TOPICS]],
    message: KafkaMessage,
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
