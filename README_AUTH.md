# RIGEL Platform - Authentication & Database Setup

This setup includes MongoDB integration with Cloudflare Turnstile verification for secure authentication.

## 🔧 Environment Setup

Create a `.env.local` file in the project root with the following variables:

```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://zerone:0_v1ru51234@rigel-api.xdm3rfl.mongodb.net/?retryWrites=true&w=majority&appName=RIGEL-API
MONGODB_DB=rigel_platform

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-change-in-production

# JWT Secret
JWT_SECRET=your-jwt-secret-here-change-in-production

# Cloudflare Turnstile (Get these from Cloudflare Dashboard)
NEXT_PUBLIC_CLOUDFLARE_SITE_KEY=your-cloudflare-site-key
CLOUDFLARE_SECRET_KEY=your-cloudflare-secret-key
```

## 🔐 Cloudflare Turnstile Setup

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to "Turnstile" in the sidebar
3. Create a new site
4. Add your domain (for development, use `localhost`)
5. Copy the Site Key and Secret Key to your `.env.local` file

## 📡 API Routes

### Authentication Routes

#### POST `/api/auth/register`
Register a new user with Cloudflare verification.

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "organization": "Optional Organization Name",
  "turnstileToken": "cloudflare-turnstile-token"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "organization": "Optional Organization Name",
    "isVerified": false,
    "createdAt": "2025-09-06T..."
  },
  "token": "jwt-token"
}
```

#### POST `/api/auth/login`
Login with existing credentials and Cloudflare verification.

**Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123",
  "turnstileToken": "cloudflare-turnstile-token"
}
```

### User Management Routes

#### GET `/api/user/profile`
Get current user profile (requires authentication).

**Headers:**
```
Authorization: Bearer jwt-token
```

#### PUT `/api/user/profile`
Update user profile (requires authentication).

**Headers:**
```
Authorization: Bearer jwt-token
```

**Body:**
```json
{
  "name": "Updated Name",
  "organization": "Updated Organization"
}
```

#### GET `/api/users`
Get list of all users with pagination (requires authentication).

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `search`: Search term for name, email, or organization

## 🗄️ Database Schema

### User Model
```typescript
interface IUser {
  name: string;           // Required, 2-50 characters
  email: string;          // Required, unique, valid email
  password: string;       // Required, min 8 characters, hashed
  organization?: string;  // Optional, max 100 characters
  isVerified: boolean;    // Default: false
  createdAt: Date;        // Auto-generated
  updatedAt: Date;        // Auto-generated
}
```

## 🔒 Security Features

### Password Requirements
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- Passwords are hashed using bcrypt with 12 salt rounds

### Cloudflare Verification
- All authentication requests require valid Turnstile token
- Prevents automated attacks and bots
- Server-side verification with Cloudflare API

### JWT Authentication
- 7-day token expiration
- Includes user ID, email, and name in payload
- Used for protecting routes and API endpoints

## 🛡️ Route Protection

### Protected Routes
- `/dashboard` - User dashboard
- `/demo` - Demo page (if authenticated)
- `/profile` - User profile management

### Public Routes
- `/` - Landing page
- `/login` - Login page
- `/register` - Registration page

### Middleware
The middleware automatically:
- Redirects unauthenticated users to `/login` when accessing protected routes
- Redirects authenticated users to `/dashboard` when accessing auth routes
- Validates JWT tokens on each request

## 🚀 Usage

### Frontend Authentication
```typescript
import { useAuth } from '@/hooks/useAuth';

function MyComponent() {
  const { user, token, login, logout, isLoading } = useAuth();
  
  // Use authentication state in your components
}
```

### API Authentication
```typescript
// In API routes
const authHeader = request.headers.get('authorization');
const token = authHeader?.substring(7); // Remove 'Bearer ' prefix
const decoded = jwt.verify(token, process.env.JWT_SECRET!);
```

## 📋 Installation

All required dependencies are already installed:
- `mongodb` - MongoDB driver
- `mongoose` - MongoDB ODM
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT handling
- `@marsidev/react-turnstile` - Cloudflare Turnstile React component

## 🧪 Testing

1. Start the development server: `bun dev`
2. Navigate to `/register` to create a new account
3. Complete Cloudflare verification
4. Check MongoDB to see the created user
5. Login with the credentials
6. Access `/dashboard` to see protected content

## 📊 Database Connection

The MongoDB connection is optimized for Next.js with:
- Connection caching to prevent multiple connections
- Automatic reconnection handling
- Environment-based configuration
- Error handling and logging

## 🔧 Configuration Notes

1. **Production Security**: Change JWT_SECRET and NEXTAUTH_SECRET in production
2. **Cloudflare Domain**: Update Turnstile site configuration for production domain
3. **MongoDB Access**: Ensure MongoDB cluster allows connections from your deployment IP
4. **CORS**: API routes are configured for same-origin requests

## 📝 Error Handling

The API includes comprehensive error handling for:
- Validation errors (400)
- Authentication failures (401)
- Duplicate users (409)
- Server errors (500)
- Cloudflare verification failures
- MongoDB connection issues
