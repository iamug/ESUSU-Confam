import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumberString } from 'class-validator';

export class AuthUserDto {
  id: string;

  name: string;

  email: string;

  phoneNumber?: string;

  password?: string;

  isEnabled: boolean;

  createdAt: Date;

  updatedAt: Date;
}

export class AuthResponseDto {
  token: string;
  user: AuthUserDto;
}
