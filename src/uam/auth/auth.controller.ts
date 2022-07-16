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
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  private cookieTokenName = this.configService.get<string>('TOKEN_COOKIE_NAME');
  constructor(
    private authService: AuthService,
    public configService: ConfigService,
  ) {}

  @Post('login')
  @IsPublic(true) // to avoid generic reponse
  @ApiResponse({
    status: 201,
    description: 'Login successfully done',
  })
  @ApiResponse({ status: 400, description: 'Credentials not valid.' })
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    try {
      const loginRespose: any = await this.authService.validateUserByPassword(
        loginUserDto,
      );
      response
        .cookie(this.cookieTokenName, loginRespose?.token, {
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
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'LoggedIn user information',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async loggedInUser(@Req() req: Request | any): Promise<IResponse> {
    try {
      return { result: req?.user };
    } catch (error) {
      throw new ErrorException(error);
    }
  }
  @Post('logout')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Logout done.',
  })
  @ApiResponse({ status: 400, description: 'Error while logout' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @IsPublic(true) // to avoid generic reponse
  async logout(@Res({ passthrough: true }) response: Response) {
    try {
      response.clearCookie(this.cookieTokenName).send({ result: 'Loggout' });
    } catch (error) {
      throw new ErrorException(error);
    }
  }
}
