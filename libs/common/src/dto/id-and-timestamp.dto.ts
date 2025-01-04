import { ApiProperty } from '@nestjs/swagger';

export class IdAndTimestampDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;
}
