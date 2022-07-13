import { Model } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}
  /**
   * create new user
   * @param createUserDto
   * @returns user
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.getSingleUserByEmail(createUserDto.email);
        if (!user) {
          const userModel = new this.userModel(createUserDto);
          const createdUser = await userModel.save();
          resolve(createdUser);
        } else {
          reject(
            new BadRequestException('user already exists with the given email'),
          );
        }
      } catch (error) {
        reject(new BadRequestException(error));
      }
    });
  }
  /**
   * Get all user data
   * @returns user[]
   */
  async getAllUser(): Promise<User[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const users = await this.userModel.find();
        resolve(users);
      } catch (error) {
        reject(new BadRequestException(error));
      }
    });
  }
  /**
   * Delete user by email
   * @param email
   * @returns
   */
  async deleteUserByEmail(email: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const deletedUser = await this.userModel.deleteOne({ email: email });
        resolve(deletedUser);
      } catch (error) {
        reject(new BadRequestException(error));
      }
    });
  }
  /**
   * Query single user by email
   * @param email
   * @returns user
   */
  async getSingleUserByEmail(email: string): Promise<User> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.userModel.findOne({ email: email });
        resolve(user);
      } catch (error) {
        reject(new BadRequestException(error));
      }
    });
  }
}
