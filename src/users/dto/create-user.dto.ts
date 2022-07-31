/** @format */

import { IsEmail, IsString, Length } from 'class-validator'

export class CreateUserDto {
  @IsString()
  @IsEmail({}, { message: 'Email is bad' })
  readonly email: string

  @IsString()
  @Length(4, 20, { message: 'Possword need difficult' })
  readonly password: string
}
