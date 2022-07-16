import { Controller, Get, Post, Body, Delete } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ErrorException } from 'src/utils/error.interception';
import { DeleteUserDto } from './dto/delete-user.dto';
import IResponse from '../../utils/IResponse.interface';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  /**
   * creating new user
   * @param createUserDto
   * @returns
   */
  @Post('create')
  @ApiResponse({
    status: 201,
    description: 'User creation done',
  })
  @ApiResponse({ status: 400, description: 'User creation errors' })
  async create(@Body() createUserDto: CreateUserDto): Promise<IResponse> {
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
  @ApiResponse({
    status: 200,
    description: 'Getting all users array',
  })
  @ApiResponse({ status: 400, description: 'User listing errors' })
  async getAllUser(): Promise<IResponse> {
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
  @Delete('delete')
  @ApiResponse({
    status: 200,
    description: 'Deletion of user done',
  })
  @ApiResponse({ status: 400, description: 'User deletion errors' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async deleteSingleUserByEmail(
    @Body() deleteUserDto: DeleteUserDto,
  ): Promise<IResponse> {
    try {
      const response = await this.usersService.deleteUserByEmail(
        deleteUserDto.email,
      );
      return { result: response };
    } catch (error) {
      throw new ErrorException(error);
    }
  }
}
