import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract/abstract.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponse } from './dto/user-response.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService extends AbstractService<User> {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {
    super(usersRepository);
  }

  async findByIds(userIds: string[]): Promise<UserResponse[]> {
    try {
      let fields: (keyof User)[] = ['id', 'name', 'email', 'phoneNumber'];
      const users = await this.usersRepository.findByIds(userIds, {
        select: fields,
      });
      return users;
    } catch (error) {
      throw new Error('Error Fetching Patients');
    }
  }
}
