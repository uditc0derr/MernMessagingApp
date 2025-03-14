import React, { useState } from "react";
import axios from "axios";

const InputBox = ({ socket, user, receiver, setMessages }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    if (!user || !receiver) {
      console.error("User or Receiver is missing!");
      return;
    }

    try {
      const messageData = {
        senderId: user._id,
        receiverId: receiver.userId, 
        senderName: user.username,
        content: message,
      };

      // console.log("Sending message:", messageData); 

      const response = await axios.post("http://localhost:5000/api/messages/send", messageData);

      setMessages((prev) => [...prev, response.data.message]);
      socket.emit("sendMessage", response.data.message);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error.response?.data || error.message);
    }
  };

  
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex items-center p-2 border-t">
      <input
        type="text"
        className="flex-grow p-2 border rounded-lg"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyPress} 
        placeholder="Type a message..."
      />
      <button
        onClick={handleSendMessage}
        className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Send
      </button>
    </div>
  );
};

export default InputBox;
