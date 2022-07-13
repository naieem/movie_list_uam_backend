import {
  Controller,
  Post,
  Body,
  Res,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { ErrorException } from 'src/utils/error.interception';
import { Response, Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { IsPublic } from 'src/utils/avoid.commonResponse.decorator';
import IResponse from 'src/utils/IResponse.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @IsPublic(true) // to avoid generic reponse
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
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
  @Get('me')
  @UseGuards(AuthGuard())
  async loggedInUser(@Req() req: Request): Promise<IResponse> {
    try {
      console.log(req);
      return { result: 'ioio' };
    } catch (error) {
      throw new ErrorException(error);
    }
  }
}
