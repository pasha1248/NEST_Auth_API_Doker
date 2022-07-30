/** @format */

import { UsersService } from './users.service'
import { Body, Controller, Get, Inject, Post } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'

@Controller('users')
export class UsersController {
  constructor(private UsersService: UsersService) {}

  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.UsersService.createUser(userDto)
  }

  @Get()
  getAll() {
    return this.UsersService.getAllUsers()
  }
}
