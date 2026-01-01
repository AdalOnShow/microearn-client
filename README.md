# MicroEarn Client

A modern micro-task platform where users can earn money by completing simple tasks or hire workers to complete tasks for them.

## 🌐 Live Site

**Live URL:** [https://microearn.vercel.app](https://microearn.vercel.app)

## 🔐 Admin Credentials

- **Email:** admin@microearn.com
- **Password:** admin123456

## ✨ Features

1. **Role-Based Authentication** - Three distinct user roles: Worker, Buyer, and Admin with role-specific dashboards and permissions

2. **Secure Authentication** - NextAuth.js integration with Credentials and Google OAuth providers, JWT session management

3. **Worker Dashboard** - Browse available tasks, track submissions, view earnings, and withdraw coins

4. **Buyer Dashboard** - Create tasks, review worker submissions, approve/reject work, and purchase coins

5. **Admin Dashboard** - Platform overview, user management, role changes, withdrawal processing, and report handling

6. **Task Management** - Full CRUD operations for tasks with categories, rewards, deadlines, and quantity limits

7. **Submission System** - Workers submit task completions, buyers review and approve/reject with feedback

8. **Coin Economy** - Workers earn 10 coins on signup, Buyers get 50 coins, coin transfers on task completion

9. **Withdrawal System** - Workers can withdraw earnings via PayPal, bank transfer, or cryptocurrency

10. **Reporting System** - Users can report issues with tasks, submissions, or other users for admin review

11. **Responsive Design** - Fully responsive layout optimized for mobile, tablet, and desktop devices

12. **Server-Side Rendering** - SSR-safe architecture with proper hydration and session persistence

13. **Protected Routes** - Middleware-based route protection with role-based access control

14. **Real-Time Updates** - Session updates reflect coin balance and role changes immediately

15. **Modern UI Components** - Built with shadcn/ui components for consistent, accessible design

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** JavaScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Authentication:** NextAuth.js v5
- **Database:** MongoDB
- **State Management:** React Server Components + Client Components

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/microearn-client.git

# Navigate to project directory
cd microearn-client

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

## 🔧 Environment Variables

```env
AUTH_SECRET=your-auth-secret
AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
MONGODB_URI=mongodb://localhost:27017/microearn
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages
│   ├── dashboard/         # Role-based dashboards
│   └── api/               # API routes
├── components/
│   ├── home/              # Homepage sections
│   ├── layouts/           # Layout components
│   ├── providers/         # Context providers
│   └── ui/                # shadcn/ui components
└── lib/                   # Utilities and configurations
```

## 🚀 Deployment

The application is deployed on Vercel. Push to the main branch to trigger automatic deployment.

## 📄 License

MIT License