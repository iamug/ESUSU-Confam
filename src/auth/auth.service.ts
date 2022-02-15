import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersGroupsService } from 'src/users-groups/users-groups.service';
import { UsersService } from 'src/users/users.service';
import { AuthResponseDto, AuthUserDto } from './dto/auth-response.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) // private usersGroupsService: UsersGroupsService,
  {}

  private getTokenExpires() {
    return 12 * 60 * 60;
  }

  async getToken(userId: string): Promise<string> {
    const payload = { id: userId };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWTSECRETKEY,
      expiresIn: this.getTokenExpires(),
    });
    return accessToken;
  }

  async register(data: RegisterDto): Promise<AuthUserDto> {
    const emailExists = await this.usersService.findOne({ email: data.email });
    if (emailExists)
      throw new BadRequestException('Email address already exists in database');
    const user = await this.usersService.create(data);
    return user;
  }

  async signin(data: LoginDto): Promise<AuthResponseDto> {
    const { email, password } = data;
    const user = await this.usersService.findOne({ email: email });
    if (!user) throw new ForbiddenException('Invalid Credentials');
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) throw new ForbiddenException('Invalid Credentials');
    const token = await this.getToken(user.id);
    return { token, user: { ...user, password: undefined } };
  }
}
