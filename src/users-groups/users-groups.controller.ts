import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersGroupsService } from './users-groups.service';
import { CreateUsersGroupDto } from './dto/create-users-group.dto';
import { UpdateUsersGroupDto } from './dto/update-users-group.dto';

@Controller('users-groups')
export class UsersGroupsController {
  constructor(private readonly usersGroupsService: UsersGroupsService) {}
}
