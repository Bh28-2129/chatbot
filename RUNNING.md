# Running the AI Chatbot Application

## Prerequisites Check
- [ ] Node.js installed? Run `node --version`
- [ ] npm installed? Run `npm --version`
- [ ] NeonDB connection string ready?
- [ ] Gemini API key ready?

## Full Setup & Run Guide

### Terminal 1: Start Backend

```bash
# Navigate to server directory
cd server

# Copy environment file
cp .env.example .env

# Edit .env file and add your credentials:
# DATABASE_URL=postgresql://user:password@neon-host/database
# GEMINI_API_KEY=your_google_api_key
# JWT_SECRET=your_secret_key_here
# PORT=5000

# Install dependencies (first time only)
npm install

# Start development server
npm run dev
```

**Expected Output:**
```
Server is running on http://localhost:5000
Database tables initialized successfully
```

### Terminal 2: Start Frontend

```bash
# Navigate to client directory
cd client

# Install dependencies (first time only)
npm install

# Start development server
npm start
```

**Expected Output:**
```
Compiled successfully!
Compiled with warnings (or no warnings)
Local: http://localhost:3000
```

### Terminal 3: Test API (Optional)

```bash
# Check if backend is running
curl http://localhost:3000/api/health

# Should respond with:
# {"message":"Server is running"}
```

## Access the Application

1. **Frontend**: Open http://localhost:3000 in your browser
2. **Backend API**: http://localhost:5000
3. **API Health Check**: http://localhost:5000/api/health

## First Time Usage

1. Click "Sign up" or go to `/register`
2. Create account with username, email, password
3. Login with your credentials
4. Click "New Chat" or "Start New Chat"
5. Type a message and press Send
6. Wait for Gemini AI response
7. Manage conversations from the sidebar

## Stopping the Application

Press `Ctrl+C` in each terminal where the applications are running

## Logs & Debugging

### Backend Logs
- Look in Terminal 1 for server logs
- Check database connection messages
- API request logs

### Frontend Logs
- Open browser DevTools: F12
- Check Console tab for errors
- Check Network tab for API calls

### Database Logs
- Connection issues appear in backend terminal
- Query errors logged to server

## Environment Variables Quick Reference

```
Backend (.env):
- DATABASE_URL    : Your NeonDB connection string
- GEMINI_API_KEY  : Your Google Generative AI API key
- JWT_SECRET      : Secret for signing JWT tokens
- PORT            : Server port (default 5000)
- NODE_ENV        : Development or production
```

## File Structure During Runtime

```
chatbot/
├── server/
│   ├── node_modules/        (created by npm install)
│   ├── .env                 (your configuration - NEVER commit)
│   ├── index.js             (server entry point)
│   └── ...
├── client/
│   ├── node_modules/        (created by npm install)
│   ├── build/               (created by npm build)
│   ├── public/
│   ├── src/
│   └── ...
└── README.md
```

## Performance Notes

- First load might take longer as React compiles
- Database connections are pooled for performance
- Messages are cached in browser localStorage
- API responses are streamed for better UX

## Tips & Tricks

1. **Keep history**: Conversations are saved to database
2. **Fast responses**: API responses are optimized
3. **Mobile friendly**: Use responsive design on mobile
4. **Keyboard shortcuts**: 
   - Shift+Enter: New line in message
   - Enter: Send message
5. **Developer mode**: Use browser DevTools for debugging

## Troubleshooting Checklist

- [ ] Backend running? Check Terminal 1
- [ ] Frontend running? Check Terminal 2
- [ ] Port 5000 available? Change if needed
- [ ] Database URL correct? Check .env
- [ ] API key valid? Test in Google AI Studio
- [ ] Network connected? Check console errors
- [ ] No typos in .env? Compare with .env.example

## Next Steps

1. Test different conversations
2. Explore the chat features
3. Review code structure
4. Customize styling
5. Deploy to production (when ready)

## Getting Help

1. Check README.md for detailed info
2. Review API errors in console
3. Check backend logs
4. Verify credentials
5. Check node_modules are installed

---

**Your AI Chatbot is ready! Start chatting! 🚀**
