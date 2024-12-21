import httpStatus from 'http-status';
import BlogModel from './blog.model'; // Import the Blog model
import { IBlog } from './blog.interface'; // Blog interface for typing
import AppError from '../../error/AppError';

/**
 * Create a new blog.
 * @param blogData - Data for the new blog.
 * @returns - Created blog document.
 */
const createBlog = async (blogData: IBlog) => {
  // const blog = await BlogModel.findById(blogData._id).populate('author', 'name email');
  // const blog = (await BlogModel.create(blogData)).populate('author', 'name email');
  const blog = await BlogModel.create(blogData);
  if (!blog) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to create blog',
    );
  }

  // return blog;
  return await BlogModel.findById(blog._id).populate('author', 'name email'); // Adjust fields as needed
};

/**
 * Get all blogs with optional search, sort, and filter functionality.
 * @param query - Query parameters for filtering, sorting, etc.
 * @returns - List of blogs.
 */
const getAllBlogs = async (query: any) => {
  const { search, sortBy, filterBy, page = 1, limit = 10 } = query;

  // Build filter object
  const filter = filterBy ? { author: filterBy } : {};

  // Build sorting object
  const sort: { [key: string]: 1 | -1 } = {};

  if (sortBy) {
    sort[sortBy] = -1; // sort in descending order by default
  } else {
    sort.createdAt = -1; // default sort by createdAt in descending order
  }

  // Pagination
  const skip = (page - 1) * limit;

  const blogs = await BlogModel.find(filter).sort(sort).skip(skip).limit(limit);

  const totalBlogs = await BlogModel.countDocuments(filter);

  return { blogs, totalBlogs };
};

/**
 * Get a single blog by its ID.
 * @param blogId - ID of the blog to retrieve.
 * @returns - Blog document.
 */
const getSingleBlog = async (blogId: string) => {
  const blog = await BlogModel.findById(blogId);

  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
  }

  return blog;
};

/**
 * Update an existing blog.
 * Only the author of the blog can update it.
 * @param blogId - ID of the blog to update.
 * @param userId - ID of the user trying to update the blog.
 * @param updateData - Data to update the blog with.
 * @returns - Updated blog document.
 */
// const updateBlog = async (blogId: string, userId: string, updateData: Partial<IBlog>) => {
// const updateBlog = async (blogId: string, updateData: Partial<IBlog>) => {
//     const blog = await BlogModel.findById(blogId);
const updateBlog = async (id: string, updateData: Partial<IBlog>) => {
  const blog = await BlogModel.findById(id);

  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
  }

  // if (blog.author.toString() !== userId) {
  //     throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized to update this blog');
  // }

  // const updatedBlog = await BlogModel.findByIdAndUpdate(blogId, updateData, { new: true, runValidators: true });
  // const updatedBlog = await BlogModel.findByIdAndUpdate(blogId, updateData);
  const updatedBlog = await BlogModel.findByIdAndUpdate(id, updateData);

  if (!updatedBlog) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to update blog',
    );
  }

  return updatedBlog;
};

/**
 * Delete an existing blog.
 * Only the author of the blog can delete it.
 * @param blogId - ID of the blog to delete.
 * @param userId - ID of the user trying to delete the blog.
 */
// const deleteBlog = async (blogId: string, userId: string) => {
//     const blog = await BlogModel.findById(blogId);
const deleteBlog = async (id: string) => {
  const blog = await BlogModel.findById(id);

  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
  }

  // if (blog.author.toString() !== userId) {
  //     throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized to delete this blog');
  // }

  // Replace `remove()` with `deleteOne()`
  // await BlogModel.deleteOne({ _id: blogId });
  await BlogModel.deleteOne({ _id: id });
};

/**
 * Admin delete a blog by ID.
 * Admins can delete any blog.
 * @param blogId - ID of the blog to delete.
 */
const adminDeleteBlog = async (blogId: string) => {
  const blog = await BlogModel.findById(blogId);

  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
  }

  // Admin can delete the blog
  await BlogModel.deleteOne({ _id: blogId });
};

export const BlogService = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  adminDeleteBlog,
};
