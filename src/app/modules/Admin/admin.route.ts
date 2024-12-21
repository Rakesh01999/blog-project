

import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AdminControllers } from './admin.controller';
import { createAdminValidationSchema, updateAdminValidationSchema } from './admin.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

// router.post('/create-admin', AdminControllers.createAdmin);
router.post('/create-admin', auth(USER_ROLE.admin), validateRequest(createAdminValidationSchema), AdminControllers.createAdmin);


router.get('/', AdminControllers.getAllAdmins);

router.get('/:id', AdminControllers.getSingleAdmin);

router.patch(
  '/:id',
  validateRequest(updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);

router.delete('/:id', AdminControllers.deleteAdmin);

// Admin functionality: block a user
// router.patch('/admin/users/:userId/block', AdminControllers.blockUser);
router.patch('/users/:userId/block', AdminControllers.blockUser);

// Admin functionality: delete any blog
// router.delete('/admin/blogs/:id', AdminControllers.deleteBlog);
router.delete('/blogs/:id', AdminControllers.deleteBlog);


export const AdminRoutes = router;

