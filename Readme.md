# Secure User Profile & Access Control System
### Identity Management Microservice
![alt text](image.png)
## Project Overview
 The Secure User Profile & Access Control System is an identity management microservice designed to demonstrate secure authentication, authorization, and sensitive data protection in a modern web application.The project allows users to:
* Register with personal credentials and a government-issued identifier

* Authenticate using JWT-based login

* Access protected profile data securely

## Security Focus
This system emphasizes backend security practices, including:
* JWT-based authentication for stateless session management

* Password hashing to prevent plaintext credential storage

* AES-256 encryption to securely store sensitive government identification numbers (e.g., Aadhaar) at rest

* Middleware-based access control to protect private APIs 

## High-Level Flow
1. User registers via frontend

2. Backend hashes password and encrypts government ID

3. User logs in and receives a signed JWT

4. JWT is sent with subsequent requests

5. Protected profile API validates JWT and returns user data

6. Frontend displays profile information with masked sensitive fields

## Use Case
This system represents a simplified identity management service, similar to components used in:
* Government portals

* Financial platforms

* Secure enterprise systems
--- 

## Setup & Run Instructions
### Prerequisites

* Node.js (v18 or higher)

* PostgreSQL

* npm

* Git

### Clone Repository
```
git clone "https://github.com/MarvelousCoder/Secure-User-Profileurl"
cd secure-user-profile-system
```
### Backend Setup
```
cd backend
npm install
```
### Environment Variables
#### Create a `.env` file in the backend directory:
```
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/yourdb
JWT_SECRET=your_jwt_secret_key
AES_SECRET_KEY=64_character_hex_string
```
To configure JWT_SECRET:
```
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```
Output e.g: Copy this and paste in `.env`
```
f2c4b8e9c7f3a6d1e4b9b8a4f0d1c7e9a3f5b6d7e8c9f1a2b3c4d5e6f7a8b9
```

To configure AES_SECRET_KEY:
```
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Output e.g: Copy this and paste in `.env`
```
e3a1c7c9b5f4d8a9f0e4b123c7d89ab45c9f1a3b7e4d6f8a9c1b2d3e4f56789
```
### Database Migration
```
npx prisma generate
npx prisma migrate dev
```
### Run Backend Server
```
npm run dev
```

### Backend runs on:
```
http://localhost:5000
```
--- 
### Frontend Setup
```
cd frontend
npm install
```
### Environment Variables
#### Create a `.env` file in the frontend directory:
```
VITE_API_BASE_URL=http://localhost:5000
```
### Run Frontend Application
```
npm run dev
```
### Frontend runs on:
```
http://localhost:5173
```
--- 

### API Documentation
### Authentication APIs
POST /api/auth/register

* Purpose: Register a new user

* Authentication Required: No

* Request Body:
```
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "password",
  "governmentId": "123456789012"
}
```
* Response:
```
{
  "success": true,
  "message": "User registered successfully"
}
```
--- 
POST /api/auth/login
* Purpose: Authenticate user and issue JWT

* Authentication Required: No

* Request Body:
```
{
  "email": "user@example.com",
  "password": "password"
}
```
* Response:
```
{
  "success": true,
  "token": "JWT_TOKEN"
}
```
--- 
### Profile API
GET /api/profile

* Purpose: Fetch authenticated user profile

* Authentication Required: Yes (JWT)

* Headers:
```
Authorization: Bearer <JWT_TOKEN>
```
* Response:
```
{
  "id": "uuid",
  "name": "User Name",
  "email": "user@example.com",
  "governmentId": "********9012"
}
```
--- 
### Database Schema
User Model
```
User
--------------------------------
id             UUID (Primary Key)
name           String
email          String (Unique)
password       String (Hashed)
encryptedId    String (AES-256 Encrypted)
createdAt      DateTime
updatedAt      DateTime
```
* Passwords are stored using secure hashing (bcrypt)

* Government ID is encrypted using AES-256 before storage

* Sensitive fields are never stored in plaintext
--- 
## AI Tool Usage Log
| AI-Assisted Tasks          | Description                                                            | Effectiveness Score (1–5) |
| -------------------------- | ---------------------------------------------------------------------- |:-------------------------:|
| JWT Authentication Flow    | Assisted in designing JWT-based login and middleware validation        | 5 |
| AES-256 Encryption Utility | Generated encryption and decryption utility for sensitive data         | 4 |
| Prisma Schema Design       | Helped structure database schema and relationships                     | 4 |
| Jest Unit Tests            | Assisted in writing unit tests for JWT validation and encryption logic | 4 |
| Debugging ES Module Issues | Provided guidance on import/export and runtime errors                  | 5 |
| Frontend Integration       | Helped connect React frontend with secure backend APIs                 | 4 |

--- 

###  Overall Effectiveness Score
Score: 4 / 5

Justification:
AI tools significantly accelerated development by providing secure boilerplate code, encryption logic, and debugging guidance. They reduced setup and research time; however, manual debugging and integration were still required, especially for CORS, token handling, and state management.

---

#### Working Video Demo Link: https://drive.google.com/file/d/1w9X3uQrwL4_E8FwziWKh5RseD6nD-HXF/view?usp=drive_link

---

## Notable Techniques Used

JWT-based stateless authentication
Uses signed JSON Web Tokens for authorization without server-side sessions
https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization

Password hashing with salting
Uses bcrypt to securely hash passwords before storage
https://www.npmjs.com/package/bcrypt

AES-256 encryption at rest
Encrypts sensitive identifiers before database persistence
https://nodejs.org/api/crypto.html

Middleware-based access control
Centralized authorization logic for protected routes
https://expressjs.com/en/guide/using-middleware.html

Environment-based configuration
Secrets and credentials are injected via environment variables
https://nodejs.org/api/process.html#processenv



