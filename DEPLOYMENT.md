# Deployment Guide

## Pre-Deployment Checklist

### Backend
- [ ] Update NODE_ENV to production
- [ ] Set secure JWT_SECRET
- [ ] Use strong database credentials
- [ ] Enable database backups
- [ ] Set up monitoring
- [ ] Configure logging
- [ ] Enable HTTPS
- [ ] Set up error tracking
- [ ] Configure rate limiting
- [ ] Set CORS properly

### Frontend
- [ ] Build optimized version
- [ ] Update API endpoints
- [ ] Verify environment variables
- [ ] Test all features
- [ ] Optimize images
- [ ] Enable caching
- [ ] Set up CDN
- [ ] Configure domain

---

## Option 1: Heroku (Backend)

### Step 1: Create Heroku Account
1. Go to https://www.heroku.com
2. Sign up (free tier available)

### Step 2: Create App
```bash
npm install -g heroku
heroku login
cd server
heroku create your-app-name
```

### Step 3: Set Environment Variables
```bash
heroku config:set DATABASE_URL=your_neon_url
heroku config:set GEMINI_API_KEY=your_api_key
heroku config:set JWT_SECRET=your_secret
heroku config:set NODE_ENV=production
```

### Step 4: Deploy
```bash
git push heroku main
```

### Step 5: View App
```bash
heroku open
heroku logs --tail
```

---

## Option 2: Vercel (Frontend)

### Step 1: Create Vercel Account
1. Go to https://vercel.com
2. Sign up with GitHub
3. Grant permissions

### Step 2: Connect GitHub Repo
1. Click "New Project"
2. Select your repository
3. Configure build settings

### Step 3: Set Environment Variables
In Vercel dashboard:
```
REACT_APP_API_URL=https://your-heroku-app.herokuapp.com
```

### Step 4: Deploy
- Automatic on git push to main
- Or click "Deploy" button

---

## Option 3: AWS (Full Stack)

### Backend (EC2)

1. **Launch EC2 Instance**
   - Ubuntu 20.04 LTS
   - t2.micro (free tier)
   - Open port 5000

2. **Connect to Instance**
   ```bash
   ssh -i key.pem ubuntu@instance-ip
   ```

3. **Install Dependencies**
   ```bash
   sudo apt update
   sudo apt install nodejs npm
   node --version  # Verify
   ```

4. **Clone Repository**
   ```bash
   git clone your-repo
   cd server
   npm install
   ```

5. **Set Environment Variables**
   ```bash
   nano .env
   # Add all variables
   ```

6. **Start with PM2** (Process Manager)
   ```bash
   npm install -g pm2
   pm2 start index.js --name "chatbot"
   pm2 startup
   pm2 save
   ```

### Frontend (S3 + CloudFront)

1. **Build React App**
   ```bash
   cd client
   npm run build
   ```

2. **Create S3 Bucket**
   - Static website hosting enabled
   - Upload `build/` folder

3. **Set CloudFront Distribution**
   - Point to S3 bucket
   - Configure domain

---

## Option 4: Railway (Simple)

### Step 1: Connect GitHub

1. Go to https://railway.app
2. Sign up
3. Connect GitHub

### Step 2: Deploy Backend

```bash
# In your repo root
cd server
railway up
```

### Step 3: Set Variables

In Railway dashboard:
```
DATABASE_URL=your_neon_url
GEMINI_API_KEY=your_api_key
JWT_SECRET=your_secret
NODE_ENV=production
```

### Step 4: Get URL

- Railway generates URL automatically
- Use for frontend API calls

---

## Option 5: DigitalOcean (Affordable)

### Deploy Both Frontend & Backend

1. **Create Droplet**
   - Ubuntu 20.04
   - Start from ~$5/month

2. **Install Dependencies**
   ```bash
   sudo apt update
   sudo apt install nodejs npm nginx
   ```

3. **Setup Backend**
   ```bash
   git clone repo
   cd server
   npm install
   npm run build
   ```

4. **Setup Frontend**
   ```bash
   cd client
   npm run build
   sudo cp -r build /var/www/html
   ```

