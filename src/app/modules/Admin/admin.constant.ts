


export const AdminSearchableFields = [
  'email',          // Admins may search users by email
  'name',           // Full name of the user
  'role',           // Role of the user (admin/user)
  '_id',            // Unique identifier of the user
];

export const AdminActions = {
  BlockUser: 'BLOCK_USER',   // Admin can block a user
  DeleteBlog: 'DELETE_BLOG', // Admin can delete any blog
};

