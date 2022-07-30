/** @format */

import { RolesService } from './roles.service'
/** @format */

import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { CreateRoleDto } from './dto/create-role.dto'

@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.createRole(dto)
  }

  @Get('/:value')
  getByValue(@Param('value') value: string) {
    return this.roleService.getRoleByValue(value)
  }
}
