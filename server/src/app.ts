import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import userRoutes from "./routes/authRoutes";
import serviceRoutes from "./routes/serviceRoutes";
import partnerRoutes from "./routes/partnerRoutes";
import adminUserRoutes from "./routes/userRoutes";
import adminRoutes from "./routes/admin/adminRoutes";
import adminPartnerControllerRoutes from "./routes/admin/adminPartnerControllerRoutes";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many authentication attempts, please try again later.',
});

app.use('/api', limiter);
app.use('/api/v1/users/login', authLimiter);
app.use('/api/v1/admin/login', authLimiter);

// Serve admin panel static files
app.use('/admin', express.static(path.join(__dirname, '../../admin_panel/dist')));

app.use(cookieParser());

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? process.env.FRONTEND_URL?.split(',') || []
    : ["http://localhost:5174", "http://localhost:5173"],
  credentials: true,
};

app.use(cors(corsOptions));

// Body parsing
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1", serviceRoutes);
app.use("/api/v1", partnerRoutes);
app.use("/api/v1", adminUserRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/admin/partners", adminPartnerControllerRoutes);

// Email route
app.post("/api/v1/send-email", async (req, res) => {
  try {
    const { name, email, phone, service, question } = req.body;
    console.log("Email data received:", { name, email, phone, service, question });
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({ message: "Failed to send email" });
  }
});


// Health check
app.get("/", (_req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is running",
    timestamp: new Date().toISOString()
  });
});

// API health check
app.get("/api/health", (_req, res) => {
  res.status(200).json({
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Global error handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Error:', err);
  const status = err.status || err.statusCode || 500;
  const message = process.env.NODE_ENV === 'production'
    ? 'Internal Server Error'
    : err.message || 'Something went wrong';
  res.status(status).json({ error: { message, status } });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: { message: 'Route not found', status: 404 } });
});

export { app };