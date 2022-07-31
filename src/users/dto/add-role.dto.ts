/** @format */

import { IsNumber, IsString } from 'class-validator'

export class AddRole {
  @IsString({ message: 'Must to be string' })
  readonly value: string

  @IsNumber({}, { message: 'Must to be number' })
  readonly userId: number
}
