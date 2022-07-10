import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

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
    const response = await this.usersService.create(createUserDto);
    return { result: response };
  }
  /**
   * get all users list
   * @returns
   */
  @Get('all')
  async getAllUser() {
    const response = await this.usersService.getAllUser();
    return { result: response };
  }
  /**
   * deleting an user by email
   * @param email
   * @returns
   */
  @Get('delete')
  async deleteSingleUserByEmail(email: string) {
    const response = await this.usersService.deleteUserByEmail(email);
    return { result: response };
  }

  @Get('test')
  @UseGuards(AuthGuard())
  testAuthRoute() {
    return {
      message: 'You did it!',
    };
  }
}
