import { Test, TestingModule } from '@nestjs/testing';
import { UsersGroupsService } from './users-groups.service';

describe('UsersGroupsService', () => {
  let service: UsersGroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersGroupsService],
    }).compile();

    service = module.get<UsersGroupsService>(UsersGroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
