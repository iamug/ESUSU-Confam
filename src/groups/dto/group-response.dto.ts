import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class GroupResponse {
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
  description?: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  isSearchable: boolean;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  creatorId: string;

  createdAt: Date;

  updatedAt?: Date;
}
