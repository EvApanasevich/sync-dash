import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class RefererGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const referer = request.headers.referer;

    if (!referer) {
      response.redirect('/');
      return false;
    }

    return true;
  }
}
