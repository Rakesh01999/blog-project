

// Constants for roles
export const BLOG_ROLES = {
    ADMIN: 'admin',
    USER: 'user',
};

// Messages for success and error responses
export const BLOG_MESSAGES = {
    SUCCESS: {
        CREATE: 'Blog created successfully',
        UPDATE: 'Blog updated successfully',
        DELETE: 'Blog deleted successfully',
        FETCH: 'Blogs fetched successfully',
        ADMIN_DELETE: 'Blog deleted by admin successfully',
    },
    ERROR: {
        NOT_FOUND: 'Blog not found',
        FORBIDDEN: 'You are not authorized to perform this action',
        INVALID_DATA: 'Invalid data provided',
    },
};

// Default values
export const BLOG_DEFAULTS = {
    IS_PUBLISHED: true,
};

// Sorting options for blogs
export const BLOG_SORT_OPTIONS = {
    CREATED_AT: 'createdAt',
    TITLE: 'title',
};

// Sorting orders
export const BLOG_SORT_ORDERS = {
    ASC: 'asc',
    DESC: 'desc',
};
