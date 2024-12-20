
import { z } from "zod";

export const createUserValidationSchema = z.object({
    body: z.object({
        name: z
            .string()
            .min(1, "Name is required")
            .max(50, "Name cannot exceed 50 characters"),
        email: z
            .string()
            .email("Invalid email format")
            .min(1, "Email is required"),
        password: z
            .string()
            .min(6, "Password must be at least 6 characters")
            .max(20, "Password cannot exceed 20 characters"),
        role: z
            .enum(["admin", "user"], {
                invalid_type_error: "Role must be either 'admin' or 'user'",
            })
            .default("user"),
        isBlocked: z.boolean().default(false),
        createdAt: z.date().default(() => new Date()),
        updatedAt: z.date().default(() => new Date()),
    }),
});

export const updateUserValidationSchema = z.object({
    body: z.object({
        name: z.string().max(50).optional(),
        email: z.string().email().optional(),
        password: z.string().min(6).max(20).optional(),
        role: z.enum(["admin", "user"]).optional(),
        isBlocked: z.boolean().optional(),
        updatedAt: z.date().default(() => new Date()),
    }),
});

export const userValidations = {
    createUserValidationSchema,
    updateUserValidationSchema,
};
