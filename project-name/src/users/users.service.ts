import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './schema/user.schema';

@Injectable()
export class UsersService {

  users: User[];

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    this.users = []
  }


  async create(createUserDto: CreateUserDto) {
    const user = await this.userModel.create(createUserDto)
    return user
  }

  async findAll(limit: number) {
    if(limit){
      return await this.userModel.find().limit(limit);
    }
    return await this.userModel.find();
  }

  findOne(id: string) {
    return this.userModel.findOne({_id: id})
  }

  async update(id: string, updateUserDto: UpdateUserDto){
    const user = await this.userModel.findOne({_id:id})
    if(user){
      await this.userModel.updateOne({_id:id},updateUserDto)
      return "User updated successfully"
    }
    return "User not found"

  }

  async remove(id: string) {
    const user = await this.userModel.findOne({_id:id})
    if(user){
      await this.userModel.deleteOne({_id:id})
      return "User deleted successfully"
    }
    return "User not found"
  }
}
