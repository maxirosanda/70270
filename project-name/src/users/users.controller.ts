import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException,Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return {status: 'success', data: user};
  }

  @Get()
  async findAll(@Query("limit") limit : number) {
    const users = await this.usersService.findAll(limit);
    return {status: 'success', data: users};
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {

    const user = await this.usersService.findOne(id);
    if(!user){
      throw new HttpException('User not found', 404);
    }
    return {status: 'success', data: user};
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const message:string = await this.usersService.update(id, updateUserDto);
    return {status: 'success', message}
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const message:string = await  this.usersService.remove(id);
    return {status: 'success', message}
  }
}
