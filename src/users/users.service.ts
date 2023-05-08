import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create.user.dto';
import { User } from '../schema/user.chema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUsers() {
    const users = await this.userModel.find();
    return users;
  }

  async createUser(userDto: CreateUserDto) {
    console.log('this is condole.log and thsi will be change in future');
    const user = await this.userModel.create(userDto);
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    return user;
  }
}
