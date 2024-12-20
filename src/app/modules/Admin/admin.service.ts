/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
// import { Blog } from '../blog/blog.model';
import { Admin } from './admin.model';
import AppError from '../../error/AppError';
import { AdminModel, TAdmin } from './admin.interface';


/**
 * Create a new admin.
 * @param adminData - Data for the new admin.
 * @returns - Created admin document.
 */
const createAdmin = async (adminData: Pick<TAdmin, 'email' | 'password' | 'role'>) => {
  const existingAdmin = await Admin.findOne({ email: adminData.email });

  if (existingAdmin) {
    throw new AppError(httpStatus.CONFLICT, 'Admin with this email already exists');
  }

  const newAdmin = await Admin.create(adminData);
  return newAdmin;
};

/**
 * Retrieve all admins.
 * @returns - List of all admin documents.
 */
const getAllAdminsFromDB = async () => {
  const admins = await Admin.find({ isDeleted: false });
  return admins;
};

/**
 * Retrieve a single admin by ID.
 * @param adminId - ID of the admin to retrieve.
 * @returns - Admin document.
 */
const getSingleAdminFromDB = async (adminId: string) => {
  const admin = await Admin.findById(adminId);

  if (!admin || admin.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Admin not found');
  }

  return admin;
};

/**
 * Block a user (sets isBlocked to true).
 * @param userId - ID of the user to block.
 * @returns - Updated user document.
 */
const blockUserById = async (userId: string) => {
  const result = await Admin.findOneAndUpdate(
    { _id: userId, isDeleted: false },
    { $set: { isBlocked: true } },
    { new: true, runValidators: true }
  );

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found or already blocked');
  }

  return result;
};

/**
 * Delete a blog by ID.
 * @param blogId - ID of the blog to delete.
 * @returns - Deleted blog document.
 */

// const deleteBlogById = async (blogId: string) => {
//   const deletedBlog = await Blog.findByIdAndDelete(blogId);

//   if (!deletedBlog) {
//     throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
//   }

//   return deletedBlog;
// };

/**
 * Delete an admin by marking `isDeleted` as true.
 * @param adminId - ID of the admin to delete.
 * @returns - Updated admin document.
 */
const deleteAdminFromDB = async (adminId: string) => {
  const deletedAdmin = await Admin.findByIdAndUpdate(
    adminId,
    { isDeleted: true },
    { new: true }
  );

  if (!deletedAdmin) {
    throw new AppError(httpStatus.NOT_FOUND, 'Admin not found');
  }

  return deletedAdmin;
};

/**
 * Update admin details.
 * @param adminId - ID of the admin to update.
 * @param payload - Partial admin data to update.
 * @returns - Updated admin document.
 */
const updateAdminDetails = async (adminId: string, payload: Record<string, unknown>) => {
  const updatedAdmin = await Admin.findByIdAndUpdate(
    adminId,
    payload,
    { new: true, runValidators: true }
  );

  if (!updatedAdmin || updatedAdmin.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Admin not found or deleted');
  }

  return updatedAdmin;
};

export const AdminServices = {
  createAdmin,
  getAllAdminsFromDB,
  getSingleAdminFromDB,
  blockUserById,
  // deleteBlogById,
  deleteAdminFromDB,
  updateAdminDetails,
};
