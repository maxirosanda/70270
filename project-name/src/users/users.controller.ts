import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException,Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const user:User = this.usersService.create(createUserDto);
    return {status: 'success', data: user};
  }

  @Get()
  findAll(@Query("limit") limit : number) {
    const users = this.usersService.findAll(limit);
    return {status: 'success', data: users};
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    
    if(isNaN(Number(id)) || !Number.isInteger(Number(id)) || Number(id) < 1){
      throw new HttpException('Invalid id', 400);
    }

    const user = this.usersService.findOne(Number(id));
    if(!user){
      throw new HttpException('User not found', 404);
    }
    return {status: 'success', data: user};
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const message:string = this.usersService.update(Number(id), updateUserDto);
    return {status: 'success', message}
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const message:string =  this.usersService.remove(+id);
    return {status: 'success', message}
  }
}
