# Asford's Matrix Portfolio

A modern, interactive portfolio website featuring Matrix-themed animations, built with React, Vite, and Tailwind CSS, powered by a Node.js backend with MongoDB Atlas.

## 🚀 Features

### Frontend
- **Matrix Rain Animation** - Cascading green characters with glow effects
- **Modern React Architecture** - Component-based with hooks
- **Tailwind CSS** - Utility-first styling with custom animations
- **Responsive Design** - Mobile-first approach
- **Interactive Elements** - Glitch effects, hover animations
- **Matrix Toggle** - Enable/disable matrix effects
- **Smooth Scrolling** - Enhanced navigation experience

### Backend
- **Express.js API** - RESTful contact form handling
- **MongoDB Atlas** - Cloud database integration
- **Email Integration** - Gmail SMTP for notifications
- **CORS Support** - Cross-origin resource sharing

## 📁 Project Structure

```
├── BACKEND/
│   ├── server.js           # Express server
│   ├── package.json        # Backend dependencies
│   ├── .env               # Environment variables
│   └── .gitignore         # Git ignore
├── FRONTEND/
│   ├── src/
│   │   ├── components/
│   │   │   ├── MatrixRain.jsx  # Matrix animation
│   │   │   └── Navbar.jsx      # Navigation component
│   │   ├── App.jsx            # Main application
│   │   └── main.jsx           # React entry point
│   ├── assets/
│   │   ├── css/style.css      # Custom styles
│   │   └── js/script.js       # Utility scripts
│   ├── index.html             # HTML template
│   ├── index.css              # Tailwind directives
│   ├── package.json           # Frontend dependencies
│   ├── vite.config.js         # Vite configuration
│   ├── tailwind.config.js     # Tailwind configuration
│   └── postcss.config.js      # PostCSS configuration
└── README.md                  # Documentation
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Canvas API** - Matrix rain animation

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - MongoDB object modeling
- **Nodemailer** - Email sending

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Gmail account (for email notifications)

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd BACKEND
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Update .env file
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
   PORT=5000
   GMAIL_USER=your-email@gmail.com
   GMAIL_PASS=your-app-password
   ```

4. **Start the server**
   ```bash
   npm start
   # or for development
   npm run dev
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd FRONTEND
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 📧 Email Configuration

To enable email notifications:

1. **Enable 2-Step Verification** in your Google Account
2. **Generate App Password**:
   - Go to Google Account Settings
   - Security → App Passwords
   - Select "Mail" and generate password
3. **Update .env** with the generated app password

## 🎨 Customization

### Matrix Animation
- Adjust opacity in `MatrixRain.jsx`
- Modify character sets and animation speed
- Toggle matrix effects with navbar button

### Styling
- Update colors in `tailwind.config.js`
- Modify animations in `index.css`
- Customize components in `src/components/`

## 📱 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contact` | Submit contact form |
| GET | `/api/contacts` | Retrieve all contacts |

## 🌐 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy dist/ folder
```

### Backend (Railway/Heroku)
```bash
# Set environment variables in deployment platform
# Deploy from BACKEND/ directory
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Asford Mwangi**
- Email: mwangiasford12@gmail.com
- GitHub: [@asford](https://github.com/mwangiasford1)
- LinkedIn: [Asford Mwangi](https://linkedin.com/in/asford)

---

*Built with ❤️ and lots of ☕*"# matrix-portfolio" 
