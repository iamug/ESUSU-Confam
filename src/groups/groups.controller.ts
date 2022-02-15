import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/shared/decorators/request/authenticated-user.decorator';
import { UsersGroupsService } from 'src/users-groups/users-groups.service';
import { UsersService } from 'src/users/users.service';
import { UserResponse } from 'src/users/dto/user-response.dto';
import { ILike, Like } from 'typeorm';
import { GroupResponse } from './dto/group-response.dto';
import { IPaginateResult } from 'src/common/paginate-result.interface';
import { AdMemberToGroupDto } from './dto/add-member.dto';

@ApiTags('Groups')
@Controller('groups')
export class GroupsController {
  constructor(
    private readonly groupsService: GroupsService,
    private readonly usersgroupsService: UsersGroupsService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  async create(
    @User('id') userId: string,
    @Body() body: CreateGroupDto,
  ): Promise<any> {
    const data = { ...body, creatorId: userId };
    const group = await this.groupsService.create(data);
    const userToGroup = { userId, groupId: group.id };
    const addUserToGroup = await this.usersgroupsService.create(userToGroup);
    return group;
  }

  @Post(':groupId/members')
  async addMember(
    @Param('groupId') groupId: string,
    @User('id') userId: string,
    @Body() body: AdMemberToGroupDto,
  ): Promise<{ message: string }> {
    const group = await this.groupsService.findOne({ id: groupId });
    if (!group) throw new NotFoundException(' Group Does Not Exist');
    const user = await this.usersService.findOne({ email: body.email });
    if (!user) throw new NotFoundException(' User Does Not Exist');
    const userToGroupQuery = { userId: user.id, groupId };
    const userInGroup = await this.usersgroupsService.findOne({
      where: userToGroupQuery,
    });
    if (userInGroup)
      throw new BadRequestException('USer Already Exists In Group');
    const userToGroup = { userId: user.id, groupId };
    const addUserToGroup = await this.usersgroupsService.create(userToGroup);
    if (!addUserToGroup)
      throw new BadRequestException('Error Adding User To Group.');
    return { message: 'User Successfully Added To Group' };
  }

  @Get()
  async SearchGroups(
    @Query() { page, limit }: Record<string, number>,
    @Query('name') name: string,
  ): Promise<IPaginateResult<GroupResponse[]>> {
    const options = { page: page && +page, limit: limit && +limit };
    const groups = await this.groupsService.find({
      where: { name: ILike(`%${name}%`), isSearchable: true },
      options,
    });
    return groups;
  }

  @Get(':id')
  async getGroup(@Param('id') id: string): Promise<GroupResponse> {
    const group = await this.groupsService.findOne({
      where: { id: id },
    });
    if (!group) throw new NotFoundException('Group Does Not Exist.');
    return group;
  }

  @Get(':groupId/members')
  async getMembers(
    @Param('groupId') groupId: string,
    @User('id') userId: string,
    @Query() { page, limit }: Record<string, number>,
  ): Promise<UserResponse[]> {
    const group = await this.groupsService.findOne({ where: { id: groupId } });
    if (group.creatorId != userId)
      throw new BadRequestException(' User is Not Admin of This Group.');
    const options = { page: page && +page, limit: limit && +limit };
    const users = await this.usersgroupsService.find({
      where: { groupId: groupId },
      options,
    });
    const userIds = users.data.map((a) => a.userId);
    const usersData = await this.usersService.findByIds(userIds);
    return usersData;
  }
}
