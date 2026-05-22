# Environment Variables Reference

## Backend Environment Variables (.env)

### Database Configuration
```
DATABASE_URL=postgresql://user:password@host:5432/database
```
- **Type**: String
- **Required**: Yes
- **Example**: `postgresql://neondb_owner:password@ep-xxxxx.us-east-1.neon.tech/neondb?sslmode=require`
- **Description**: PostgreSQL connection string from NeonDB

### AI API Configuration
```
GEMINI_API_KEY=AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
- **Type**: String
- **Required**: Yes
- **Example**: Get from https://aistudio.google.com
- **Description**: Google Generative AI API key for Gemini model

### Server Configuration
```
PORT=5000
```
- **Type**: Number
- **Required**: No (default: 5000)
- **Range**: 1024-65535
- **Description**: Port for Express server

```
NODE_ENV=development
```
- **Type**: String
- **Required**: No (default: development)
- **Values**: development, production, test
- **Description**: Execution environment

### Security Configuration
```
JWT_SECRET=your-super-secret-key-at-least-32-characters-long
```
- **Type**: String
- **Required**: Yes
- **Min Length**: 32 characters
- **Description**: Secret key for JWT token signing

### Optional Configurations (Future)
```
JWT_EXPIRATION=24h
CORS_ORIGIN=http://localhost:3000
LOG_LEVEL=info
RATE_LIMIT_WINDOW=15m
RATE_LIMIT_MAX_REQUESTS=100
```

---

## Environment Setup by Stage

### Development (.env)
```
DATABASE_URL=postgresql://localhost/chatbot
GEMINI_API_KEY=AIzaSy...your-dev-key...
JWT_SECRET=dev-secret-key-at-least-32-characters-long
PORT=5000
NODE_ENV=development
```

### Staging (.env.staging)
```
DATABASE_URL=postgresql://staging-user:password@staging-host/chatbot
GEMINI_API_KEY=AIzaSy...your-staging-key...
JWT_SECRET=staging-secret-key-at-least-32-characters-long
PORT=5000
NODE_ENV=production
```

### Production (.env.production)
```
DATABASE_URL=postgresql://prod-user:password@prod-host/chatbot_prod
GEMINI_API_KEY=AIzaSy...your-production-key...
JWT_SECRET=production-secret-key-randomly-generated-32-chars
PORT=443
NODE_ENV=production
CORS_ORIGIN=https://yourdomain.com
```

---

## Getting Your Credentials

### NeonDB Connection String

1. Go to https://console.neon.tech
2. Select your project
3. Click "Connection String"
4. Copy the string that looks like:
   ```
   postgresql://neondb_owner:AbCdEfGhIjKlMnOp@ep-xxxxx.us-east-1.neon.tech/neondb?sslmode=require
   ```
5. Paste into `DATABASE_URL` in .env

### Gemini API Key

1. Visit https://aistudio.google.com
2. Click "Get API Key"
3. Select "Create new Secret API key"
4. Copy the key (format: `AIzaSyD...`)
5. Paste into `GEMINI_API_KEY` in .env

### JWT Secret

Generate a random 32+ character string using:
```bash
# Linux/Mac
openssl rand -base64 32

# Windows PowerShell
[System.Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes((New-Guid).ToString() + (New-Guid).ToString()))

# Online
https://generate-random.org/authentication-key-generator
```

---

## Common Issues

### "DATABASE_URL is not defined"
- [ ] Create `.env` file (copy from `.env.example`)
- [ ] Add `DATABASE_URL=...`
- [ ] Restart server

### "GEMINI_API_KEY is not defined"
- [ ] Add `GEMINI_API_KEY=...` to `.env`
- [ ] Verify API key format starts with `AIzaSy`
- [ ] Restart server

### "invalid connection string"
- [ ] Check DATABASE_URL includes `postgresql://`
- [ ] Verify username and password are correct
- [ ] Check host is accessible
- [ ] Include `?sslmode=require` for NeonDB

### "Port already in use"
- [ ] Change `PORT` in .env to different number
- [ ] Or kill process using port:
  ```bash
  # macOS/Linux
  lsof -i :5000 | grep LISTEN | awk '{print $2}' | xargs kill -9
  
  # Windows
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  ```

---

## Security Best Practices

1. ✅ Never commit `.env` file
2. ✅ Use `.env.example` as template
3. ✅ Rotate JWT_SECRET regularly
4. ✅ Use strong, unique credentials
5. ✅ Keep API keys secret
6. ✅ Use different keys for dev/prod
7. ✅ Enable database SSL (required by Neon)
8. ✅ Use HTTPS in production
9. ✅ Implement env validation
10. ✅ Monitor API usage

---

## Verification Checklist

- [ ] `.env` file created
- [ ] All required variables set
- [ ] No syntax errors in `.env`
- [ ] Database connection works
- [ ] API key is valid
- [ ] JWT_SECRET is 32+ chars
- [ ] No spaces around `=` in .env
- [ ] File is not committed to git
- [ ] Permissions allow reading .env
- [ ] Environment variables load correctly

---

For more details, see [README.md](README.md)
