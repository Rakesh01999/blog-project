import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserModel } from '../user/user.model';
import AppError from '../../error/AppError';
import { createToken } from './auth.utils';
import config from '../../config';

const registerUser = async (payload: {
  name: string;
  email: string;
  password: string;
}) => {
  const { name, email, password } = payload;

  // Check if the email is already registered
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Email is already registered');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds),
  );

  // Create and save the user
  const newUser = await UserModel.create({
    name,
    email,
    password: hashedPassword,
  });

  return {
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
  };
};

const loginUser = async (payload: { email: string; password: string }) => {
  const { email, password } = payload;

  console.log(email);
  console.log(password);
  // Find user by email
  const user = await UserModel.findOne({ email });
  console.log(user?.password);

  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
  }

  // Check if the user is blocked or deleted
  if (user.isBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked');
  }
  if (user.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted');
  }

  // Verify password
  // const isPasswordMatched = await bcrypt.compare(password, user.password);
  // if (!isPasswordMatched) {
  //     throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
  // }
  if (user.password !== password) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
  }

  // Create JWT payload
  const jwtPayload = {
    userId: user._id.toString(), // Convert ObjectId to string
    role: user.role,
  };

  // Generate access and refresh tokens
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
    needsPasswordChange: user.needsPasswordChange,
  };
};

export const AuthServices = {
  registerUser,
  loginUser,
};
