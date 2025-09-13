# 🚀 Render Deployment Guide - Matrix Portfolio

This guide will walk you through deploying your Matrix Portfolio backend to Render.

## 📋 Prerequisites

1. **GitHub Repository**: Your code should be pushed to GitHub
2. **MongoDB Atlas Account**: For database hosting
3. **Gmail Account**: For email notifications
4. **Render Account**: Sign up at [render.com](https://render.com)

## 🔧 Step 1: Prepare Your Backend

### 1.1 Environment Variables Setup
Create a `.env` file in the Backend directory with the following variables:

```env
NODE_ENV=production
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-app-password
PORT=5000
```

### 1.2 Gmail App Password Setup
1. Go to your Google Account settings
2. Enable 2-Step Verification
3. Go to Security → App Passwords
4. Generate a new app password for "Mail"
5. Use this password in your `GMAIL_PASS` variable

## 🌐 Step 2: Deploy to Render

### 2.1 Create New Web Service
1. Log in to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Select your repository: `mwangiasford1/matrix-portfolio`

### 2.2 Configure Build Settings
- **Name**: `matrix-portfolio-backend`
- **Environment**: `Node`
- **Region**: Choose closest to your users
- **Branch**: `main`
- **Root Directory**: `Backend`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### 2.3 Set Environment Variables
In the Render dashboard, go to Environment tab and add:

| Key | Value | Description |
|-----|-------|-------------|
| `NODE_ENV` | `production` | Environment mode |
| `MONGO_URI` | `mongodb+srv://...` | Your MongoDB Atlas connection string |
| `GMAIL_USER` | `your-email@gmail.com` | Your Gmail address |
| `GMAIL_PASS` | `your-app-password` | Gmail app password |
| `PORT` | `5000` | Server port (optional, Render sets this) |

### 2.4 Deploy
1. Click "Create Web Service"
2. Wait for deployment to complete (usually 2-3 minutes)
3. Your backend will be available at: `https://matrix-portfolio-backend.onrender.com`

## 🔍 Step 3: Test Your Deployment

### 3.1 Test Backend Health
Visit: `https://your-app-name.onrender.com/api/test`

Expected response:
```json
{
  "message": "Backend is working!"
}
```

### 3.2 Test Contact Form
Send a POST request to: `https://your-app-name.onrender.com/api/contact`

```json
{
  "name": "Test User",
  "email": "test@example.com",
  "message": "Test message"
}
```

## 🔧 Step 4: Update Frontend Configuration

Update your frontend to use the Render backend URL:

### 4.1 Update API Base URL
In your frontend code, update the API base URL:

```javascript
const API_BASE_URL = 'https://your-app-name.onrender.com';
```

### 4.2 Update CORS Settings (if needed)
If you encounter CORS issues, update your backend CORS configuration:

```javascript
app.use(cors({
  origin: ['https://your-frontend-domain.com', 'http://localhost:3000'],
  credentials: true
}));
```

## 📊 Step 5: Monitor Your Application

### 5.1 Render Dashboard
- Monitor logs in real-time
- Check deployment status
- View performance metrics

### 5.2 Health Checks
- Set up health check endpoint
- Monitor uptime
- Set up alerts for downtime

## 🚨 Troubleshooting

### Common Issues:

1. **Build Fails**
   - Check that all dependencies are in `package.json`
   - Ensure Node.js version compatibility

2. **Database Connection Issues**
   - Verify MongoDB Atlas connection string
   - Check IP whitelist in MongoDB Atlas
   - Ensure database user has proper permissions

3. **Email Not Working**
   - Verify Gmail app password
   - Check Gmail account security settings
   - Test email configuration

4. **CORS Errors**
   - Update CORS configuration
   - Add frontend domain to allowed origins

## 🔄 Step 6: Continuous Deployment

### 6.1 Automatic Deployments
- Render automatically deploys on every push to main branch
- Monitor deployment logs for any issues

### 6.2 Manual Deployments
- Use "Manual Deploy" option in Render dashboard
- Deploy specific commits if needed

## 📈 Performance Optimization

### 6.1 Upgrade Plan (Optional)
- Free tier has limitations (sleeps after 15 minutes of inactivity)
- Consider upgrading to paid plan for production use

### 6.2 Database Optimization
- Use MongoDB Atlas M0 (free) or higher
- Optimize database queries
- Implement connection pooling

## 🎉 Success!

Your Matrix Portfolio backend is now live on Render! 

**Backend URL**: `https://your-app-name.onrender.com`
**API Endpoints**:
- `GET /api/test` - Health check
- `POST /api/contact` - Contact form submission
- `GET /api/contacts` - Retrieve all contacts

## 📞 Support

If you encounter any issues:
1. Check Render logs
2. Verify environment variables
3. Test endpoints individually
4. Check MongoDB Atlas connection

---

*Happy Deploying! 🚀*
