# Troubleshooting Guide

## Common Issues and Solutions

---

## ❌ Backend Issues

### 1. "Port 5000 already in use"

**Error Message**: `Error: listen EADDRINUSE: address already in use :::5000`

**Solutions**:

**Option A: Change Port**
```bash
# Edit server/.env
PORT=8000

# Restart server
npm run dev
```

**Option B: Kill Process Using Port**

Linux/Mac:
```bash
lsof -i :5000 | grep LISTEN | awk '{print $2}' | xargs kill -9
```

Windows (PowerShell):
```powershell
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process -Force
```

Windows (Command Prompt):
```cmd
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

---

### 2. "Cannot find module 'pg'"

**Error Message**: `Error: Cannot find module 'pg'`

**Causes**: Missing dependencies

**Solutions**:
```bash
cd server
npm install
npm run dev
```

---

### 3. "Database connection refused"

**Error Message**: `Error: connect ECONNREFUSED 127.0.0.1:5432`

**Causes**:
- PostgreSQL not running
- Wrong connection string
- Database server unreachable

**Solutions**:

1. **Check DATABASE_URL in .env**
   ```
   DATABASE_URL=postgresql://user:password@host:port/database
   ```

2. **For NeonDB - Make sure to include SSL**
   ```
   DATABASE_URL=postgresql://...?sslmode=require
   ```

3. **Test connection manually**
   ```bash
   psql your_connection_string
   ```

4. **Check if host is accessible**
   ```bash
   ping neon-host.neon.tech
   ```

---

### 4. "GEMINI_API_KEY is not defined"

**Error Message**: `Error: GEMINI_API_KEY is not defined`

**Solutions**:

1. **Check .env file exists**
   ```bash
   # In server directory
   ls -la .env  # Linux/Mac
   dir .env     # Windows
   ```

2. **Add API key to .env**
   ```
   GEMINI_API_KEY=AIzaSy...your...key...
   ```

3. **Restart server**
   ```bash
   npm run dev
   ```

4. **Verify API key format**
   - Should start with `AIzaSy`
   - No spaces or quotes around it

---

### 5. "JWT_SECRET not defined"

**Similar to above, add to .env:**
```
JWT_SECRET=your_secret_key_at_least_32_characters_long
```

---

### 6. "Invalid connection string"

**Error Message**: `Error: invalid connection string`

**Solutions**:

1. **Check format** - Should be:
   ```
   postgresql://username:password@host:port/database
   ```

2. **Verify credentials** - Check username and password

3. **Check special characters** - URL encode if needed
   ```
   @ → %40
   : → %3A
   / → %2F
   ```

4. **For NeonDB** - Must include:
   ```
   ?sslmode=require
   ```

---

### 7. "Server crashes after starting"

**Check logs for error message, then:**

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Restart
npm run dev
```

---

## ❌ Frontend Issues

### 1. "Port 3000 already in use"

**Error Message**: `Something is already running on port 3000`

**Solutions**:

```bash
# Kill process
# macOS/Linux
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Windows PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process -Force

# Or change port
PORT=3001 npm start
```

---

### 2. "Cannot find module 'react'"

**Error Message**: `Error: Cannot find module 'react'`

**Solutions**:
```bash
cd client
npm install
npm start
```

---

### 3. "Dependencies conflict / npm error"

**Error**: Various npm-related errors

**Solutions**:

```bash
cd client

# Clear everything
rm -rf node_modules package-lock.json

# Reinstall clean
npm install

# Start fresh
npm start
```

For Mac with M1/M2 chip, might need:
```bash
npm install --legacy-peer-deps
```

---

### 4. "Page won't load / blank white screen"

**Causes**:
- Build errors
- JavaScript errors
- Missing dependencies

**Solutions**:

1. **Check browser console (F12)**
   - Look for red error messages
   - Copy error and search online

2. **Check terminal output**
   - Look for compilation warnings/errors

3. **Hard refresh**
   ```
   Ctrl+Shift+R (Windows/Linux)
   Cmd+Shift+R (Mac)
   ```

4. **Clear cache**
   ```bash
   # Stop server
   npm start  # Let it fully compile
   ```

---

### 5. "Cannot connect to backend"

**Error in console**: `NetworkError: Failed to fetch` or CORS error

**Solutions**:

