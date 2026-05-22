# Project Structure & File Organization

```
chatbot/
│
├── 📄 README.md                          # Main documentation
├── 📄 QUICKSTART.md                      # Quick 5-minute setup guide
├── 📄 RUNNING.md                         # Detailed running instructions
├── 📄 SETUP_CHECKLIST.md                 # Step-by-step checklist
├── 📄 API_DOCUMENTATION.md               # Complete API reference
├── 📄 ENV_REFERENCE.md                   # Environment variables guide
├── 📄 FILE_STRUCTURE.md                  # This file
├── 📄 setup.sh                           # Unix setup script
├── 📄 setup.bat                          # Windows setup script
├── 📄 .gitignore                         # Git ignore rules
│
├── 📁 server/                            # Backend Application
│   ├── 📄 index.js                       # Main server entry point
│   ├── 📄 db.js                          # Database configuration
│   ├── 📄 package.json                   # Backend dependencies
│   ├── 📄 .env.example                   # Environment template
│   ├── 📄 .gitignore                     # Backend git ignore
│   │
│   ├── 📁 routes/                        # API Route Handlers
│   │   ├── 📄 auth.js                    # Authentication routes
│   │   ├── 📄 chat.js                    # Chat/AI routes
│   │   └── 📄 conversations.js           # Conversation management
│   │
│   ├── 📁 middleware/                    # Express Middleware
│   │   └── 📄 auth.js                    # JWT authentication
│   │
│   └── 📁 node_modules/                  # Installed dependencies (auto-generated)
│
├── 📁 client/                            # Frontend Application (React)
│   ├── 📄 package.json                   # Frontend dependencies
│   ├── 📄 .gitignore                     # Frontend git ignore
│   │
│   ├── 📁 public/                        # Static Files
│   │   └── 📄 index.html                 # HTML template
│   │
│   ├── 📁 src/                           # React Source Code
│   │   ├── 📄 index.js                   # React entry point
│   │   ├── 📄 App.js                     # Main App component
│   │   ├── 📄 index.css                  # Global styles
│   │   ├── 📄 .gitignore                 # Local git ignore
│   │   │
│   │   ├── 📁 api/                       # API Integration
│   │   │   └── 📄 api.js                 # Axios API client
│   │   │
│   │   ├── 📁 components/                # React Components
│   │   │   ├── 📄 Login.js               # Login page
│   │   │   ├── 📄 Register.js            # Register page
│   │   │   ├── 📄 Chat.js                # Main chat interface
│   │   │   ├── 📄 Auth.css               # Auth styles
│   │   │   └── 📄 Chat.css               # Chat styles
│   │   │
│   │   └── 📁 context/                   # React Context
│   │       └── 📄 AuthContext.js         # Authentication state
│   │
│   └── 📁 node_modules/                  # Dependencies (auto-generated)
│
└── 📁 .git/                              # Git repository (if initialized)
```

---

## File Descriptions

### Root Level Files
| File | Purpose |
|------|---------|
| `README.md` | Complete project documentation |
| `QUICKSTART.md` | Fast setup for impatient developers |
| `RUNNING.md` | Detailed instructions to run the app |
| `SETUP_CHECKLIST.md` | Interactive setup verification |
| `API_DOCUMENTATION.md` | All API endpoints documented |
| `ENV_REFERENCE.md` | Environment variables reference |
| `FILE_STRUCTURE.md` | This file - project organization |
| `setup.sh` | Automated setup for Linux/Mac |
| `setup.bat` | Automated setup for Windows |
| `.gitignore` | Files to ignore in git |

### Backend (server/) - Core Logic
| File | Purpose |
|------|---------|
| `index.js` | Express server initialization |
| `db.js` | PostgreSQL connection & table creation |
| `package.json` | Node dependencies & scripts |
| `.env.example` | Template for environment variables |

#### Routes (server/routes/) - API Endpoints
| File | Purpose | Endpoints |
|------|---------|-----------|
| `auth.js` | User authentication | POST /register, POST /login |
| `chat.js` | AI chat functionality | POST /message |
| `conversations.js` | Chat history | POST /create, GET /, GET /:id, DELETE /:id |

