import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

type JwtPayload = {
  sub?: string;
  email?: string;
  iat?: number;
  exp?: number;
  [key: string]: unknown;
};

function extractBearerToken(authHeader?: string): string | null {
  if (!authHeader) return null;
  const [scheme, token] = authHeader.split(' ');
  if (scheme !== 'Bearer' || !token) return null;
  return token;
}

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    const token = extractBearerToken(req.header('authorization'));
    if (!token) throw new UnauthorizedException('Missing bearer token');

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new UnauthorizedException('JWT secret not configured');

    try {
      const decoded = jwt.verify(token, secret) as JwtPayload;
      (req as any).user = decoded;
      next();
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
