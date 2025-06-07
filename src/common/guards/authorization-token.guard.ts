import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { PUBLIC_RESOURCE_METADATA_KEY } from 'src/common/decorators/public-ressource-metadata';

@Injectable()
export class AuthorizationTokenGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const isRequestedResourcePublic = this.reflector.get<boolean>(
      PUBLIC_RESOURCE_METADATA_KEY,
      context.getHandler(),
    );

    if (isRequestedResourcePublic) {
      return true;
    }

    const authToken = request.headers['authorization'];

    if (!authToken) {
      return false;
    }

    return true;
  }
}
