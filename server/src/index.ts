import dotenv from "dotenv";
// Load environment variables first
dotenv.config();

import { app } from "./app";
import { getPgVersion } from "./db";
import { prisma } from "./lib/prisma";

const port = process.env.PORT || 4000

const startServer = async () => {
  try {
    // Initialize database connection
    await getPgVersion();
    
    // Test Prisma connection
    await prisma.$connect();
    console.log('Prisma connected successfully');
    
    // Start server
    const server = app.listen(port, () => {
      console.log(`🚀 Server is running on http://localhost:${port}`);
      console.log(`📊 Admin panel: http://localhost:${port}/admin`);
      console.log(`🔍 Health check: http://localhost:${port}/api/health`);
    });

    // Graceful shutdown
    const gracefulShutdown = (signal: string) => {
      console.log(`\n${signal} received, shutting down gracefully...`);
      
      server.close(async () => {
        console.log('HTTP server closed');
        
        try {
          await prisma.$disconnect();
          console.log('Database disconnected');
          process.exit(0);
        } catch (error) {
          console.error('Error during shutdown:', error);
          process.exit(1);
        }
      });
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
    
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();