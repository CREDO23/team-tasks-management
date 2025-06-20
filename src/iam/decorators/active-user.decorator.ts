import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { REQUEST_USER_KEY } from '../constants';
import { Request } from 'express';
import { ActiveUserData } from '../interfaces/active-user.interface';

export const ActiveUser = createParamDecorator(
  (field: keyof ActiveUserData | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request[REQUEST_USER_KEY] as ActiveUserData;
    return field ? user?.[field] : user;
  },
);
