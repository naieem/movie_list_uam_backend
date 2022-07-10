import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/dto/login-user.dto';

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
      return { message: error, code: HttpStatus.BAD_REQUEST };
    }
  }
}
