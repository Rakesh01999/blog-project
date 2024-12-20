import { Schema, model } from 'mongoose';
import { AdminModel, TAdmin } from './admin.interface';

const adminSchema = new Schema<TAdmin, AdminModel>(
  {
    id: {
      type: String,
      required: [true, 'Admin ID is required'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    role: {
      type: String,
      enum: ['admin'], // Admin role only
      default: 'admin',
      required: [true, 'Role is required'],
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false, // Default to not deleted
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
    toJSON: {
      virtuals: true,
    },
  }
);

// Pre-hook: Filter out blocked admins if necessary
adminSchema.pre('find', function (next) {
  this.find({ isBlocked: { $ne: true } });
  next();
});

// Static method: Check if an admin exists by email
adminSchema.statics.isAdminExists = async function (email: string) {
  return await Admin.findOne({ email });
};

// Static method: Check if a user is blocked
adminSchema.statics.isUserBlocked = async function (userId: string) {
  const user = await Admin.findOne({ id: userId });
  return user ? user.isBlocked : false;
};

export const Admin = model<TAdmin, AdminModel>('Admin', adminSchema);
