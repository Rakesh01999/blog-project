import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import catchAsync from '../utils/catchAsync';

const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    // console.log(req.params);
    await schema.parseAsync({
      body: req.body,
      params: req.params,
      cookies: req.cookies,
    });
    // await schema.parseAsync(req.body); // Pass the body directly

    next();
  });
};

export default validateRequest;
