#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚀 Starting AI Chatbot Setup${NC}\n"

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js v14 or higher${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Node.js installed: $(node --version)${NC}"

# Check npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}✓ npm installed: $(npm --version)${NC}\n"

# Setup Backend
echo -e "${YELLOW}📦 Setting up Backend...${NC}"
cd server

if [ ! -f ".env" ]; then
    cp .env.example .env
    echo -e "${GREEN}✓ Created .env file${NC}"
    echo -e "${YELLOW}⚠️  Please edit server/.env and add your credentials:${NC}"
    echo "   - DATABASE_URL (NeonDB connection string)"
    echo "   - GEMINI_API_KEY (Google API key)"
    echo "   - JWT_SECRET (Any random string)"
fi

npm install
echo -e "${GREEN}✓ Backend dependencies installed${NC}\n"

# Setup Frontend
echo -e "${YELLOW}📦 Setting up Frontend...${NC}"
cd ../client
npm install
echo -e "${GREEN}✓ Frontend dependencies installed${NC}\n"

echo -e "${GREEN}✅ Setup Complete!${NC}\n"
echo -e "${YELLOW}Next Steps:${NC}"
echo "1. Edit server/.env with your credentials"
echo "2. Run: npm run dev (from server directory)"
echo "3. Run: npm start (from client directory in new terminal)"
echo "4. Open http://localhost:3000 in your browser"
