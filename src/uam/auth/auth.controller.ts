import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { ErrorException } from 'src/utils/error.interception';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      const loginRespose = await this.authService.validateUserByPassword(
        loginUserDto,
      );
      return { result: loginRespose };
    } catch (error) {
      throw new ErrorException(error);
    }
  }
}
