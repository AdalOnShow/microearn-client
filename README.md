<div align="center">

# 💰 MicroEarn

### A modern micro-task platform for earning and hiring

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge)](https://microearn-client.vercel.app/)
[![Client Repo](https://img.shields.io/badge/GitHub-Client-blue?style=for-the-badge&logo=github)](https://github.com/AdalOnShow/microearn-client)
[![Server Repo](https://img.shields.io/badge/GitHub-Server-blue?style=for-the-badge&logo=github)](https://github.com/AdalOnShow/microearn-server)

![Home Page](./home.png)

</div>

---

## 🛠️ Tech Stack

<table>
<tr>
<td width="50%" valign="top">

### Frontend Technologies

| Technology                                                                                                              | Description            |
| ----------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)             | React Framework (v16)  |
| ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)                     | UI Library (v19)       |
| ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)  | Styling Framework (v4) |
| ![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)           | Component Library      |
| ![NextAuth.js](https://img.shields.io/badge/NextAuth.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)      | Authentication (v5)    |
| ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)                | Database               |
| ![Lucide React](https://img.shields.io/badge/Lucide-F56565?style=for-the-badge&logo=lucide&logoColor=white)             | Icon Library           |
| ![Sonner](https://img.shields.io/badge/Sonner-000000?style=for-the-badge)                                               | Toast Notifications    |
| ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)                   | Deployment Platform    |

</td>
<td width="50%" valign="top">

### Backend Technologies

| Technology                                                                                                              | Description          |
| ----------------------------------------------------------------------------------------------------------------------- | -------------------- |
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)              | Runtime Environment  |
| ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)          | Web Framework        |
| ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)                | NoSQL Database       |
| ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)                  | Token Authentication |
| ![bcryptjs](https://img.shields.io/badge/bcryptjs-338033?style=for-the-badge)                                           | Password Hashing     |
| ![CORS](https://img.shields.io/badge/CORS-Enabled-green?style=for-the-badge)                                            | Cross-Origin Support |
| ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)                   | Deployment Platform  |

</td>
</tr>
</table>

---

## 📖 Table of Contents

- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Installation](#-installation)
  - [Client Setup](#client-setup)
  - [Server Setup](#server-setup)
- [Contributing](#-contributing)
- [Contact](#-contact)

---

## 📃 About the Project

**MicroEarn** is a full-stack micro-task platform where users can earn money by completing simple tasks or hire workers to complete tasks for them. The platform features role-based authentication with three distinct user types: Workers, Buyers, and Admins.

The system is designed for freelancers, task creators, and platform administrators who need a comprehensive solution for task management, payment processing, and user administration in a clean and intuitive interface.

Built with a strong focus on security, scalability, and user experience, the platform provides a complete ecosystem for micro-task management with features like coin-based payments, withdrawal systems, and comprehensive admin controls.

### 🎯 Project Objectives

- Build a complete micro-task management platform featuring role-based authentication, task creation/completion, coin-based economy, and comprehensive admin dashboard
- **Target Audience:** Freelancers, task creators, and platform administrators
- **Deployment:** Client and Server both on Vercel

### 📊 Key Metrics

✅ Role-Based Access Control (Worker/Buyer/Admin)  
✅ Coin-Based Economy System  
✅ **Task Management with CRUD Operations**  
✅ **Submission Review System**  
✅ Withdrawal Processing  
✅ Real-time Balance Updates  
✅ Responsive Design  
✅ Secure Authentication  
✅ Admin Dashboard with User Management  
✅ Image Upload Integration

---

## ✨ Key Features

### 1. 🔐 Role-Based Authentication System

- **Workers:** Browse tasks, submit work, earn coins, withdraw earnings
- **Buyers:** Create tasks, review submissions, purchase coins
- **Admins:** Platform management, user control, withdrawal processing
- NextAuth.js with Credentials and Google OAuth
- JWT-based API authentication

### 2. 💼 Comprehensive Task Management

- Create tasks with detailed requirements and rewards
- Browse available tasks with filtering
- Submit task completions with proof
- Review and approve/reject submissions
- Real-time task status updates

### 3. 💰 Coin-Based Economy

- Workers earn 10 coins on signup, Buyers get 50 coins
- Purchase additional coins through integrated payment system
- Secure coin transfers on task completion
- Real-time balance updates across the platform

### 4. 🏦 Withdrawal System

- Multiple payment methods (Stripe, Bkash, Rocket, Nagad)
- Minimum withdrawal limits and validation
- Admin approval workflow
- Transaction history tracking

### 5. 👨‍💼 Admin Dashboard

- User management with role changes
- Withdrawal request processing
- Platform statistics and analytics
- Task and submission oversight

### 6. 📱 Responsive Design

- Mobile-first approach with Tailwind CSS
- shadcn/ui components for consistency
- Dark/Light theme support
- Optimized for all device sizes

### 7. 🔒 Security Features

- Protected API routes with JWT authentication
- Role-based access control
- Input validation and sanitization
- Secure password hashing with bcryptjs

### 8. 🎨 Additional Features

- Image upload integration (ImgBB API)
- Real-time notifications with Sonner
- Loading states and error handling
- Comprehensive form validation

---

## 📁 Project Structure

```
MicroEarn/
├── microearn-client/            # Next.js Frontend
│   ├── src/
│   │   ├── app/                 # Next.js App Router
│   │   │   ├── (auth)/         # Authentication pages
│   │   │   ├── dashboard/      # Role-based dashboards
│   │   │   │   ├── admin/      # Admin dashboard
│   │   │   │   ├── buyer/      # Buyer dashboard
│   │   │   │   └── worker/     # Worker dashboard
│   │   │   └── api/            # API routes and proxy
│   │   ├── components/         # Reusable components
│   │   │   ├── home/          # Homepage components
│   │   │   ├── layouts/       # Layout components
│   │   │   ├── providers/     # Context providers
│   │   │   └── ui/            # shadcn/ui components
│   │   └── lib/               # Utilities and configs
│   │       ├── api.js         # API client functions
│   │       ├── auth.js        # NextAuth configuration
│   │       └── mongodb.js     # MongoDB connection
│   ├── middleware.js          # Route protection
│   ├── .env.local            # Environment variables
│   └── package.json
│
└── microearn-server/           # Express Backend
    ├── src/
    │   ├── config/            # Database configuration
    │   ├── middleware/        # Auth middleware
    │   ├── routes/           # API routes
    │   │   ├── auth.js       # Authentication
    │   │   ├── tasks.js      # Task management
    │   │   ├── users.js      # User management
    │   │   ├── submissions.js # Submission handling
    │   │   ├── withdrawals.js # Withdrawal processing
    │   │   └── payments.js   # Payment processing
    │   └── index.js          # Main server file
    ├── .env                  # Environment variables
    └── package.json
```

---

## �u API Documentation

### Base URL

```
Production: https://microearn-server.vercel.app/api
Local: http://localhost:5000/api
```

### Authentication

Protected routes require JWT token in header:

```
Authorization: Bearer <jwt_token>
```

### Endpoints

#### Authentication

| Method | Endpoint        | Auth | Description           |
| ------ | --------------- | ---- | --------------------- |
| `POST` | `/auth/login`   | ❌   | User login            |
| `POST` | `/auth/register`| ❌   | User registration     |
| `GET`  | `/auth/me`      | ✅   | Get current user info |

#### Tasks

| Method   | Endpoint      | Auth | Description                    |
| -------- | ------------- | ---- | ------------------------------ |
| `GET`    | `/tasks`      | ❌   | Get all tasks (with filters)   |
| `GET`    | `/tasks/:id`  | ❌   | Get single task                |
| `POST`   | `/tasks`      | ✅   | Create new task (Buyer only)   |
| `PATCH`  | `/tasks/:id`  | ✅   | Update task                    |
| `DELETE` | `/tasks/:id`  | ✅   | Delete task                    |

#### Submissions

| Method | Endpoint                    | Auth | Description              |
| ------ | --------------------------- | ---- | ------------------------ |
| `GET`  | `/submissions`              | ✅   | Get submissions          |
| `POST` | `/submissions`              | ✅   | Submit task completion   |
| `PATCH`| `/submissions/:id/review`   | ✅   | Review submission        |

#### Users

| Method   | Endpoint              | Auth | Description                |
| -------- | --------------------- | ---- | -------------------------- |
| `GET`    | `/users`              | ✅   | Get users (Admin only)     |
| `GET`    | `/users/worker/stats` | ✅   | Get worker statistics      |
| `GET`    | `/users/buyer/stats`  | ✅   | Get buyer statistics       |
| `PATCH`  | `/users/:id/role`     | ✅   | Update user role (Admin)   |
| `DELETE` | `/users/:id`          | ✅   | Delete user (Admin)        |

#### Payments & Withdrawals

| Method | Endpoint               | Auth | Description                    |
| ------ | ---------------------- | ---- | ------------------------------ |
| `POST` | `/payments/purchase`   | ✅   | Purchase coins                 |
| `GET`  | `/payments/history`    | ✅   | Get payment history            |
| `GET`  | `/withdrawals`         | ✅   | Get withdrawal requests        |
| `POST` | `/withdrawals`         | ✅   | Create withdrawal request      |
| `PATCH`| `/withdrawals/:id`     | ✅   | Process withdrawal (Admin)     |

### Query Parameters

**GET /tasks**

- `buyer` - Filter by buyer ID
- `status` - Filter by task status
- `limit` - Limit number of results

**GET /submissions**

- `status` - Filter by submission status
- `worker` - Filter by worker ID
- `buyer` - Filter by buyer ID

### Request/Response Examples

**POST /tasks**

```json
{
  "title": "Data Entry Task",
  "description": "Enter product information into spreadsheet",
  "quantity": 10,
  "reward": 5,
  "deadline": "2024-12-31",
  "submissionInfo": "Submit completed spreadsheet",
  "imageUrl": "https://example.com/image.jpg"
}
```

**POST /submissions**

```json
{
  "taskId": "507f1f77bcf86cd799439011",
  "submissionDetails": "Task completed as requested",
  "submissionProof": "https://example.com/proof.jpg"
}
```

---

## ⚙️ Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB account
- Google OAuth credentials (optional)
- ImgBB API key (for image uploads)

### Client Setup

1. **Clone the repository**

```bash
git clone https://github.com/AdalOnShow/microearn-client
cd microearn-client
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Create a `.env.local` file in the root directory:

```env
# NextAuth Configuration
AUTH_SECRET=your-secret-key-here-generate-with-openssl-rand-base64-32
AUTH_URL=http://localhost:3000

# JWT for API Communication
JWT_SECRET=your-jwt-secret-key-here-generate-with-openssl-rand-base64-32

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# MongoDB Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/microearn?appName=Cluster0
MONGODB_DB_NAME=microearn

# Backend API URL
NEXT_PUBLIC_API_URL=https://microearn-server.vercel.app/api

# Image Upload Service
NEXT_PUBLIC_IMGBB_API_KEY=your-imgbb-api-key
```

4. **Run the development server**

```bash
npm run dev
```

5. **Build for production**

```bash
npm run build
```

---

### Server Setup

1. **Clone the server repository**

```bash
git clone https://github.com/AdalOnShow/microearn-server
cd microearn-server
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in the root directory:

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/microearn?appName=Cluster0
JWT_SECRET=your-jwt-secret-key-change-in-production
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:3000
```

4. **Run the server**

```bash
npm start
```

The server will start on `http://localhost:5000`

---

## 🤝 Contributing

Contributions are always welcome! Here's how you can help:

### Steps to Contribute

1. **Fork the Project**
2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit Your Changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the Branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

---

## 📬 Contact

**Sharif Adal**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/adalonshow/)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:sharifadal2008@gmail.com)

### 🔗 Project Links

- **Live Demo:** [https://microearn-client.vercel.app/](https://microearn-client.vercel.app/)
- **Client Repository:** [MicroEarn Client](https://github.com/AdalOnShow/microearn-client)
- **Server Repository:** [MicroEarn Server](https://github.com/AdalOnShow/microearn-server)

---

<div align="center">

Made with ❤️ by [Sharif Adal](https://github.com/AdalOnShow)

⭐ Star this repo if you find it helpful!

</div>