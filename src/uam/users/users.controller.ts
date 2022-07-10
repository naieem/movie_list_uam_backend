import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { ErrorException } from 'src/utils/error.interception';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  /**
   * creating new user
   * @param createUserDto
   * @returns
   */
  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const response = await this.usersService.create(createUserDto);
      return { result: response };
    } catch (error) {
      throw new ErrorException(error);
    }
  }
  /**
   * get all users list
   * @returns
   */
  @Get('all')
  async getAllUser() {
    try {
      const response = await this.usersService.getAllUser();
      return { result: response };
    } catch (error) {
      throw new ErrorException(error);
    }
  }
  /**
   * deleting an user by email
   * @param email
   * @returns
   */
  @Get('delete')
  async deleteSingleUserByEmail(email: string) {
    try {
      const response = await this.usersService.deleteUserByEmail(email);
      return { result: response };
    } catch (error) {
      throw new ErrorException(error);
    }
  }

  @Get('test')
  @UseGuards(AuthGuard())
  testAuthRoute() {
    return {
      message: 'You did it!',
    };
  }
}
