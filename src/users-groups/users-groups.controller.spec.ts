import { Test, TestingModule } from '@nestjs/testing';
import { UsersGroupsController } from './users-groups.controller';
import { UsersGroupsService } from './users-groups.service';

describe('UsersGroupsController', () => {
  let controller: UsersGroupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersGroupsController],
      providers: [UsersGroupsService],
    }).compile();

    controller = module.get<UsersGroupsController>(UsersGroupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
