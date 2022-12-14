/** @format */

import { RolesService } from './../roles/roles.service'
/** @format */
import { InjectModel } from '@nestjs/sequelize'
/** @format */

// import {  } from 'sequelize-typescript'
/** @format */

import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './users.model'
import { AddRole } from './dto/add-role.dto'
import { BanUser } from './dto/ban-user.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto)
    const role = await this.roleService.getRoleByValue('ADMIN')
    await user.$set('roles', [role.id])
    user.roles = [role]
    return user
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } })
    return users
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    })
    return user
  }

  async addRole(dto: AddRole) {
    const user = await this.userRepository.findByPk(dto.userId)
    const role = await this.roleService.getRoleByValue(dto.value)
    if (role && user) {
      await user.$add('role', role.id)
      return dto
    }
    throw new HttpException('User is not found', HttpStatus.FORBIDDEN)
  }

  async ban(dtoBan: BanUser) {
    const user = await this.userRepository.findByPk(dtoBan.userId)
    if (!user) {
      throw new HttpException('User is not found', HttpStatus.FORBIDDEN)
    }
    user.banned = !user.banned
    user.banReason = dtoBan.banReason
    await user.save()
    return user
  }
}
