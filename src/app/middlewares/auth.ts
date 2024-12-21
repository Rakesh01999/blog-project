import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../error/AppError';
import { TUserRole } from '../modules/user/user.interface';
import { UserModel } from '../modules/user/user.model';
import catchAsync from '../utils/catchAsync';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // const token = req.headers.authorization?.split(' ')[1]; // Extract Bearer token
    const token = req.headers.authorization; // Extract Bearer token

    // Check if token is missing
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    // Verify the token
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { role, userId, iat } = decoded;
    // console.log(userId) ;
    // console.log(decoded) ;

    // Ensure 'iat' is defined
    if (!iat) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'Token issued-at time (iat) is missing or invalid!',
      );
    }

    // Fetch user from the database
    const user = await UserModel.findById(userId);
    // console.log('user :',user);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user does not exist!');
    }

    // Check if the user is deleted
    if (user.isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted!');
    }

    // Check if the user is blocked
    if (user.isBlocked) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
    }

    // Check if password was changed after JWT issued
    if (
      user.passwordChangedAt &&
      new Date(user.passwordChangedAt).getTime() > iat * 1000
    ) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized! Token is invalid.',
      );
    }

    // Check if the user has the required role
    if (requiredRoles.length && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        'You do not have permission to perform this action!',
      );
    }

    // Attach user information to the request object
    req.user = {
      id: user._id,
      role: user.role,
    };

    next();
  });
};

export default auth;
