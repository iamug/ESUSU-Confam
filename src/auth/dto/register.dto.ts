import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email!: string;

  @IsOptional()
  @ApiProperty()
  phoneNumber!: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
