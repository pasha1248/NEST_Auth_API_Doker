/** @format */

import {
  Model,
  Table,
  Column,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript'
import { Role } from 'src/roles/roles.model'
import { UserRoles } from 'src/roles/user-roles.model'

interface UsercCreationAttribut {
  email: string
  password: string
}

@Table({ tableName: 'users' })
export class User extends Model<User, UsercCreationAttribut> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string

  @Column({ type: DataType.STRING, allowNull: false })
  password: string

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  banned: boolean

  @Column({ type: DataType.STRING, allowNull: true })
  banReason: string

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[]
}
