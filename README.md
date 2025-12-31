# Mini User Management System - Backend Intern Assessment

**Submitted by:** Mufaddal Virpurwala  
**Date:** December 2025

---

## 🚀 Live Deployment Links

| Component | URL |
|-----------|-----|
| **Frontend (Live App)** | https://purple-merit-assessment-two.vercel.app/ |
| **Backend (API)** | https://api-mufaddal.onrender.com |
| **GitHub Repository** | https://github.com/mufaddalvirpur/purple-merit-assessment |

---

## 📖 Project Overview
[cite_start]This project is a full-stack **User Management System** built as part of the Purple Merit Backend Developer Intern Assessment[cite: 15, 17]. It is designed to demonstrate secure authentication, Role-Based Access Control (RBAC), and user lifecycle management.

The application allows **Admins** to view, search, and manage user statuses (activate/deactivate), while standard **Users** can manage their own profiles and security settings.

### Key Features
* [cite_start]**Authentication:** Secure Signup/Login using JWT and Bcrypt for password hashing[cite: 26, 27].
* [cite_start]**RBAC (Role-Based Access Control):** Distinct permissions for `Admin` and `User` roles[cite: 19, 55].
* [cite_start]**Admin Dashboard:** View all users with pagination and toggle active/inactive status[cite: 45, 46].
* [cite_start]**User Profile:** Edit name/email and secure password change functionality[cite: 50, 51].
* [cite_start]**Security:** Protected API routes, input validation, and CORS configuration[cite: 54, 56].

---

## [cite_start]🛠️ Tech Stack [cite: 142]

* [cite_start]**Frontend:** React.js, React Router, CSS3 (Custom responsive design) [cite: 25]
* [cite_start]**Backend:** Node.js, Express.js [cite: 23]
* [cite_start]**Database:** MongoDB Atlas (Cloud-hosted) [cite: 24]
* [cite_start]**Testing:** Jest, Supertest (Backend unit tests) 
* [cite_start]**Deployment:** Vercel (Frontend), Render (Backend) [cite: 28]

---

## [cite_start]⚙️ Environment Variables [cite: 144, 177]

To run this project locally, you need to configure the following environment variables in a `.env` file inside the `backend/` folder.

**File:** `backend/.env`
```bash env
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_secure_secret_key
NODE_ENV=development
```

💻 Setup Instructions (Run Locally)
Follow these steps to get the project running on your local machine.

1. Clone the Repository
```Bash
git clone: https://github.com/mufaddalvirpur/purple-merit-assessment
cd purple-merit-assessment
```

2. Backend Setup
```Bash

# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Start the server (Development mode with Nodemon)
npm run dev
```
Output should say: Server running on port 5000 and MongoDB Connected.

3. Frontend Setup
Open a new terminal window:

```Bash

# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start the React app
npm start
```
The app will open at http://localhost:3000.

4. Running Tests
To run the 5 backend unit tests (using Jest):

```Bash

cd backend
npm test
```
☁️ Deployment Instructions
The project was deployed using the following CI/CD-style workflow:


Backend (Render):

Connected GitHub repository to Render.

Set Root Directory to backend.

Added MONGO_URI and JWT_SECRET in the Environment settings.

Build Command: npm install

Start Command: node server.js

Frontend (Vercel):

Connected GitHub repository to Vercel.

Set Root Directory to frontend.

Updated the api.js base URL to point to the live Render backend instead of localhost.

📡 API Documentation
Authentication

Method,Endpoint,Description,Access
POST,/api/auth/signup,Register a new user,Public
POST,/api/auth/login,Login and receive JWT,Public
GET,/api/auth/user,Get current user details,Private (Token)

User Management

Method,Endpoint,Description,Access
GET,/api/users,Get all users (Paginated),Admin Only
PUT,/api/users/:id/status,Activate or Deactivate user,Admin Only
PUT,/api/users/profile,Update own Name/Email,Private
PUT,/api/users/password,Change own Password,Private

Contact
Email: mufaddalvirpuri04@gmail.com
