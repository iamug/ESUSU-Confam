import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateGroupDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsOptional()
  @ApiProperty()
  description?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  isSearchable: boolean;
}
