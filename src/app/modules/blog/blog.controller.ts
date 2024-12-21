import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogService } from './blog.service';
import BlogModel from './blog.model';
// import { BlogServices } from './blog.service';

// Controller to create a blog (User-specific)
// const createBlog = catchAsync(async (req, res) => {
//   const { title, content } = req.body;
//   const authorId = req.user._id; // Assume user ID is retrieved from authentication middleware
//   const result = await BlogService.createBlog({ title, content, author: authorId });

//   sendResponse(res, {
//     statusCode: httpStatus.CREATED,
//     success: true,
//     message: 'Blog created successfully.',
//     data: result,
//   });
// });


const createBlog = catchAsync(async (req, res) => {
    // const { title, content } = req.body;
    // const authorId = req.user._id; // Assume user ID is retrieved from authentication middleware
    // const blogData = {
    //     title,
    //     content,
    //     author: authorId,
    //     isPublished: false, // Default value
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    // };

    // Create a new blog using Mongoose model
    // const newBlog = await BlogModel.create(blogData); // This will ensure it's a valid Mongoose document
    // const {blog} = req.body ;
    // const authorId = req.user._id; // Retrieve the logged-in user's ID
    
    const blogData = {
        ...req.body,
        author: req.user.id, // Ensure the logged-in user's ID is added as the author
    };
    // console.log('user',req.user.id);
    // console.log('blogData',blogData);
    
    // const newBlog = await BlogService.createBlog(blog); // This will ensure it's a valid Mongoose document
    const newBlog = (await BlogService.createBlog(blogData)) // This will ensure it's a valid Mongoose document
    // const newBlog = (await BlogService.createBlog(blogData)).populate('author', 'name email'); // This will ensure it's a valid Mongoose document
    // const newBlog = await BlogService.createBlog(req.body); // This will ensure it's a valid Mongoose document

    sendResponse(res, {
        // statusCode: httpStatus.CREATED,
        statusCode: httpStatus.OK,
        success: true,
        message: 'Blog created successfully.',
        data: newBlog,
    });
    
});


// Controller to get a single blog (Public API)
const getSingleBlog = catchAsync(async (req, res) => {
    const { id } = req.params; // Blog ID
    const result = await BlogService.getSingleBlog(id);

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
    const result = await BlogService.getAllBlogs(query);

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
    // const userId = req.user._id; // User ID from authentication middleware
    const updates = req.body; // Blog updates
    const userId = req.user.id; // Get the logged-in user's ID from req.user
    // console.log('userId :', userId);

    // const result = await BlogService.updateBlog(id, userId, updates);
    const result = await BlogService.updateBlog(id, updates);

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
    // const userId = req.user._id; // User ID from authentication middleware

    // const result = await BlogService.deleteBlog(id, userId);
    const result = await BlogService.deleteBlog(id);

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
