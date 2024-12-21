

import { z } from 'zod';

// Validation for Blog Creation
export const createBlogValidationSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(5, "Title must be at least 5 characters")
      .max(100, "Title must not exceed 100 characters"),
      // .nonempty("Title is required"),
    content: z
      .string()
      .min(10, "Content must be at least 10 characters"),
      // .nonempty("Content is required"),
  }),
});

// Validation for Blog Update
export const updateBlogValidationSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(5, "Title must be at least 5 characters")
      .max(100, "Title must not exceed 100 characters")
      .optional(),
    content: z
      .string()
      .min(10, "Content must be at least 10 characters")
      .optional(),
  }),
});

// Validation for Single Blog Retrieval
export const getSingleBlogValidationSchema = z.object({
  params: z.object({
    id: z.string().nonempty("Blog ID is required"),
  }),
});

// Validation for Blog Deletion
export const deleteBlogValidationSchema = z.object({
  params: z.object({
    id: z
    .string().nonempty("Blog ID is required")
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid Blog ID format"), // Validate ObjectId format

  }),
});

// Validation for Admin Deleting a Blog (Optional)
export const adminDeleteBlogValidationSchema = z.object({
  params: z.object({
    id: z.string().nonempty("Blog ID is required"),
  }),
});

// Validation for Blog Search (Optional Filters)
export const searchBlogValidationSchema = z.object({
  query: z.object({
    search: z.string().optional(),
    sortBy: z.string().optional(),
    filterBy: z.string().optional(),
    page: z.number().min(1).optional(),
    limit: z.number().min(1).max(100).optional(),
  }),
});

export const BlogValidations = {
  createBlogValidationSchema,
  updateBlogValidationSchema,
  getSingleBlogValidationSchema,
  deleteBlogValidationSchema,
  adminDeleteBlogValidationSchema,
  searchBlogValidationSchema,
};


