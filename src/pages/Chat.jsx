
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./Chat.css";

//RELATING SOCKET&SERVER
const socket = io("http://localhost:4000");

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isEmojiPickerVisible, setEmojiPickerVisible] = useState(false);
  //USERNAME
  const [userName, setUserName] = useState("User");

  
  useEffect(() => {
    socket.on("receive_message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
//CLEAN THE EVENT WHEN UNMOUNT COMPONENT
    return () => socket.off("receive_message");
  }, []);

  //FUNCTION FOR MESSAGE SENDING
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = { user: userName, content: newMessage, timestamp: new Date() };
      //SEND THE MESSAGE TO THE SERVER
      socket.emit("send_message", message);
      //ADD TO THE CHAT LOCALY
      setMessages((prevMessages) => [...prevMessages, message]);
      //CLEAN THE INPUT
      setNewMessage(""); 
    }
  };

  //FUNCTION EMOJI PICKER==NOT WORKING BEACUSE OF THE PROBLEMS WITH VERSIONS
  const handleEmojiSelect = (emoji) => {
    setNewMessage(newMessage + emoji.native);
    setEmojiPickerVisible(false);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Welcome to the Chat</h2>
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
          😀
        </button>

        {isEmojiPickerVisible && (
          <div className="emoji-picker">
            <EmojiPicker onSelect={handleEmojiSelect} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;


