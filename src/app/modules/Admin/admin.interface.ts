import { Model } from 'mongoose';

export type TUserRole = 'admin' | 'user';

export type TAdmin = {
  id: string; // Unique identifier for the admin
  email: string; // Admin email
  password: string; // Admin password (stored securely)
  role: TUserRole; // Role, which will always be "admin" for admins
  isBlocked?: boolean; // Optional field to indicate if the admin is blocked (if needed for edge cases)
  isDeleted?: boolean; // Optional field to indicate if the admin is deleted
};

export interface AdminModel extends Model<TAdmin> {
  isAdminExists(email: string): Promise<TAdmin | null>; // Check if an admin exists by email
  isUserBlocked(userId: string): Promise<boolean>; // Check if a user is blocked
}
