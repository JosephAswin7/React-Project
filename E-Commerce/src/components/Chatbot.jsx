import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';
import { sendMessageToAI } from '../api/OpenRouter';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hello! I’m your shopping assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { from: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    const reply = await sendMessageToAI(input);
    const botMessage = { from: 'bot', text: reply };
    setMessages(prev => [...prev, botMessage]);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={`chatbot-container ${isOpen ? 'open' : 'closed'}`}>
      {!isOpen && (
        <button className="chat-toggle-button" onClick={() => setIsOpen(true)}>
          💬
        </button>
      )}
      {isOpen && (
        <div className="chatbox">
          <div className="chat-header">
            <span>AI Assistant</span>
            <button onClick={() => setIsOpen(false)}>✖</button>
          </div>
          <div className="chat-window">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.from}`}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="chat-input">
            <input
              type="text"
              placeholder="Ask me something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;