

import { User } from "./user.interface"; // Import the user interface
import { UserModel } from "./user.model";

// Create a new user in the database
const createUserInDB = async (user: User): Promise<User> => {
  const result = await UserModel.create(user); // Create user using the UserModel
  return result;
};

// Retrieve all users from the database
const getAllUsersFromDB = async (): Promise<User[]> => {
  const result = await UserModel.find(); // Find all users
  return result;
};

// Retrieve a single user by ID from the database
const getSingleUserFromDB = async (id: string): Promise<User | null> => {
  const result = await UserModel.findOne({ id }); // Find user by ID
  return result;
};

// Export the user services
export const UserServices = {
  createUserInDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
};

