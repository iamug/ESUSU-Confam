import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract/abstract.service';
import { Repository } from 'typeorm';
import { CreateUsersGroupDto } from './dto/create-users-group.dto';
import { UpdateUsersGroupDto } from './dto/update-users-group.dto';
import { UsersGroups } from './entities/users-group.entity';

@Injectable()
export class UsersGroupsService extends AbstractService<UsersGroups> {
  constructor(
    @InjectRepository(UsersGroups)
    private usersgroupsRepository: Repository<UsersGroups>,
  ) {
    super(usersgroupsRepository);
  }
}
