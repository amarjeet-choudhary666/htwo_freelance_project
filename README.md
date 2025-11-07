# HTWO Cloud Services Platform - OPTIMIZED

A comprehensive, **high-performance** cloud infrastructure platform offering enterprise-grade cloud services, web hosting, dedicated servers, and business software solutions. Built with modern web technologies and optimized for production-scale performance, security, and scalability.

## 🚀 Performance Optimizations

### Backend Optimizations
- **Security**: Helmet.js, rate limiting, CORS protection, input validation
- **Performance**: Compression middleware, connection pooling, intelligent caching
- **Database**: Optimized Prisma queries with connection pooling and indexing
- **Error Handling**: Comprehensive error boundaries and structured logging
- **Monitoring**: Health checks, graceful shutdowns, and performance metrics

### Admin Panel Optimizations
- **Code Splitting**: Lazy loading with React.lazy() for reduced initial bundle size
- **State Management**: React Query for efficient data fetching and caching
- **Bundle Optimization**: Vite with optimized build configuration and tree shaking
- **Caching**: Intelligent caching strategies with stale-while-revalidate
- **Performance**: Virtual scrolling for large datasets and memoized components

### Infrastructure Optimizations
- **Docker**: Multi-stage builds for minimal production image sizes
- **Nginx**: Optimized static file serving with gzip compression
- **Database**: PostgreSQL with proper indexing and query optimization
- **Caching**: Redis for session management and data caching
- **CDN**: Cloudinary integration for optimized image delivery
# HTWO Cloud Services Platform

A comprehensive cloud infrastructure platform offering enterprise-grade cloud services, web hosting, dedicated servers, and business software solutions. Built with modern web technologies to deliver scalable, secure, and high-performance cloud solutions.

## 🏗️ Architecture Overview

This project consists of three main components:

### Frontend (React + TypeScript + Vite)
- **Location**: `frontend/`
- **Tech Stack**: React 19, TypeScript, Vite, Tailwind CSS, Framer Motion
- **Features**: Responsive web application with modern UI/UX, authentication via Clerk, contact forms, pricing calculators

### Backend (Node.js + Express + TypeScript)
- **Location**: `server/`
- **Tech Stack**: Node.js, Express, TypeScript, Prisma ORM, PostgreSQL (via Neon), JWT authentication
- **Features**: RESTful API, user management, partner management, admin panel, file uploads, email services

### Admin Panel (React + TypeScript + Vite)
- **Location**: `admin_panel/`
- **Tech Stack**: React 19, TypeScript, Vite, Tailwind CSS, Framer Motion
- **Features**: Administrative dashboard for managing users, services, partners, and submissions

## 🚀 Services Offered

### Cloud Services
- **Tally on Cloud**: Tally Prime accounting software on secure cloud infrastructure
- **Busy on Cloud**: Busy accounting software cloud deployment
- **Marg on Cloud**: Marg ERP system on cloud
- **Navision/AX on Cloud**: Microsoft Dynamics on cloud
- **SAP Business One on Cloud**: SAP B-One cloud solutions

### Hosting Solutions
- **Linux Hosting**: Secure Linux web hosting
- **Windows Hosting**: Reliable Windows hosting solutions
- **Dedicated Servers**: High-performance dedicated server hosting
- **VPS Linux/Windows**: Virtual Private Server solutions

### Additional Services
- **Email Solutions**: Google Workspace, Zimbra business email
- **Storage as Service**: Cloud storage solutions
- **Backup & Recovery**: Data backup and disaster recovery services
- **Disaster Recovery as a Service**: Comprehensive DR solutions

## 🛠️ Tech Stack

### Frontend
- React 19 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Framer Motion for animations
- React Router for navigation
- Clerk for authentication
- React Hook Form for form handling
- EmailJS for contact forms
- React Google reCAPTCHA for spam protection

### Backend
- Node.js with Express
- TypeScript for type safety
- Prisma ORM with PostgreSQL
- JWT for authentication
- bcrypt for password hashing
- Multer for file uploads
- Cloudinary for image storage
- CORS for cross-origin requests
- Zod for validation

