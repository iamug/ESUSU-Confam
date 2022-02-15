import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { Group } from './entities/group.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { UsersGroupsModule } from 'src/users-groups/users-groups.module';

@Module({
  imports: [TypeOrmModule.forFeature([Group]), UsersGroupsModule, UsersModule],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class GroupsModule {}