1. **Check backend is running**
   - Open http://localhost:5000/api/health
   - Should see: `{"message":"Server is running"}`

2. **Check proxy setting in client/package.json**
   ```json
   "proxy": "http://localhost:5000"
   ```

3. **CORS Error?** Add to server/index.js:
   ```javascript
   app.use(cors({
     origin: 'http://localhost:3000'
   }));
   ```

4. **Restart both servers**

---

## ❌ API/Chat Issues

### 1. "No response from AI"

**Causes**:
- Invalid API key
- API quota exceeded
- Network issue

**Solutions**:

1. **Verify API key**
   - Check in Google AI Studio it's still valid
   - Make sure in .env with no spaces

2. **Check API quota**
   - Go to Google Cloud Console
   - Check if API is enabled
   - Check if you hit rate limits

3. **Check network**
   - Open DevTools Network tab
   - Look for failed requests
   - Check status codes

4. **Test with curl**
   ```bash
   curl http://localhost:5000/api/health
   ```

---

### 2. "Error: Invalid authentication credentials"

**Causes**:
- Token expired
- Token not sent properly
- Token invalid

**Solutions**:

1. **Logout and login again** - Get new token

2. **Check localStorage**
   - DevTools > Application > Local Storage
   - Look for `token` key
   - Should have a long string value

3. **For developers** - Check Authorization header:
   ```javascript
   // In API requests, should have:
   Authorization: Bearer YOUR_TOKEN_HERE
   ```

---

### 3. "Conversation won't save"

**Solutions**:

1. **Check database connection**
   - Look at backend console for errors
   - Verify DATABASE_URL

2. **Check conversation exists**
   - Make sure you created one first
   - Refresh page to see list

3. **Check user permissions**
   - Only see your own conversations
   - Must be logged in

---

### 4. "Message history lost"

**Causes**:
- Browser cleared local storage
- Database issue
- Session expired

**Solutions**:

1. **Check database**
   - Verify still connected
   - Check conversation still exists

2. **Reload page** - Fetch from server

3. **Create new conversation** - Start fresh

---

## ⚠️ Performance Issues

### 1. "Very slow responses"

**Solutions**:

1. **Check network**
   - DevTools > Network tab
   - Look at request times
   - Check API response time

2. **Optimize query** (backend)
   - Add database indexes
   - Limit results returned

3. **Check API quota**
   - Google API might be throttling

---

### 2. "Chat page slow to load"

**Solutions**:

1. **Clear browser cache**
   - DevTools > Application > Cache

2. **Optimize images** (if added later)

3. **Code splitting** (frontend)

---

## 🔍 Debugging Tips

### 1. Browser DevTools (F12)
- **Console**: JavaScript errors
- **Network**: API request/response
- **Application**: LocalStorage, cookies
- **Elements**: HTML structure

### 2. Backend Logs
```bash
# Add logging
console.log('Debug message', data);

# In server terminal, see logs printed
```

### 3. Database Testing
```bash
# Connect directly
psql your_connection_string

# List tables
\dt

# Query data
SELECT * FROM users;
```

### 4. API Testing Tools
- **Postman**: Visual API testing
- **curl**: Command-line testing
- **Insomnia**: API testing alternative

---

## 📋 Pre-Deployment Checklist

- [ ] All dependencies installed
- [ ] No errors in console
- [ ] All features working
- [ ] Database connection stable
- [ ] API keys valid
- [ ] HTTPS ready (for production)
- [ ] Error logging implemented
- [ ] Rate limiting configured
- [ ] CORS properly set
- [ ] Database backups working

---

## 🆘 Still Not Working?

1. **Check all error messages** - Read carefully
2. **Google the error** - Usually someone has solved it
3. **Check Stack Overflow** - Common issues documented
4. **Review logs** - Both frontend and backend
5. **Verify setup** - Follow SETUP_CHECKLIST.md again
6. **Check documentation** - README.md and guides
7. **Simplify** - Remove recent changes one by one
8. **Restart everything** - Sometimes helps!

---

## Quick Reset Commands

```bash
# Full clean restart
cd chatbot/server
rm -rf node_modules package-lock.json
npm install
npm run dev

# In new terminal
cd chatbot/client
rm -rf node_modules package-lock.json
npm install
npm start
```

---

For more help, see [README.md](README.md) or [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
