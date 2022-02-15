import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class AdMemberToGroupDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;
}