5. **Configure Nginx**
   ```bash
   sudo nano /etc/nginx/sites-available/default
   # Configure reverse proxy for backend
   # Configure static files for frontend
   sudo systemctl restart nginx
   ```

---

## Production Environment Variables

### Backend (.env.production)
```
DATABASE_URL=postgresql://prod-user:password@host/db
GEMINI_API_KEY=AIzaSy...production...
JWT_SECRET=very-long-random-string-32-chars-minimum
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://yourdomain.com
LOG_LEVEL=warn
RATE_LIMIT_WINDOW=15m
RATE_LIMIT_MAX_REQUESTS=100
```

### Frontend (.env.production)
```
REACT_APP_API_URL=https://api.yourdomain.com
```

---

## SSL/HTTPS Setup

### Option 1: Let's Encrypt (Free)

```bash
# On your server
sudo apt install certbot python3-certbot-nginx
sudo certbot certonly --nginx -d yourdomain.com
sudo systemctl restart nginx
```

### Option 2: AWS Certificate Manager

- Free SSL certificates
- Auto-renewal
- Works with CloudFront

### Option 3: Cloudflare

- Free SSL
- CDN
- DDoS protection

---

## Database Backups

### NeonDB Automatic Backups
- Automatically backed up
- 7-day retention
- Point-in-time restore

### Manual Backup
```bash
pg_dump your_connection_string > backup.sql
```

### Restore from Backup
```bash
psql your_connection_string < backup.sql
```

---

## Monitoring & Logging

### Backend Logging
```javascript
// Add to index.js
const fs = require('fs');
const logger = fs.createWriteStream('logs.txt', { flags: 'a' });

app.use((req, res, next) => {
  logger.write(`${new Date().toISOString()} ${req.method} ${req.url}\n`);
  next();
});
```

### Error Tracking Services
- **Sentry**: https://sentry.io
- **LogRocket**: https://logrocket.com
- **New Relic**: https://newrelic.com

### Performance Monitoring
- Database query times
- API response times
- Server resource usage

---

## Scaling Considerations

### Database
- Use read replicas
- Implement caching (Redis)
- Connection pooling
- Query optimization

### Backend
- Horizontal scaling (multiple instances)
- Load balancing
- Microservices
- CDN for static assets

### Frontend
- Code splitting
- Lazy loading
- Image optimization
- Browser caching

---

## Post-Deployment

### Step 1: Verify
- [ ] Check if app is running
- [ ] Test all features
- [ ] Check logs for errors
- [ ] Monitor performance

### Step 2: Monitor
- [ ] Set up alerting
- [ ] Monitor database
- [ ] Check API metrics
- [ ] Track user sessions

### Step 3: Backup
- [ ] Enable backups
- [ ] Test restore
- [ ] Document recovery procedure
- [ ] Regular backup checks

---

## Typical Deployment Costs

### Free Tier (No Cost)
- Vercel (frontend)
- Heroku (1 dyno - has sleep)
- Railway (limited)
- DigitalOcean (first month)

### Minimum Cost Setup (~$15-30/month)
- Vercel: Free
- Heroku Dyno: $7/month
- Heroku Postgres: $9/month
- OR Railway: Pay per usage (~$5-10)

### Production Setup (~$50+/month)
- Dedicated backend server
- Managed database
- CDN
- Monitoring
- Backups

---

## Troubleshooting Deployments

### App won't start
```bash
# Check logs
heroku logs --tail  # Heroku
railway logs        # Railway

# Common causes:
# - Missing environment variables
# - Wrong database URL
# - Port conflicts
# - Missing dependencies
```

### Database connection fails
- Verify connection string
- Check firewall rules
- Verify credentials
- Test locally first

### API not responding
- Check server is running
- Verify port is open
- Check CORS settings
- Check backend URL in frontend

---

## Useful Commands

### Heroku
```bash
heroku create app-name
heroku config  # View variables
heroku config:set KEY=value
heroku logs --tail  # Watch logs
heroku open  # Open app
heroku ps:scale web=1  # Scale dynos
```

### Railway
```bash
railway init
railway up
railway logs
railway open
```

### Docker (Optional)
```bash
docker build -t chatbot .
docker run -p 5000:5000 chatbot
```

---

For more help, see [README.md](README.md)
