


import { Request, Response } from 'express';
import { UserServices } from './user.service'; // Assuming the service file is named user.service.ts

// Create a new user
const createUser = async (req: Request, res: Response) => {
    try {
        // const userData = req.body.user; // Extract user data from request body
        const { user: userData } = req.body;

        const result = await UserServices.createUserInDB(userData); // Call the service method to create the user

        // return res.status(201).json({
        return res.status(200).json({
            success: true,
            message: 'User created successfully',
            data: result,
        });
    } catch (err) {
        console.error(err);

        if (err instanceof Error) {
            return res.status(500).json({
                success: false,
                message: 'Failed to create the user',
                error: err.message,
            });
        }

        return res.status(500).json({
            success: false,
            message: 'An unknown error occurred',
            error: String(err),
        });
    }
};

// Get all users
const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await UserServices.getAllUsersFromDB();

        return res.status(200).json({
            success: true,
            message: 'Users retrieved successfully',
            data: result,
        });
    } catch (err) {
        console.error(err);

        if (err instanceof Error) {
            return res.status(500).json({
                success: false,
                message: 'Failed to retrieve users',
                error: err.message,
            });
        }

        return res.status(500).json({
            success: false,
            message: 'An unknown error occurred',
            error: String(err),
        });
    }
};

// Get a single user by ID
const getSingleUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params; // Extract userId from request parameters
        const result = await UserServices.getSingleUserFromDB(userId);

        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'User retrieved successfully',
            data: result,
        });
    } catch (err) {
        console.error(err);

        if (err instanceof Error) {
            return res.status(500).json({
                success: false,
                message: 'Failed to retrieve the user',
                error: err.message,
            });
        }

        return res.status(500).json({
            success: false,
            message: 'An unknown error occurred',
            error: String(err),
        });
    }
};

// Export the user controllers
export const UserControllers = {
    createUser,
    getAllUsers,
    getSingleUser,
};


