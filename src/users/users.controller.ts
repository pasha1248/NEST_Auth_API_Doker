/** @format */

import { ValidationPipe } from './../pipes/validation.pipe'
/** @format */

import { RolesGuard } from './../auth/roles.guard'
/** @format */

/** @format */

import { UsersService } from './users.service'
import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { Roles } from 'src/auth/roles-auth.decorator'
import { AddRole } from './dto/add-role.dto'
import { BanUser } from './dto/ban-user.dto'

@Controller('users')
export class UsersController {
  constructor(private UsersService: UsersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() userDto: CreateUserDto) {
    return this.UsersService.createUser(userDto)
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.UsersService.getAllUsers()
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/role')
  addRole(@Body() dtoRole: AddRole) {
    return this.UsersService.addRole(dtoRole)
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/ban')
  ban(@Body() dtoBan: BanUser) {
    return this.UsersService.ban(dtoBan)
  }
}
