const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const validator = require('validator');
const xss = require('xss');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Trust proxy for Render deployment
app.set('trust proxy', 1);

// Minimal security
app.use(helmet({ contentSecurityPolicy: false }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 contact form submissions per 15 minutes
  message: 'Too many requests, please try again later.'
});

app.use(limiter);

// CORS with specific origins
const corsOptions = {
  origin: [
    'https://matrix-portfolio-1.onrender.com',
    'http://localhost:3000',
    'http://localhost:5173'
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Check MongoDB connection status
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Contact Schema with validation
const contactSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    maxlength: 100,
    trim: true
  },
  email: { 
    type: String, 
    required: true,
    validate: {
      validator: validator.isEmail,
      message: 'Invalid email format'
    },
    maxlength: 254
  },
  message: { 
    type: String, 
    required: true,
    maxlength: 1000,
    trim: true
  },
  ip: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// Email transporter (disabled for performance)
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.GMAIL_USER,
//     pass: process.env.GMAIL_PASS
//   }
// });

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});



// Routes with security
app.post('/api/contact', contactLimiter, async (req, res) => {
  console.log('Contact form submission received');
  
  try {
    let { name, email, message } = req.body;
    
    // Input validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    // Sanitize inputs
    name = xss(name.trim());
    email = email.trim().toLowerCase();
    message = xss(message.trim());
    
    // Additional validation
    if (name.length > 100) {
      return res.status(400).json({ error: 'Name too long' });
    }
    
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    
    if (message.length > 1000) {
      return res.status(400).json({ error: 'Message too long' });
    }
    

    
    // Get client IP
    const clientIP = req.ip || req.connection.remoteAddress;
    
    // Save to database
    const contact = new Contact({ name, email, message, ip: clientIP });
    await contact.save();
    console.log('Contact saved successfully');

    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Protected admin route (add authentication in production)
app.get('/api/contacts', async (req, res) => {
  try {
    // In production, add proper authentication here
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_TOKEN}`) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const contacts = await Contact.find().sort({ createdAt: -1 }).select('-ip');
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    version: '2.0.0',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Version endpoint
app.get('/api/version', (req, res) => {
  res.json({ 
    version: '2.0.0',
    name: 'Matrix Portfolio API',
    description: 'Secure Backend API for Matrix Portfolio',
    features: ['Security Enhanced', 'Rate Limited', 'Spam Protected']
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});