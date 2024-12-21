


import { Document, Types } from 'mongoose';

// Blog Interface
export interface IBlog extends Document {
  title: string; // Blog title
  content: string; // Main content of the blog
  author?: Types.ObjectId; // Reference to the User model
  isPublished: boolean; // Whether the blog is published or not
  createdAt: Date; // Timestamp when the blog was created
  updatedAt: Date; // Timestamp of the last update to the blog
}

// Query Types for Search, Sort, and Filter
export interface IBlogQuery {
  search?: string; // Search term (title or content)
  sortBy?: string; // Field to sort by (e.g., "createdAt", "title")
  sortOrder?: 'asc' | 'desc'; // Sort order (ascending or descending)
  filter?: {
    author?: string; // Author's ID for filtering blogs
    isPublished?: boolean; // Filter by publication status
  };
}

