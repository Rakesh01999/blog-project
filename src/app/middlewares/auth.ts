import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../error/AppError';
import { TUserRole } from '../modules/user/user.interface';
import { UserModel } from '../modules/user/user.model';
import catchAsync from '../utils/catchAsync';
import { Admin } from '../modules/Admin/admin.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // Extract the Bearer token from the Authorization header
    const token = req.headers.authorization?.split(' ')[1];
    // const token = req.headers.authorization;
    // console.log('Token:', token); 
    // console.log('req head:',req.headers.authorization); 
    // Debugging: Print the token for verification

    // Check if token is missing
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    // Verify the token
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;

    const { role, userId, iat } = decoded;

    // Ensure 'iat' is defined
    if (!iat) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'Token issued-at time (iat) is missing or invalid!'
      );
    }

    console.log('Role:', role);

    // Fetch user/admin from the database based on the role
    let user = null;
    if (role === 'admin') {
      user = await Admin.findById(userId); // Look for admin
    } else {
      user = await UserModel.findById(userId); // Look for user
    }

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
        'You are not authorized! Token is invalid.'
      );
    }

    // Check if the user has the required role
    if (requiredRoles.length && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        'You do not have permission to perform this action!'
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
