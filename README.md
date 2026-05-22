# AI Chatbot - MERN Stack with Gemini API

A modern, interactive ChatGPT-like chatbot application built with the MERN stack (MongoDB replaced with PostgreSQL/NeonDB) and powered by Google's Gemini API.

## Features

- 🔐 **User Authentication**: Secure registration and login with JWT tokens
- 💬 **Interactive Chat Interface**: Real-time chat interface similar to ChatGPT
- 💾 **Conversation History**: Store and manage multiple conversations
- 🚀 **Gemini AI Integration**: Powered by Google's advanced generative AI
- 📱 **Responsive Design**: Mobile-friendly and responsive UI
- 🗄️ **PostgreSQL Database**: Persistent data storage with NeonDB
- ⚡ **Real-time Updates**: Smooth message streaming and responses
- 🎨 **Modern UI/UX**: Beautiful gradient design with smooth animations

## Tech Stack

### Backend
- **Node.js** & **Express.js**: Server framework
- **PostgreSQL**: Database (via NeonDB)
- **JWT**: Authentication
- **Bcrypt**: Password hashing
- **Google Generative AI**: Gemini API integration

### Frontend
- **React 18**: UI library
- **React Router**: Navigation
- **Axios**: HTTP client
- **React Icons**: Icon library
- **CSS3**: Styling and animations

## Project Structure

```
chatbot/
├── server/
│   ├── routes/
│   │   ├── auth.js          # Authentication endpoints
│   │   ├── chat.js          # Chat endpoints
│   │   └── conversations.js # Conversation management
│   ├── middleware/
│   │   └── auth.js          # JWT middleware
│   ├── db.js                # Database configuration
│   ├── index.js             # Server entry point
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Chat.js      # Main chat component
│   │   │   ├── Chat.css
│   │   │   ├── Login.js     # Login component
│   │   │   ├── Register.js  # Register component
│   │   │   └── Auth.css
│   │   ├── context/
│   │   │   └── AuthContext.js # Auth state management
│   │   ├── api.js           # API client
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   └── .gitignore
├── .gitignore
└── README.md
```

## Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **NeonDB Account** (PostgreSQL database)
- **Google Cloud Account** (for Gemini API)

## Setup Instructions

### 1. Get Your NeonDB Connection String

1. Visit [Neon Console](https://console.neon.tech)
2. Create a new project
3. Copy your connection string (looks like: `postgresql://user:password@host/database`)
4. Keep it safe for later

### 2. Get Your Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com)
2. Click "Get API Key"
3. Create a new API key
4. Copy it safely

### 3. Backend Setup

```bash
cd server

# Copy environment template
cp .env.example .env

# Edit .env with your credentials
# DATABASE_URL=postgresql://...
# GEMINI_API_KEY=...
# JWT_SECRET=your_secret_key_here
# PORT=5000

# Install dependencies
npm install

# Start the server
npm run dev
```

The server will run on `http://localhost:5000`

### 4. Frontend Setup

```bash
cd client

# Install dependencies
npm install

# Start the development server
npm start
```

The frontend will open on `http://localhost:3000`

## Environment Variables

### Backend (.env)

```
# Database Connection
DATABASE_URL=postgresql://user:password@host/database

# Gemini API
GEMINI_API_KEY=your_gemini_api_key

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Secret
JWT_SECRET=your_jwt_secret_key_here
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Chat
- `POST /api/chat/message` - Send message and get AI response

### Conversations
- `POST /api/conversations/create` - Create new conversation
- `GET /api/conversations` - Get all user conversations
- `GET /api/conversations/:id` - Get conversation with messages
- `DELETE /api/conversations/:id` - Delete conversation

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Conversations Table
```sql
CREATE TABLE conversations (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Messages Table
```sql
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  conversation_id INTEGER REFERENCES conversations(id) ON DELETE CASCADE,
  role VARCHAR(50),
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Usage

1. **Register**: Create a new account with email and password
2. **Login**: Sign in with your credentials
3. **Start Chatting**: Click "New Chat" and start typing
4. **Manage Conversations**: View history, delete old chats
5. **Logout**: Sign out from the sidebar

## Features Explained

### Authentication
- Secure JWT-based authentication
- Passwords hashed with bcrypt
- Token stored in browser localStorage

### Chat Interface
- Real-time message display
- Typing indicator while AI responds
- Conversation history management
- Responsive mobile design

### Gemini Integration
- Multi-turn conversations
- Context awareness from conversation history
- Real-time API responses

## Troubleshooting

### Database Connection Error
- Check your DATABASE_URL in .env
- Verify NeonDB credentials
- Ensure SSL connection (already configured)

### Gemini API Error
- Verify your API key is correct
- Check API quota limits
- Ensure API is enabled in Google Cloud Console

### Frontend Can't Connect to Backend
- Ensure backend is running on port 5000
- Check CORS settings in Express
- Verify proxy setting in client/package.json

### Port Already in Use
- Change PORT in .env file
- Or kill process using the port

## Performance Tips

1. Enable database connection pooling (configured by default)
2. Implement caching for frequently asked questions
3. Rate limit API requests to prevent abuse
4. Optimize image and asset loading
5. Use CDN for static files

## Future Enhancements

- [ ] Voice input/output
- [ ] Image upload and analysis
- [ ] Conversation export (PDF, JSON)
- [ ] Dark mode toggle
- [ ] Search conversations
- [ ] User settings and preferences
- [ ] Real-time WebSocket integration
- [ ] Message editing and deletion
- [ ] Conversation sharing
- [ ] Custom AI system prompts

## Security Considerations

1. **JWT Expiration**: Implement token refresh mechanism
2. **Rate Limiting**: Add rate limiting to API endpoints
3. **Input Validation**: Validate all user inputs
4. **HTTPS**: Use HTTPS in production
5. **Environment Variables**: Never commit .env file
6. **CORS**: Configure CORS properly for production

## Deployment

### Heroku (Backend)
1. Add Procfile
2. Set environment variables
3. Deploy with `git push heroku main`

### Vercel (Frontend)
1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically

### AWS/GCP
- Use EC2 for backend
- Use Cloud Run or App Engine
- Use RDS for database

## License

MIT License - feel free to use this project

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review API documentation
3. Check console for error messages
4. Create an issue on GitHub

## Contributing

Pull requests are welcome! Please follow the existing code style and add tests for new features.

---

**Happy Chatting! 🚀**
