const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');

// Enhanced authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  // For demo mode, accept demo tokens
  if (token.startsWith('demo-jwt-token-')) {
    req.user = { id: 'demo-user', role: 'user' };
    return next();
  }

  jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Input sanitization
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .replace(/[<>]/g, '') // Remove potential XSS
    .replace(/['";]/g, '') // Remove SQL injection chars
    .trim()
    .substring(0, 1000); // Limit length
};

// Enhanced rate limiting for auth endpoints
const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: { error: 'Too many authentication attempts' },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  authenticateToken,
  sanitizeInput,
  authRateLimit
};