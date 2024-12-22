# Blog Project

A backend service for a blog platform built with Node.js, Express, TypeScript, and MongoDB.

## Live Link:
(live-project-link)[https://blog-project-coral-pi.vercel.app/]

## Features
- User registration and authentication
- Role-based access control (Admin and User roles)
- JWT-based authentication
- User password management (password hashing, password change functionality)
- Predefined user statuses (active, blocked, deleted)
- Linting and formatting with ESLint and Prettier

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Language**: TypeScript
- **Authentication**: JSON Web Tokens (JWT)
- **Tools**: ESLint, Prettier, ts-node-dev

## Requirements
- Node.js >= 16.0.0
- npm >= 7.0.0
- MongoDB >= 5.0

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-repository/blog-project.git
cd blog-project
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory and provide the following variables:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/blog-project
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_ACCESS_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=10
```

### 4. Run the Application

#### Development Mode
```bash
npm run start:dev
```

#### Production Mode
```bash
npm run build
npm run start:prod
```

### 5. Linting and Formatting

#### Run Linter
```bash
npm run lint
```

#### Auto-Fix Lint Issues
```bash
npm run lint:fix
```

#### Format Code with Prettier
```bash
npm run prettier:fix
```

## API Documentation

### 1. Register User
**Endpoint**: `POST /api/auth/register`

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response**:
- Success (201):
```json
{
  "success": true,
  "message": "User registered successfully",
  "statusCode": 201,
  "data": {
    "_id": "string",
    "name": "string",
    "email": "string"
  }
}
```
- Failure (400):
```json
{
  "success": false,
  "message": "Validation error",
  "statusCode": 400,
  "error": { "details" },
  "stack": "error stack"
}
```

### 2. Login User
**Endpoint**: `POST /api/auth/login`

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response**:
- Success (200):
```json
{
  "success": true,
  "message": "Login successful",
  "statusCode": 200,
  "data": {
    "token": "string"
  }
}
```
- Failure (401):
```json
{
  "success": false,
  "message": "Invalid credentials",
  "statusCode": 401,
  "error": { "details" },
  "stack": "error stack"
}
```

## Folder Structure
```
blog-project
├── src
│   ├── app
│   │   ├── modules
│   │   │   ├── auth
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── auth.route.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── auth.utils.ts
│   │   │   ├── user
│   │   │       ├── user.model.ts
│   │   │       ├── user.interface.ts
│   │   │       ├── user.service.ts
│   │   ├── error
│   │       ├── AppError.ts
│   ├── config
│   │   ├── index.ts
│   ├── server.ts
├── .env
├── package.json
├── tsconfig.json
├── eslint.config.mjs
├── prettier.config.js
```

## Common Issues

1. **TypeError: Cannot read properties of undefined**
   - Ensure all environment variables are correctly set in the `.env` file.

2. **Linting Errors**
   - Run `npm run lint:fix` to auto-fix most issues.

3. **Database Connection Issues**
   - Verify `MONGO_URI` in the `.env` file and ensure MongoDB is running.

## Contributing
Feel free to fork this repository and submit pull requests.

## License
This project is licensed under the MIT License.