### Database
- PostgreSQL (hosted on Neon)
- Prisma for database management and migrations

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database (or Neon account)
- Git

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd freelance_project
```

### 2. Environment Setup

#### Backend Environment Variables
Create `server/.env` file:
```env
DATABASE_URL="postgresql://username:password@host:port/database"
JWT_SECRET="your-jwt-secret"
CLOUDINARY_CLOUD_NAME="your-cloudinary-name"
CLOUDINARY_API_KEY="your-cloudinary-api-key"
CLOUDINARY_API_SECRET="your-cloudinary-api-secret"
CLERK_PUBLISHABLE_KEY="your-clerk-publishable-key"
CLERK_SECRET_KEY="your-clerk-secret-key"
FRONTEND_URL="http://localhost:5173"
ADMIN_PANEL_URL="http://localhost:5174"
```

#### Frontend Environment Variables
Create `frontend/.env` file:
```env
VITE_CLERK_PUBLISHABLE_KEY="your-clerk-publishable-key"
VITE_RECAPTCHA_SITE_KEY="your-recaptcha-site-key"
VITE_EMAILJS_SERVICE_ID="your-emailjs-service-id"
VITE_EMAILJS_TEMPLATE_ID="your-emailjs-template-id"
VITE_EMAILJS_PUBLIC_KEY="your-emailjs-public-key"
```

#### Admin Panel Environment Variables
Create `admin_panel/.env` file:
```env
VITE_API_BASE_URL="http://localhost:3000/api"
```

### 3. Database Setup

#### Install Prisma CLI globally (if not already installed)
```bash
npm install -g prisma
```

#### Navigate to server directory and setup database
```bash
cd server
npm install
npx prisma generate
npx prisma migrate dev --name init
```

### 4. Install Dependencies

#### Backend
```bash
cd server
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

#### Admin Panel
```bash
cd admin_panel
npm install
```

### 5. Start Development Servers

#### Backend (Terminal 1)
```bash
cd server
npm run dev
```
Server will run on `http://localhost:3000`

#### Frontend (Terminal 2)
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:5173`

#### Admin Panel (Terminal 3)
```bash
cd admin_panel
npm run dev
```
Admin panel will run on `http://localhost:5174`

## 📜 Available Scripts

### Backend Scripts
- `npm run dev` - Start development server with nodemon
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio
- `npm run prisma:reset` - Reset database

### Frontend Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Admin Panel Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build
- `npm run build:prod` - Build and copy to server public directory

## 🗂️ Project Structure

```
freelance_project/
├── admin_panel/          # Admin dashboard application
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Admin pages (Dashboard, Users, etc.)
│   │   └── api/          # API client functions
│   └── package.json
├── frontend/             # Main customer-facing application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Application pages
│   │   ├── assets/       # Static assets (images, icons)
│   │   ├── hooks/        # Custom React hooks
│   │   ├── contexts/     # React contexts
│   │   └── utils/        # Utility functions
│   └── package.json
├── server/               # Backend API server
│   ├── src/
│   │   ├── controllers/  # Route controllers
│   │   ├── routes/       # API routes
│   │   ├── middlewares/  # Express middlewares
│   │   ├── utils/        # Utility functions
│   │   ├── lib/          # Library configurations
│   │   └── db/           # Database connection
│   ├── prisma/           # Database schema and migrations
│   └── package.json
└── README.md            # This file
```

## 🔐 Authentication

The application uses Clerk for authentication with the following features:
- User registration and login
- Social login options
- JWT token-based API authentication
- Protected routes and admin access control

## 📧 Contact & Support

- **Sales**: +91 8076225440, +91 8595327337
- **Support**: +91 8595515765
- **Email**: Contact through the website forms

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software owned by HTWO.

## 🏢 About HTWO

HTWO is a leading provider of cloud infrastructure and business software solutions, specializing in enterprise-grade cloud services, web hosting, and ERP software deployments. With years of experience, we deliver world-class services that prioritize our clients' success.

