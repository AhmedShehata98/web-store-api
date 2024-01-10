import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);

    if (!token)
      throw new UnauthorizedException(
        'Invalid authorization token is not provided',
      );

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET_KEY,
      });
      request.params = payload;
    } catch (error) {
      throw new UnauthorizedException(error);
    }

    return true;
  }

  private extractToken(request: Request) {
    const { token } = request.cookies;

    if (!token) return undefined;
    return token;
  }
}