#### Middleware (server/middleware/) - Request Processing
| File | Purpose |
|------|---------|
| `auth.js` | JWT token verification |

### Frontend (client/) - User Interface
| File | Purpose |
|------|---------|
| `package.json` | React dependencies & scripts |
| `.gitignore` | Frontend-specific git ignore |

#### Public (client/public/) - Static Assets
| File | Purpose |
|------|---------|
| `index.html` | HTML template for React |

#### Source (client/src/) - React Code
| File | Purpose |
|------|---------|
| `index.js` | React app entry point |
| `App.js` | Root component with routing |
| `index.css` | Global styles |

##### Components (client/src/components/) - UI Components
| File | Purpose |
|------|---------|
| `Login.js` | Login page component |
| `Register.js` | Registration page component |
| `Chat.js` | Main chat interface component |
| `Auth.css` | Login/Register styles |
| `Chat.css` | Chat interface styles |

##### Context (client/src/context/) - State Management
| File | Purpose |
|------|---------|
| `AuthContext.js` | Global authentication state |

##### API (client/src/api/) - HTTP Client
| File | Purpose |
|------|---------|
| `api.js` | Axios instance & API methods |

---

## How Files Work Together

### User Registration Flow
1. User enters data in `Login.js` (register form)
2. `api.js` sends POST request to `/auth/register`
3. Backend `auth.js` handles registration
4. `db.js` stores user in PostgreSQL
5. Backend returns JWT token
6. `AuthContext.js` stores token
7. User redirected to chat

### Chat Message Flow
1. User types in `Chat.js` component
2. Message sent via `api.js`
3. Backend `chat.js` receives message
4. Gets conversation from `db.js`
5. Sends to Gemini API
6. Response stored in database
7. Response sent back to frontend
8. `Chat.js` displays message

### Data Structure
```
User (in PostgreSQL)
  └── has many Conversations
        └── has many Messages
              └── has role (user/assistant)
              └── has content (text)
```

---

## Development Workflow

### Adding a New Feature

1. **Backend**
   - Add endpoint in appropriate `routes/` file
   - Add middleware if needed in `middleware/`
   - Update database schema in `db.js` if needed
   - Test with curl or Postman

2. **Frontend**
   - Add API method in `api.js`
   - Create component in `components/`
   - Add styles in corresponding `.css`
   - Use `AuthContext.js` for state if needed
   - Test in browser

3. **Testing**
   - Test backend endpoint
   - Test frontend component
   - Test data flow end-to-end

### File Naming Conventions
- Components: PascalCase (e.g., `Login.js`)
- Files: lowercase with .js (e.g., `api.js`)
- CSS files: match component name (e.g., `Login.js` → `Login.css`)
- Routes: descriptive plural (e.g., `conversations.js`)
- Database functions: camelCase

---

## Typical Development Session

```
Start Backend:
  cd server
  npm run dev

Start Frontend (new terminal):
  cd client
  npm start

Open Browser:
  http://localhost:3000

Make Changes:
  1. Edit React component
  2. Browser auto-refreshes
  3. Test feature
  4. If backend changes needed:
     - Edit routes or db.js
     - Server auto-restarts
     - Test with browser/curl

Debug:
  - Browser console (F12)
  - Backend terminal output
  - Network tab in DevTools
  - Database queries if needed
```

---

## Important Notes

- ⚠️ Never commit `.env` file (contains secrets)
- ⚠️ `.gitignore` prevents accidental commits
- ✅ `node_modules/` is auto-generated from `package.json`
- ✅ Don't edit auto-generated files in `build/` or `dist/`
- ✅ Keep styles modular (one component = one CSS file)
- ✅ Use meaningful file and function names

---

## Size Overview (Approximate)

```
Source Code:          ~500 KB
Dependencies:         ~600 MB (node_modules/)
Built Frontend:       ~200 KB
Database:             Variable (depends on usage)
```

---

For more information on specific files, see [README.md](README.md)
