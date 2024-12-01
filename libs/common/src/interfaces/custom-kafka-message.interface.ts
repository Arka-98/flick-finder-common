export interface CustomKafkaMessage {
  key: string;
  value: string;
  headers: Record<string, string>;
}
