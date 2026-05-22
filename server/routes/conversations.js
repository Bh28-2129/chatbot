const express = require('express');
const { pool } = require('../db');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Create new conversation
router.post('/create', authenticateToken, async (req, res) => {
  try {
    const { title } = req.body;
    const userId = req.user.id;

    const result = await pool.query(
      'INSERT INTO conversations (user_id, title) VALUES ($1, $2) RETURNING *',
      [userId, title || 'New Conversation']
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Create conversation error:', error);
    res.status(500).json({ error: 'Failed to create conversation' });
  }
});

// Get all conversations for user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      'SELECT * FROM conversations WHERE user_id = $1 ORDER BY updated_at DESC',
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get conversations error:', error);
    res.status(500).json({ error: 'Failed to fetch conversations' });
  }
});

// Get conversation with messages
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Get conversation
    const conversationResult = await pool.query(
      'SELECT * FROM conversations WHERE id = $1 AND user_id = $2',
      [id, userId]
    );

    if (conversationResult.rows.length === 0) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    // Get messages
    const messagesResult = await pool.query(
      'SELECT * FROM messages WHERE conversation_id = $1 ORDER BY created_at ASC',
      [id]
    );

    res.json({
      conversation: conversationResult.rows[0],
      messages: messagesResult.rows
    });
  } catch (error) {
    console.error('Get conversation error:', error);
    res.status(500).json({ error: 'Failed to fetch conversation' });
  }
});

// Delete conversation
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Verify ownership
    const conversationResult = await pool.query(
      'SELECT * FROM conversations WHERE id = $1 AND user_id = $2',
      [id, userId]
    );

    if (conversationResult.rows.length === 0) {
      return res.status(403).json({ error: 'Conversation not found' });
    }

    await pool.query('DELETE FROM conversations WHERE id = $1', [id]);

    res.json({ message: 'Conversation deleted' });
  } catch (error) {
    console.error('Delete conversation error:', error);
    res.status(500).json({ error: 'Failed to delete conversation' });
  }
});

// Update conversation title
router.patch('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const userId = req.user.id;

    // Verify ownership
    const conversationResult = await pool.query(
      'SELECT * FROM conversations WHERE id = $1 AND user_id = $2',
      [id, userId]
    );

    if (conversationResult.rows.length === 0) {
      return res.status(403).json({ error: 'Conversation not found' });
    }

    const updateResult = await pool.query(
      'UPDATE conversations SET title = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
      [title || conversationResult.rows[0].title, id]
    );

    res.json(updateResult.rows[0]);
  } catch (error) {
    console.error('Update conversation error:', error);
    res.status(500).json({ error: 'Failed to update conversation' });
  }
});

module.exports = router;
