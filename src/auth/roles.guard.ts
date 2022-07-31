/** @format */

import { JwtService } from '@nestjs/jwt'
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { Reflector } from '@nestjs/core'
import { ROLES_KEY } from './roles-auth.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()]
      )

      if (!requiredRoles) {
        return true
      }
      const req = context.switchToHttp().getRequest()
      const authHeaeder = req.headers.authorization
      const bearer = authHeaeder.split(' ')[0]
      const token = authHeaeder.split(' ')[1]

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: 'User is not found' })
      }

      const user = this.jwtService.verify(token)
      req.user = user
      return user.roles.some(role => requiredRoles.includes(role.value))
    } catch (error) {
      throw new HttpException('User do not have access', HttpStatus.FORBIDDEN)
    }
  }
}
