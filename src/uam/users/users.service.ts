import { Model } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.getSingleUserByEmail(createUserDto.email);
    if (!user) {
      const createdUser = new this.userModel(createUserDto);
      return await createdUser.save();
    } else {
      return new BadRequestException(
        'user already exists with the given email',
      );
    }
  }
  async getAllUser(): Promise<any> {
    return await this.userModel.find();
  }
  async deleteUserByEmail(email: string): Promise<any> {
    return await this.userModel.deleteOne({ email: email });
  }
  async getSingleUserByEmail(email: string): Promise<any> {
    return await this.userModel.findOne({ email: email });
  }
}
