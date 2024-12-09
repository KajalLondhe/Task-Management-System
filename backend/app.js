const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { PORT, MONGO_URI } = require('./config');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const cookieParser = require('cookie-parser');
const app = express();
require('dotenv').config();

// Enable CORS with credentials
app.use(
  cors({
    origin: 'http://localhost:5173', // Frontend URL
    credentials: true, // Allow cookies
  })
);

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

mongoose.connect('mongodb://localhost:27017/taskmanagement')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
