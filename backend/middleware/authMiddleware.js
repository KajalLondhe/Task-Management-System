const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    console.log('Received Token:', token); // Log the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    console.log('Decoded Token:', decoded); // Log the decoded payload
    req.user = decoded; // Attach user info to the request
    next();
  } catch (err) {
    console.error('Invalid Token:', err.message); // Log error details
    res.status(400).json({ error: 'Invalid token' });
  }
};
