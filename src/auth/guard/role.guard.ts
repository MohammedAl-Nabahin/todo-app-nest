import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../roles/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.get<Role>(
      'roles',
      context.getHandler(),
    );
    if (!requiredRole) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    const role = user.role.toLowerCase();

    if (role !== requiredRole[0]) {
      throw new ForbiddenException('Only admins can access this resource');
    }

    return true;
  }
}
