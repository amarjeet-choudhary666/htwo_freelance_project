import { Request, Response, NextFunction } from 'express';

interface LogData {
  method: string;
  url: string;
  status: number;
  responseTime: number;
  userAgent?: string;
  ip: string;
  timestamp: string;
}

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();
  
  // Capture original end function
  const originalEnd = res.end.bind(res);
  
  res.end = function(this: Response, chunk?: any, encoding?: any, cb?: () => void): Response {
    const responseTime = Date.now() - startTime;
    
    const logData: LogData = {
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      responseTime,
      userAgent: req.get('User-Agent'),
      ip: req.ip || req.connection.remoteAddress || 'unknown',
      timestamp: new Date().toISOString()
    };
    
    // Log based on status code
    if (res.statusCode >= 400) {
      console.error('HTTP Error:', logData);
    } else if (responseTime > 1000) {
      console.warn('Slow Request:', logData);
    } else if (process.env.NODE_ENV === 'development') {
      console.log('HTTP Request:', logData);
    }
    
    // Call original end function with proper arguments
    if (typeof chunk === 'function') {
      return originalEnd(chunk);
    } else if (typeof encoding === 'function') {
      return originalEnd(chunk, encoding);
    } else {
      return originalEnd(chunk, encoding, cb);
    }
  };
  
  next();
};

export const performanceMonitor = (req: Request, res: Response, next: NextFunction) => {
  const startTime = process.hrtime.bigint();

  res.on('finish', () => {
    const endTime = process.hrtime.bigint();
    const duration = Number(endTime - startTime) / 1000000; // Convert to milliseconds

    // Log slow requests
    if (duration > 500) {
      console.warn(`Slow request detected: ${req.method} ${req.originalUrl} - ${duration.toFixed(2)}ms`);
    }
  });

  next();
};