import jwt from 'jsonwebtoken';
import { UnauthorizedError, ForbiddenError } from 'express-errors';

const extractToken = (authHeader: string): string => {
  const [, token] = authHeader.split(' ');
  return token;
};

const authenticateJWT = (req: any, res: any, next: any) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedError('Authorization header missing');
    }

    const token = extractToken(authHeader);

    jwt.verify(token, process.env.JWT_SECRET, (err: any, user: any) => {
      if (err) {
        throw new UnauthorizedError('Invalid or expired token');
      }
      req.user = user;
      next();
    });
  } catch (error) {
    next(error);
  }
};

const checkRole = (allowedRoles: string[]) => {
  return (req: any, res: any, next: any) => {
    try {
      if (!req.user) {
        throw new UnauthorizedError('User not authenticated');
      }

      if (!allowedRoles.includes(req.user.role)) {
        throw new ForbiddenError('Insufficient permissions');
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export { authenticateJWT, checkRole };