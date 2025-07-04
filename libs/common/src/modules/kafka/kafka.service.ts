import { KAFKA_SERVICE_TOKEN, TOPICS } from '@app/common/constants';
import type { CustomKafkaMessage } from '@app/common/interfaces';
import { Inject, Injectable, Logger } from '@nestjs/common';
import type { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class KafkaService {
  private readonly logger = new Logger(KafkaService.name);

  constructor(
    @Inject(KAFKA_SERVICE_TOKEN) private readonly kafkaClient: ClientKafka,
  ) {}

  async emit<T = any>(
    topic: (typeof TOPICS)[keyof typeof TOPICS][keyof (typeof TOPICS)[keyof typeof TOPICS]],
    message: CustomKafkaMessage<T>,
  ) {
    try {
      await lastValueFrom(this.kafkaClient.emit(topic, message));

      this.logger.log(`Event published to kafka topic ${topic}`);
    } catch (error) {
      this.logger.error(
        `Error publishing event to kafka topic ${topic}: ${error}`,
      );
    }
  }
}
