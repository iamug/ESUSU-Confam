import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserResponse {
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
  @IsString()
  @ApiProperty()
  email: string;

  createdAt: Date;

  updatedAt?: Date;
}
