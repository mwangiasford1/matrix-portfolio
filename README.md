# Matrix Portfolio

A minimal matrix-themed portfolio website with MongoDB Atlas backend.

## Structure
```
├── index.html          # Main HTML file
├── assets/
│   ├── css/
│   │   └── style.css   # Styles
│   ├── js/
│   │   └── script.js   # JavaScript
│   └── images/         # Images folder
├── BACKEND/
│   ├── server.js       # Express server
│   ├── package.json    # Dependencies
│   ├── .env           # Environment variables
│   └── .gitignore     # Git ignore
├── FRONTEND/           # Frontend files
└── README.md           # Documentation
```

## Features
- Matrix rain animation
- Glitch effects
- Responsive design
- Smooth scrolling
- MongoDB Atlas database
- Contact form API

## Setup
1. **Frontend**: Open `index.html` in browser
2. **Backend**: 
   - `cd BACKEND`
   - `npm install`
   - Update `.env` with MongoDB Atlas URI
   - `node server.js`

## API Endpoints
- `POST /api/contact` - Save contact messages
- `GET /api/contacts` - Get all contacts"# matrix-portfolio" 
