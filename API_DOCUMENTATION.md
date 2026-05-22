# API Documentation

## Base URL
- **Development**: `http://localhost:5000/api`
- **Production**: `https://your-domain.com/api`

## Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

## Response Format
All responses are JSON. Errors include error message:
```json
{
  "error": "Error message"
}
```

---

## Endpoints

### 1. User Authentication

#### Register
- **Endpoint**: `POST /auth/register`
- **Public**: Yes
- **Body**:
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```
- **Response**:
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

#### Login
- **Endpoint**: `POST /auth/login`
- **Public**: Yes
- **Body**:
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```
- **Response**:
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

---

### 2. Chat

#### Send Message
- **Endpoint**: `POST /chat/message`
- **Protected**: Yes (requires token)
- **Body**:
```json
{
  "conversationId": 1,
  "message": "What is artificial intelligence?"
}
```
- **Response**:
```json
{
  "userMessage": "What is artificial intelligence?",
  "aiResponse": "Artificial Intelligence (AI) is...",
  "messageId": 5
}
```

---

### 3. Conversations

#### Create Conversation
- **Endpoint**: `POST /conversations/create`
- **Protected**: Yes (requires token)
- **Body**:
```json
{
  "title": "My First Chat"
}
```
- **Response**:
```json
{
  "id": 1,
  "user_id": 1,
  "title": "My First Chat",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

#### Get All Conversations
- **Endpoint**: `GET /conversations`
- **Protected**: Yes (requires token)
- **Query Parameters**: None
- **Response**:
```json
[
  {
    "id": 1,
    "user_id": 1,
    "title": "My First Chat",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:35:00Z"
  },
  {
    "id": 2,
    "user_id": 1,
    "title": "Python Questions",
    "created_at": "2024-01-15T11:00:00Z",
    "updated_at": "2024-01-15T11:05:00Z"
  }
]
```

#### Get Conversation with Messages
- **Endpoint**: `GET /conversations/:id`
- **Protected**: Yes (requires token)
- **Parameters**: `id` (conversation ID)
- **Response**:
```json
{
  "conversation": {
    "id": 1,
    "user_id": 1,
    "title": "My First Chat",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:35:00Z"
  },
  "messages": [
    {
      "id": 1,
      "conversation_id": 1,
      "role": "user",
      "content": "Hello, how are you?",
      "created_at": "2024-01-15T10:31:00Z"
    },
    {
      "id": 2,
      "conversation_id": 1,
      "role": "assistant",
      "content": "I'm doing great! How can I help you today?",
      "created_at": "2024-01-15T10:31:30Z"
    }
  ]
}
```

#### Delete Conversation
- **Endpoint**: `DELETE /conversations/:id`
- **Protected**: Yes (requires token)
- **Parameters**: `id` (conversation ID)
- **Response**:
```json
{
  "message": "Conversation deleted"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "All fields are required"
}
```

### 401 Unauthorized
```json
{
  "error": "Access token required"
}
```

### 403 Forbidden
```json
{
  "error": "Invalid or expired token"
}
```

### 404 Not Found
```json
{
  "error": "Conversation not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

---

## Rate Limiting
- Currently: No rate limiting (implement for production)
- Recommended: 100 requests per 15 minutes per user

## Pagination
- Conversations list: Not paginated (implement for production with large datasets)

## Filtering
- Conversations: Sorted by `updated_at` DESC
- Messages: Sorted by `created_at` ASC

---

## Usage Examples

### JavaScript/Fetch

#### Register
```javascript
const response = await fetch('http://localhost:5000/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'john_doe',
    email: 'john@example.com',
    password: 'password123'
  })
});
const data = await response.json();
localStorage.setItem('token', data.token);
```

#### Send Message
```javascript
const response = await fetch('http://localhost:5000/api/chat/message', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    conversationId: 1,
    message: 'Hello AI!'
  })
});
const data = await response.json();
console.log(data.aiResponse);
```

### cURL

#### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### Send Message
```bash
curl -X POST http://localhost:5000/api/chat/message \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "conversationId": 1,
    "message": "What is AI?"
  }'
```

---

## Best Practices

1. **Always store token securely** (localStorage or secure cookie)
2. **Include token in all protected requests**
3. **Handle errors gracefully**
4. **Validate input before sending**
5. **Implement request timeout**
6. **Log all API errors**
7. **Refresh token when expired**
8. **Use HTTPS in production**
9. **Implement rate limiting**
10. **Monitor API performance**

---

## Webhooks (Future)
- Message received webhook
- Conversation updated webhook
- User created webhook

## Versioning
- Current version: v1
- Future: Support multiple API versions

---

For more information, see [README.md](README.md)
