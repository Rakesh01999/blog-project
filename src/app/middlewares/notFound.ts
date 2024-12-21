import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'API Not Found',
    error: process.env.NODE_ENV === 'development' ? 'Not Found' : undefined,
  });
};

export default notFound;
