import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from './../user/user.constant';
import { AuthValidation } from './auth.validation';
import auth from '../../middlewares/auth';
import { AuthController } from './auth.controller';

const router = express.Router();

// User Registration
router.post(
  '/register',
  // auth(USER_ROLE.admin),
  validateRequest(AuthValidation.registerValidationSchema),
  AuthController.registerUser,
);

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.loginUser,
);

// router.post(
//   '/change-password',
//   auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
//   validateRequest(AuthValidation.changePasswordValidationSchema),
//   AuthControllers.changePassword,
// );

// router.post(
//   '/change-password',
//   auth(USER_ROLE.admin, USER_ROLE.admin, USER_ROLE.user),
//   validateRequest(AuthValidation.changePasswordValidationSchema),
//   AuthController.changePassword,
// );

// router.post(
//   '/refresh-token',
//   validateRequest(AuthValidation.refreshTokenValidationSchema),
//   AuthControllerrefreshToken,
// );

export const AuthRoutes = router;
