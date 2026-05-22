# Setup Checklist for AI Chatbot

## ✅ Pre-Setup Requirements
- [ ] Node.js v14+ installed
- [ ] npm v6+ installed
- [ ] NeonDB account created
- [ ] Neon connection string copied
- [ ] Google account with AI Studio access
- [ ] Gemini API key generated
- [ ] Git installed (optional)

## 🔑 API Keys & Credentials

### NeonDB Connection String
- [ ] Navigate to https://console.neon.tech
- [ ] Create or select project
- [ ] Copy connection string format: `postgresql://user:password@host/database`
- [ ] Paste in: `server/.env` as `DATABASE_URL`

**Example:**
```
DATABASE_URL=postgresql://neondb_owner:password@ep-xxxxx.us-east-1.neon.tech/neondb
```

### Gemini API Key
- [ ] Visit https://aistudio.google.com
- [ ] Click "Get API Key" or "Create API Key"
- [ ] Select or create Google Cloud project
- [ ] Copy the API key
- [ ] Paste in: `server/.env` as `GEMINI_API_KEY`

**Example:**
```
GEMINI_API_KEY=AIzaSy...your-api-key...
```

### JWT Secret (Generate One)
- [ ] Any random string of 32+ characters
- [ ] Can use: `openssl rand -base64 32`
- [ ] Or generate online: https://generate-random.org/authentication-key-generator
- [ ] Paste in: `server/.env` as `JWT_SECRET`

## 📦 Installation Steps

### Backend Setup
- [ ] Navigate to `server` directory: `cd server`
- [ ] Copy env template: `cp .env.example .env`
- [ ] Edit `.env` file with your credentials
- [ ] Install dependencies: `npm install`
- [ ] Verify setup: `npm run dev` (should connect to database)
- [ ] Press Ctrl+C to stop

### Frontend Setup
- [ ] Navigate to `client` directory: `cd ../client`
- [ ] Install dependencies: `npm install`
- [ ] Verify setup: `npm start` (browser should open)
- [ ] Press Ctrl+C to stop

## 🚀 Run the Application

### Terminal 1: Backend
```bash
cd server
npm run dev
# Should show: "Server is running on http://localhost:5000"
# And: "Database tables initialized successfully"
```

### Terminal 2: Frontend (New Terminal)
```bash
cd client
npm start
# Should open http://localhost:3000 automatically
```

### Terminal 3: Browser
- [ ] Open http://localhost:3000
- [ ] Sign up with email and password
- [ ] Create new conversation
- [ ] Send test message
- [ ] Receive AI response

## ✅ Verification Tests

### Backend Tests
- [ ] Run: `curl http://localhost:5000/api/health`
- [ ] Should see: `{"message":"Server is running"}`

### Database Tests
- [ ] Check server console for: "Database tables initialized"
- [ ] No connection errors

### Frontend Tests
- [ ] Page loads without errors
- [ ] Can fill registration form
- [ ] Can submit and login
- [ ] Chat interface displays correctly
- [ ] Can type message
- [ ] Can send message
- [ ] Receive AI response

### API Integration Tests
- [ ] Messages appear in conversation history
- [ ] Multiple conversations work
- [ ] Delete conversation works
- [ ] Logout and login works

## 🐛 Troubleshooting Checklist

### Backend Won't Start
- [ ] Check port 5000 is available
- [ ] Check DATABASE_URL is correct
- [ ] Check database connection works
- [ ] Check .env file exists
- [ ] Verify Node.js version: `node --version`

### Frontend Won't Start
- [ ] Check port 3000 is available
- [ ] Clear node_modules: `rm -rf node_modules`
- [ ] Reinstall: `npm install`
- [ ] Check Node.js version: `node --version`

### Can't Connect to API
- [ ] Verify backend is running
- [ ] Check browser console for errors
- [ ] Verify proxy in package.json
- [ ] Check CORS configuration
- [ ] Try: `http://localhost:5000/api/health`

### API Key Errors
- [ ] Verify GEMINI_API_KEY is set in .env
- [ ] Check key format (no extra spaces)
- [ ] Verify key is still active in Google Cloud
- [ ] Check API quota not exceeded

### Database Connection Failed
- [ ] Verify DATABASE_URL format
- [ ] Check credentials are correct
- [ ] Test connection manually if possible
- [ ] Verify SSL is required (it is)
- [ ] Check firewall settings

## 📋 Files Verification

### Server Files Required
- [ ] `server/index.js` - Entry point
- [ ] `server/db.js` - Database config
- [ ] `server/.env` - Credentials (should NOT commit)
- [ ] `server/routes/auth.js` - Auth endpoints
- [ ] `server/routes/chat.js` - Chat endpoints
- [ ] `server/routes/conversations.js` - Conversation endpoints
- [ ] `server/middleware/auth.js` - JWT middleware

### Client Files Required
- [ ] `client/src/App.js` - Main component
- [ ] `client/src/api.js` - API client
- [ ] `client/src/context/AuthContext.js` - Auth context
- [ ] `client/src/components/Chat.js` - Chat interface
- [ ] `client/src/components/Login.js` - Login page
- [ ] `client/src/components/Register.js` - Register page
- [ ] `client/public/index.html` - HTML template

## 🎯 Next Steps After Success

- [ ] Test all features thoroughly
- [ ] Customize styling
- [ ] Add more features
- [ ] Set up error tracking
- [ ] Plan deployment strategy
- [ ] Consider rate limiting
- [ ] Add logging system
- [ ] Performance optimization

## 🚀 Deployment Checklist

- [ ] Update NODE_ENV to production
- [ ] Set secure JWT_SECRET
- [ ] Enable HTTPS
- [ ] Set up CI/CD pipeline
- [ ] Add monitoring and logging
- [ ] Configure backup strategy
- [ ] Plan scaling strategy

## 📚 Documentation to Review

- [ ] `README.md` - Full documentation
- [ ] `QUICKSTART.md` - Quick setup guide
- [ ] `RUNNING.md` - Detailed running instructions
- [ ] API endpoint documentation
- [ ] Database schema documentation

## 💡 Tips

1. Keep a backup of your .env file credentials
2. Never commit .env file to git
3. Test in development before production
4. Monitor API quota usage
5. Keep dependencies updated
6. Use environment variables for all secrets
7. Enable database backups
8. Set up error logging
9. Plan for scaling early
10. Document any customizations

---

**Check off items as you complete them. You're ready when everything is checked! ✅**
