import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import { FiPlus, FiTrash2, FiMenu, FiX } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { conversationAPI, chatAPI } from '../api';
import './Chat.css';

export default function ChatInterface() {
  const { user, logout } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  // Stable selectConversation so fetchConversations can call it safely
  const selectConversation = useCallback(async (conversationId) => {
    try {
      const response = await conversationAPI.getConversation(conversationId);
      setActiveConversation(response.data.conversation);
      setMessages(response.data.messages);
      // persist last opened conversation
      localStorage.setItem('lastConversationId', conversationId);
    } catch (err) {
      setError('Failed to load conversation');
    }
  }, []);

  const fetchConversations = useCallback(async () => {
    try {
      const response = await conversationAPI.getConversations();
      setConversations(response.data);
      // auto-select last conversation if available
      const lastId = localStorage.getItem('lastConversationId');
      if (lastId) {
        const exists = response.data.find(c => String(c.id) === String(lastId));
        if (exists) {
          selectConversation(lastId);
          return;
        }
      }
      if (response.data.length > 0) {
        selectConversation(response.data[0].id);
      }
    } catch (err) {
      console.error('Failed to fetch conversations:', err);
    }
  }, [selectConversation]);

  // Fetch conversations on mount
  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  // Ensure sidebar is visible when switching back to larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      }
    };
    // set initial state based on current width
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll to bottom when new messages arrive by manipulating the scrollTop
  useEffect(() => {
    const el = messagesContainerRef.current;
    if (el) {
      try {
        el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
      } catch (e) {
        el.scrollTop = el.scrollHeight;
      }
    }
  }, [messages]);


  const createNewConversation = async () => {
    try {
      const response = await conversationAPI.createConversation('New Conversation');
      setConversations((prev) => [response.data, ...prev]);
      selectConversation(response.data.id);
    } catch (err) {
      setError('Failed to create conversation');
    }
  };

  

  const deleteConversation = async (conversationId) => {
    try {
      await conversationAPI.deleteConversation(conversationId);
      setConversations(conversations.filter(c => c.id !== conversationId));
      if (activeConversation?.id === conversationId) {
        setActiveConversation(null);
        setMessages([]);
      }
    } catch (err) {
      setError('Failed to delete conversation');
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || !activeConversation || loading) return;

    const userMessage = input;
    setInput('');
    setLoading(true);
    setError('');

    try {
      // Add user message to UI immediately
      setMessages((prev) => [
        ...prev,
        {
          role: 'user',
          content: userMessage,
          created_at: new Date().toISOString()
        }
      ]);

      // Send to API
      const response = await chatAPI.sendMessage(activeConversation.id, userMessage);

      // Add AI response
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: response.data.aiResponse,
          created_at: new Date().toISOString()
        }
      ]);

      // Update conversation title if it's the first message
      if (messages.length === 0 && userMessage.length > 0) {
        const title = userMessage.substring(0, 50);
        // Update the active conversation title on the server
        await conversationAPI.updateConversation(activeConversation.id, title);
        fetchConversations();
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send message');
      // Remove the user message if it failed
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>AI Chatbot</h2>
          <button className="toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        <button className="new-chat-btn" onClick={createNewConversation}>
          <FiPlus /> New Chat
        </button>

        <div className="conversations-list">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className={`conversation-item ${activeConversation?.id === conv.id ? 'active' : ''}`}
              onClick={() => selectConversation(conv.id)}
            >
              <span className="conv-title">{conv.title}</span>
              <button
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteConversation(conv.id);
                }}
              >
                <FiTrash2 />
              </button>
            </div>
          ))}
        </div>

        <div className="sidebar-footer">
          <div className="user-info">
            <p>👤 {user?.username}</p>
          </div>
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="chat-main">
        {!activeConversation ? (
          <div className="empty-state">
            <h2>Welcome to AI Chatbot</h2>
            <p>Start a new conversation to begin chatting with AI</p>
            <button className="btn-primary" onClick={createNewConversation}>
              <FiPlus /> Start New Chat
            </button>
          </div>
        ) : (
          <>
            <div className="messages-container" ref={messagesContainerRef}>
              {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.role}`}>
                  <div className="message-content">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="message assistant">
                  <div className="message-content typing">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="input-area">
              {error && <div className="error-banner">{error}</div>}
              <div className="input-wrapper">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your message... (Shift+Enter for new line)"
                  disabled={loading}
                  rows="3"
                  onFocus={() => {
                    // Ensure messages container stays scrolled when focusing the textarea
                    const el = messagesContainerRef.current;
                    if (el) {
                      setTimeout(() => {
                        try {
                          el.scrollTo({ top: el.scrollHeight, behavior: 'auto' });
                        } catch (e) {
                          el.scrollTop = el.scrollHeight;
                        }
                      }, 100);
                    }
                  }}
                />
                <button
                  className="send-btn"
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                >
                  {loading ? 'Sending...' : 'Send'}
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <button className="mobile-menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
        <FiMenu />
      </button>
    </div>
  );
}
