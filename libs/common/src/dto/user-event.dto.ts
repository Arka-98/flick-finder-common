import { IsEmail, IsEnum, IsMongoId, IsString } from 'class-validator';
import { RolesEnum } from '../enums';

export class UserEventDto {
  @IsMongoId()
  _id: string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsEnum(RolesEnum)
  role: RolesEnum;
}
