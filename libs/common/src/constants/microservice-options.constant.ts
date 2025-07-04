import { Transport, type MicroserviceOptions } from '@nestjs/microservices';

export function geKafkaMicroserviceOptions(
  broker: string,
  clientId: string,
  groupId: string,
): MicroserviceOptions {
  return {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId,
        brokers: [broker],
      },
      consumer: {
        groupId,
      },
      subscribe: {
        fromBeginning: true,
      },
    },
  };
}
