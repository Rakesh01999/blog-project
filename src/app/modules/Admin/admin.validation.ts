import { z } from 'zod';

// Validation for Admin Credentials (Predefined)
export const createAdminValidationSchema = z.object({
  body: z.object({
    email: z
      .string()
      .email("Invalid email format")
      .nonempty("Email is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must not exceed 20 characters")
      .nonempty("Password is required"),
    role: z.literal('admin', {
      errorMap: () => ({ message: "Role must be 'admin'" }),
    }),
  }),
});

// Validation for Admin Login
export const loginAdminValidationSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email format").nonempty("Email is required"),
    password: z.string().nonempty("Password is required"),
  }),
});

// Validation for Admin Update
export const updateAdminValidationSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email format").optional(),
    password: z.string().min(8).max(20).optional(),
    isBlocked: z.boolean().optional(),
  }),
});

// Validation for Block User
export const blockUserValidationSchema = z.object({
  params: z.object({
    userId: z.string().nonempty("User ID is required"),
  }),
});

export const AdminValidations = {
  createAdminValidationSchema,
  loginAdminValidationSchema,
  updateAdminValidationSchema,
  blockUserValidationSchema,
};
