import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { Request, ForbiddenException } from '@nestjs/common';
import { Get, BadRequestException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/shared/decorators/request/public-request.decorator';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { AuthResponseDto, AuthUserDto } from './dto/auth-response.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@ApiTags('Auth')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private usersService: UsersService,
  ) {}

  @ApiBearerAuth()
  @Public()
  @Post('register')
  async register(@Body() body: RegisterDto): Promise<AuthResponseDto> {
    try {
      const newUser = { ...body, isEnabled: true };
      const user = await this.authService.register(newUser);
      const token = await this.authService.getToken(user.id);
      return { token, user: { ...user, password: undefined } };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @ApiBearerAuth()
  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(
    @Request() req,
    @Body() data: LoginDto,
  ): Promise<AuthResponseDto> {
    return req.user;
  }

  @Get('profile')
  async getProfile(@Request() req): Promise<{ user: AuthUserDto }> {
    const { id } = req.user;
    if (!id) throw new ForbiddenException();
    const user = await this.usersService.findOne({ id: id });
    return { user: { ...user, password: undefined } };
  }
}
