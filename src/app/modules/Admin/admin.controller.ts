import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminServices } from './admin.service';
import { UserModel } from '../user/user.model';
import AppError from '../../error/AppError';
import BlogModel from '../blog/blog.model';

const createAdmin = catchAsync(async (req, res) => {
  const { admin } = req.body;
  const result = await AdminServices.createAdmin(admin);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Admin is created successfully',
    data: result,
  });
});

const getSingleAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminServices.getSingleAdminFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is retrieved succesfully',
    data: result,
  });
});

// const getAllAdmins = catchAsync(async (req, res) => {

//   // const result = await AdminServices.getAllAdminsFromDB(req.query);
//   const result = await AdminServices.getAllAdminsFromDB(req.body);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Admins are retrieved succesfully',
//     data: result,
//   });
// });

const getAllAdmins = catchAsync(async (req, res) => {
  const filters = req.query; // Use query parameters for filtering
  const result = await AdminServices.getAllAdminsFromDB(filters);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admins are retrieved successfully',
    data: result,
  });
});


const updateAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { admin } = req.body;
  const result = await AdminServices.updateAdminIntoDB(id, admin);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is updated succesfully',
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminServices.deleteAdminFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is deleted succesfully',
    data: result,
  });
});

// const blockUser = catchAsync(async (req, res) => {
//   const { userId } = req.params;
//   const result = await AdminServices.blockUser(userId);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'User has been blocked successfully',
//     data: result,
//   });
// });

const blockUser = catchAsync(async (req, res) => {
  const { userId } = req.params;

  // Find the user by ID
  const user = await UserModel.findById(userId);
  // console.log('f-a_ctrlr',user);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  // Update the user's `isBlocked` property
  user.isBlocked = true;
  await user.save();

  res.status(httpStatus.OK).json({
    success: true,
    message: 'User blocked successfully',
    statusCode: httpStatus.OK,
  });
});

// const deleteBlog = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   const result = await AdminServices.deleteBlog(id);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Blog has been deleted successfully',
//     data: result,
//   });
// });

const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;

  // Find the blog by ID and delete it
  const blog = await BlogModel.findByIdAndDelete(id);

  // console.log('f-ctrlr',blog);

  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
  }

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Blog deleted successfully',
    statusCode: httpStatus.OK,
  });
});

export const AdminControllers = {
  createAdmin,
  getAllAdmins,
  getSingleAdmin,
  deleteAdmin,
  updateAdmin,
  blockUser,
  deleteBlog,
};
