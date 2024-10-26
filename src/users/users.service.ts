// src/users/users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schema/user.schema';
import { UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getMe(userId: string) {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return {
      success: true,
      data: {
        id: user._id,
        fullName: user.fullName,
        username: user.username,
      },
    };
  }

  async updateMe(userId: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.fullName = updateUserDto.fullName;
    await user.save();
    return {
      success: true,
      message: 'User information updated successfully',
      data: {
        id: user._id,
        fullName: user.fullName,
        username: user.username,
      },
    };
  }
}