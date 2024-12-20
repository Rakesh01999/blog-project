import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogServices } from './blog.service';

// Controller to create a blog (User-specific)
const createBlog = catchAsync(async (req, res) => {
  const { title, content } = req.body;
  const authorId = req.user._id; // Assume user ID is retrieved from authentication middleware
  const result = await BlogServices.createBlog({ title, content, author: authorId });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Blog created successfully.',
    data: result,
  });
});

// Controller to get a single blog (Public API)
const getSingleBlog = catchAsync(async (req, res) => {
  const { id } = req.params; // Blog ID
  const result = await BlogServices.getSingleBlog(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog retrieved successfully.',
    data: result,
  });
});

// Controller to get all blogs (Public API with search, filter, and sort)
const getAllBlogs = catchAsync(async (req, res) => {
  const query = req.query; // Query parameters for search, sort, and filter
  const result = await BlogServices.getAllBlogs(query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blogs retrieved successfully.',
    data: result,
  });
});

// Controller to update a blog (User-specific)
const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params; // Blog ID
  const userId = req.user._id; // User ID from authentication middleware
  const updates = req.body; // Blog updates

  const result = await BlogServices.updateBlog(id, userId, updates);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog updated successfully.',
    data: result,
  });
});

// Controller to delete a blog (User-specific)
const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params; // Blog ID
  const userId = req.user._id; // User ID from authentication middleware

  const result = await BlogServices.deleteBlog(id, userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog deleted successfully.',
    data: result,
  });
});

export const BlogControllers = {
  createBlog,    // User: Create a blog
  getSingleBlog, // Public API: Get a single blog
  getAllBlogs,   // Public API: Get all blogs with search, sort, and filter
  updateBlog,    // User: Update their own blog
  deleteBlog,    // User: Delete their own blog
};
