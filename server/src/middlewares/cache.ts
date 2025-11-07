import { Request, Response, NextFunction } from 'express';

interface CacheOptions {
  ttl?: number; // Time to live in seconds
  key?: (req: Request) => string;
}

const cache = new Map<string, { data: any; expires: number }>();

export const cacheMiddleware = (options: CacheOptions = {}) => {
  const { ttl = 300, key = (req) => req.originalUrl } = options; // Default 5 minutes

  return (req: Request, res: Response, next: NextFunction) => {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next();
    }

    const cacheKey = key(req);
    const cached = cache.get(cacheKey);

    // Check if cached data exists and is not expired
    if (cached && cached.expires > Date.now()) {
      res.setHeader('X-Cache', 'HIT');
      return res.json(cached.data);
    }

    // Store original json method
    const originalJson = res.json;

    res.json = function(data: any) {
      // Cache the response
      cache.set(cacheKey, {
        data,
        expires: Date.now() + (ttl * 1000)
      });

      res.setHeader('X-Cache', 'MISS');
      res.setHeader('Cache-Control', `public, max-age=${ttl}`);
      
      return originalJson.call(this, data);
    };

    next();
  };
};

// Clean expired cache entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of cache.entries()) {
    if (value.expires <= now) {
      cache.delete(key);
    }
  }
}, 60000); // Clean every minute

export const clearCache = (pattern?: string) => {
  if (pattern) {
    for (const key of cache.keys()) {
      if (key.includes(pattern)) {
        cache.delete(key);
      }
    }
  } else {
    cache.clear();
  }
};