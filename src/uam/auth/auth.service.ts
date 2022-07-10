import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  /**
   * validating user by password
   * @param loginAttempt
   * @returns
   */
  async validateUserByPassword(loginAttempt: LoginUserDto) {
    // This will be used for the initial login
    const userToAttempt = await this.usersService.getSingleUserByEmail(
      loginAttempt.email,
    );
    return new Promise((resolve, reject) => {
      try {
        userToAttempt.checkPassword(loginAttempt.password, (err, isMatch) => {
          if (isMatch) {
            resolve(this.createJwtPayload(userToAttempt));
          } else {
            reject(
              new BadRequestException('User already exists with the email'),
            );
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }
  /**
   * user jwt validation
   * @param payload
   * @returns
   */
  async validateUserByJwt(payload: JwtPayload) {
    // This will be used when the user has already logged in and has a JWT
    const user = await this.usersService.getSingleUserByEmail(payload.email);

    if (user) {
      return this.createJwtPayload(user);
    } else {
      throw new UnauthorizedException();
    }
  }
  /**
   * create user jwt payload
   * @param user
   * @returns
   */
  createJwtPayload(user) {
    const data: JwtPayload = {
      email: user.email,
    };

    const jwt = this.jwtService.sign(data);

    return {
      token: jwt,
    };
  }
}
