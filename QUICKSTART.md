# Quick Start Guide

## Prerequisites
- Node.js v14+
- npm or yarn
- NeonDB connection string
- Gemini API key

## 5-Minute Setup

### Step 1: Backend
```bash
cd server
cp .env.example .env
# Edit .env and add:
# DATABASE_URL=your_neon_connection_string
# GEMINI_API_KEY=your_api_key
# JWT_SECRET=change_this_to_random_string

npm install
npm run dev
```

### Step 2: Frontend (New Terminal)
```bash
cd client
npm install
npm start
```

### Step 3: Access
- Frontend: http://localhost:3000
- Backend: http://localhost:5000/api/health

### Step 4: Test
1. Register a new account
2. Create a new chat
3. Send a message
4. Get AI response!

## Next Steps
- Read the full [README.md](../README.md)
- Explore the API endpoints
- Customize the UI
- Deploy to production

## Getting API Keys

### NeonDB
1. Visit https://console.neon.tech
2. Create project
3. Copy connection string

### Gemini API
1. Visit https://aistudio.google.com
2. Click "Get API Key"
3. Create and copy key

## Common Issues

**Port 5000 already in use?**
```bash
# Change PORT in server/.env
PORT=8000
```

**Frontend won't connect?**
- Check if backend is running: http://localhost:5000/api/health
- Verify proxy in client/package.json

**Database errors?**
- Test connection: `psql your_connection_string`
- Check DATABASE_URL in .env

## Need Help?
Check the troubleshooting section in README.md
