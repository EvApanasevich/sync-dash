import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JWTAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    try {
      // const authHeader = req.headers.authorization;
      // const bearer = authHeader.split(" ")[0];
      // const token = authHeader.split(" ")[1];

      const token = req.cookies['token'];

      // if (bearer !== "Bearer" || !token) {
      //   throw new UnauthorizedException({ message: "User is not authorized" });
      // }

      if (!token) {
        throw new UnauthorizedException({ message: 'User is not authorized' });
      }

      const user = this.jwtService.verify(token);
      req.user = user;

      req.session.user = { id: user.id, email: user.email };

      return true;
    } catch (err) {
      res.redirect('/auth/login');
      return false;
    }
  }
}
