import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { User } from '../users/user.interface';
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
            reject(new BadRequestException('Wrong crendentials'));
          }
        });
      } catch (error) {
        reject(new BadRequestException(error));
      }
    });
  }
  /**
   * user jwt validation
   * @param payload
   * @returns
   */
  async validateUserByJwt(payload: JwtPayload) {
    return new Promise(async (resolve, reject) => {
      try {
        const user: User = await this.usersService.getSingleUserByEmail(
          payload.email,
        );
        if (user) {
          resolve({
            email: user.email,
          });
        } else {
          reject(new UnauthorizedException());
        }
      } catch (error) {
        reject(error);
      }
    });
  }
  /**
   * create user jwt payload
   * @param user
   * @returns
   */
  createJwtPayload(user: User) {
    const data: JwtPayload = {
      email: user.email,
    };

    const jwt = this.jwtService.sign(data);

    return {
      token: jwt,
    };
  }
}
