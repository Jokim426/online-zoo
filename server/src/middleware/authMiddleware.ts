const jwt = require('jsonwebtoken');
const { UnauthorizedError, ForbiddenError } = require('express-errors');

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return next(new UnauthorizedError('Invalid or expired token'));
      }
      req.user = user;
      next();
    });
  } else {
    next(new UnauthorizedError('Authorization header missing'));
  }
};

const checkRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new UnauthorizedError('User not authenticated'));
    }

    if (!roles.includes(req.user.role)) {
      return next(new ForbiddenError('Insufficient permissions'));
    }

    next();
  };
};

module.exports = {
  authenticateJWT,
  checkRole
};