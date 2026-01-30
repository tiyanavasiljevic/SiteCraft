import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./Chat.css";
import { useAuth } from '../context/AuthContext';

// 1. Dinamički URL za Socket i API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

// INICIJALIZACIJA SOCKET-A
const socket = io(API_BASE_URL, {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 20000,
  transports: ['websocket'] //stability on render
});

const Chat = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isEmojiPickerVisible, setEmojiPickerVisible] = useState(false);

  useEffect(() => {
    socket.on("receive_message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    
    return () => socket.off("receive_message");
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        user: user?.username || "User",
        content: newMessage,
        timestamp: new Date()
      };

      socket.emit("send_message", message);
      setNewMessage("");
    }
  };

  const handleEmojiSelect = (emoji) => {
    setNewMessage(newMessage + emoji.native);
    setEmojiPickerVisible(false);
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // 2. KORISTIMO API_BASE_URL umesto localhost-a
        const response = await fetch(`${API_BASE_URL}/api/messages`);
        const data = await response.json();

        const lastTen = data.slice(-10);
        setMessages(lastTen);
      } catch (err) {
        console.error("Greška pri učitavanju poruka:", err);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Welcome to the Chat, {user?.username || "Guest"}</h2>
      </div>

      <div className="chat-window">
        <div className="messages-container">
          {messages.map((message, index) => (
            <div key={index} className="message-bubble">
              <span className="message-user">{message.user}: </span>
              <span className="message-content">{message.content}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="message-input-container">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>

        <button
          className="emoji-button"
          onClick={() => setEmojiPickerVisible(!isEmojiPickerVisible)}
        >
          😊
        </button>
        {isEmojiPickerVisible && (
          <div className="emoji-picker">
            
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;