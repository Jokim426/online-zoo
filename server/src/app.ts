import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';

import AppError from './utils/appError';
import globalErrorHandler from './controllers/errorController';
import userRouter from './routes/userRoutes';
import postRouter from './routes/postRoutes';

const app = express();

const initializeSecurity = () => {
  app.enable('trust proxy');
  app.use(helmet());
  app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  }));
  app.options('*', cors());
};

const initializeRequestParsing = () => {
  app.use(express.json({ limit: '10kb' }));
  app.use(cookieParser());
};

const initializeRequestSanitization = () => {
  app.use(mongoSanitize());
  app.use(xss());
  app.use(hpp({
    whitelist: ['duration', 'ratingsQuantity', 'ratingsAverage', 'difficulty']
  }));
};

const initializeRateLimiting = () => {
  const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
  });
  app.use('/api', limiter);
};

const initializeLogging = () => {
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }
};

const initializeRoutes = () => {
  app.use('/api/v1/users', userRouter);
  app.use('/api/v1/posts', postRouter);
  app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });
};

initializeSecurity();
initializeRequestParsing();
initializeRequestSanitization();
initializeRateLimiting();
initializeLogging();
initializeRoutes();

app.use(globalErrorHandler);

export default app;