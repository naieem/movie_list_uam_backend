import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { ErrorException } from 'src/utils/error.interception';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Res() response: Response) {
    try {
      const loginRespose: any = await this.authService.validateUserByPassword(
        loginUserDto,
      );
      response
        .cookie('clientToken', loginRespose?.token, {
          expires: new Date(Date.now() + 900000),
          httpOnly: true,
        })
        .send({ result: loginRespose });
    } catch (error) {
      throw new ErrorException(error);
    }
  }
}
