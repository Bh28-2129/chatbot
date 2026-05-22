const express = require('express');
const axios = require('axios');
const { pool } = require('../db');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();
const OPENAI_BASE_URL = process.env.GROQ_BASE_URL || process.env.OPENAI_BASE_URL || process.env.OLLAMA_BASE_URL || 'https://api.openai.com/v1';
const OPENAI_MODEL = process.env.GROQ_MODEL || process.env.OPENAI_MODEL || process.env.OLLAMA_MODEL || 'gpt-4o-mini';
const OPENAI_API_KEY = process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY || process.env.OLLAMA_API_KEY || process.env.GEMINI_API_KEY;

// Send message and get AI response
router.post('/message', authenticateToken, async (req, res) => {
  try {
    const { conversationId, message } = req.body;
    const userId = req.user.id;

    if (!message || !conversationId) {
      return res.status(400).json({ error: 'Message and conversation ID are required' });
    }

    // Verify conversation belongs to user
    const conversationResult = await pool.query(
      'SELECT * FROM conversations WHERE id = $1 AND user_id = $2',
      [conversationId, userId]
    );

    if (conversationResult.rows.length === 0) {
      return res.status(403).json({ error: 'Conversation not found' });
    }

    // Save user message
    await pool.query(
      'INSERT INTO messages (conversation_id, role, content) VALUES ($1, $2, $3)',
      [conversationId, 'user', message]
    );

    // Get conversation history
    const messagesResult = await pool.query(
      'SELECT role, content FROM messages WHERE conversation_id = $1 ORDER BY created_at ASC LIMIT 20',
      [conversationId]
    );

    // Build context for OpenAI chat completions
    const chatMessages = messagesResult.rows.map((msg) => ({
      role: msg.role === 'assistant' ? 'assistant' : 'user',
      content: msg.content
    }));

    // Use OpenAI chat completions
    const headers = {
      'Content-Type': 'application/json'
    };

    if (OPENAI_API_KEY) {
      headers.Authorization = `Bearer ${OPENAI_API_KEY}`;
    }

    const openAiResponse = await axios.post(
      `${OPENAI_BASE_URL}/chat/completions`,
      {
        model: OPENAI_MODEL,
        messages: chatMessages
      },
      {
        headers
      }
    );

    const aiResponse = openAiResponse.data?.choices?.[0]?.message?.content?.trim() || '';

    // Save AI response
    const savedResponse = await pool.query(
      'INSERT INTO messages (conversation_id, role, content) VALUES ($1, $2, $3) RETURNING *',
      [conversationId, 'assistant', aiResponse]
    );

    // Update conversation updated_at
    await pool.query(
      'UPDATE conversations SET updated_at = CURRENT_TIMESTAMP WHERE id = $1',
      [conversationId]
    );

    res.json({
      userMessage: message,
      aiResponse: aiResponse,
      messageId: savedResponse.rows[0].id
    });
  } catch (error) {
    const status = error?.response?.status;
    const details = error?.response?.data;
    if (details) {
      console.error('Chat error details:', details);
    }
    console.error('Chat error:', error.message || error);
    res.status(500).json({
      error: 'Failed to get response from AI. Check your API key, base URL, and model.',
      status,
      details: details || undefined
    });
  }
});

module.exports = router;
