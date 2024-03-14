import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const { username } = await this.userService.findByUsername(
        createUserDto.username,
      );

      if (username !== createUserDto.username) {
        const data = await this.userService.create(createUserDto);
        return res.status(201).json({
          data: data,
          message: 'User Created Successfully',
        });
      } else {
        return res.status(400).json({
          statusCode: 400,
          message: 'Username Already Exists',
        });
      }
    } catch (err) {
      return res.status(500).json({
        message: 'Internal Server Error Cannot Create User',
        details: err.message,
      });
    }
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('user/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch('user:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete('user/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
