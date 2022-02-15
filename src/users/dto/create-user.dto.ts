import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty()
  id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  phoneNumber?: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  password: string;

  createdAt: Date;

  updatedAt?: Date;
}
