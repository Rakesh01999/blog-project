

import express from 'express';
import { BlogControllers } from './blog.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { createBlogValidationSchema } from './blog.validation';
// import { authenticateUser, authorizeRoles } from '../../middlewares/auth.middleware';

const router = express.Router();

// Routes for blog management
// router.post('/', authenticateUser, BlogControllers.createBlog); // Create a blog
// router.post('/', BlogControllers.createBlog); // Create a blog
router.post('/create-blog', BlogControllers.createBlog); // Create a blog

router.get('/', BlogControllers.getAllBlogs); // Public route: Get all blogs

router.get('/:id', BlogControllers.getSingleBlog); // Public route: Get a specific blog

// router.patch('/:id', authenticateUser, BlogControllers.updateBlog); // Update a blog
// router.patch('/:id', BlogControllers.updateBlog); // Update a blog
// router.post('/:id', auth(USER_ROLE.user), validateRequest(createBlogValidationSchema), BlogControllers.updateBlog);
router.patch('/:id', auth(USER_ROLE.user), validateRequest(createBlogValidationSchema), BlogControllers.updateBlog);


// router.delete('/:id', authenticateUser, BlogControllers.deleteBlog); // Delete a blog
router.delete('/:id', BlogControllers.deleteBlog); // Delete a blog

// Admin-specific routes
// router.delete('/admin/:id', authenticateUser, authorizeRoles('admin'), BlogControllers.adminDeleteBlog); // Admin: Delete any blog
// router.delete('/admin/:id', BlogControllers.adminDeleteBlog); // Admin: Delete any blog

export const BlogRoutes = router;


