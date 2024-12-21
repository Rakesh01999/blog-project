import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminServices } from './admin.service';

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

const getAllAdmins = catchAsync(async (req, res) => {
  const result = await AdminServices.getAllAdminsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admins are retrieved succesfully',
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

const blockUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await AdminServices.blockUser(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User has been blocked successfully',
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminServices.deleteBlog(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog has been deleted successfully',
    data: result,
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
