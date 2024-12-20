import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { AuthServices } from './auth.service';
import catchAsync from '../../utils/catchAsync';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Authenticate user and get tokens
  const { accessToken, refreshToken, needsPasswordChange } = await AuthServices.loginUser({
    email,
    password,
  });

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Login successful',
    statusCode: 200,
    data: {
      token: accessToken,
      refreshToken, // Optional: Return if you use refresh tokens
      needsPasswordChange, // Optional: Indicate if the user needs to change their password
    },
  });
});

export const AuthController = {
  loginUser,
};
