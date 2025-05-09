import jwt from 'jsonwebtoken';
import { UnauthorizedError, ForbiddenError } from 'express-errors';

const extractToken = (authHeader: string): string => {
  return authHeader.split(' ')[1];
};

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new UnauthorizedError('Authorization header missing'));
  }

  const token = extractToken(authHeader);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(new UnauthorizedError('Invalid or expired token'));
    }
    req.user = user;
    next();
  });
};

const checkRole = (allowedRoles: string[]) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new UnauthorizedError('User not authenticated'));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(new ForbiddenError('Insufficient permissions'));
    }

    next();
  };
};

export { authenticateJWT, checkRole };