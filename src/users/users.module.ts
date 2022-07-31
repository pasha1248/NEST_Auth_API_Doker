/** @format */

import { forwardRef } from '@nestjs/common'
/** @format */

/** @format */

import { RolesModule } from './../roles/roles.module'
/** @format */

import { SequelizeModule } from '@nestjs/sequelize'
/** @format */

import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { User } from './users.model'
import { Role } from 'src/roles/roles.model'
import { UserRoles } from 'src/roles/user-roles.model'
import { AuthModule } from 'src/auth/auth.module'

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles]),
    RolesModule,
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
