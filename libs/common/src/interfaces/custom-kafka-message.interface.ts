export interface CustomKafkaMessage<T = any> {
  key: string;
  value: T;
  headers: Record<string, string>;
}
