import React, { useEffect, useState } from "react";
import MessageItem from "./MessageItem";
import InputBox from "./InputBox";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000");

const ChatBox = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  // Connect to socket and listen for online users
  useEffect(() => {
    if (!user) return;

    socket.emit("join", { userId: user._id, username: user.username });

    socket.on("onlineUsers", (users) => {
      setOnlineUsers(users);
    });

    socket.on("receiveMessage", (message) => {
      if (selectedUser && message.senderId === selectedUser.userId) {
        setMessages((prev) => [...prev, message]);
      }
    });

    return () => {
      socket.emit("leave", { userId: user._id });
      socket.off("onlineUsers");
      socket.off("receiveMessage");
    };
  }, [user, selectedUser]);

  // Fetch messages when a user is selected
  useEffect(() => {
    const fetchMessages = async () => {
      if (!user || !selectedUser) return;

      try {
        const response = await axios.get(
          `http://localhost:5000/api/messages/conversation/${user._id}/${selectedUser.userId}`
        );
        setMessages(response.data.messages);
      } catch (error) {
        console.error("Error fetching messages:", error.response?.data || error.message);
      }
    };

    if (selectedUser) fetchMessages();
  }, [user, selectedUser]);

  return (
    <div className="flex h-[80vh] w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
    
      <div className="w-1/3 bg-gray-100 border-r border-gray-300 p-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">Online Users</h3>
        {onlineUsers.length > 0 ? (
          onlineUsers.map((onlineUser) => (
            <button
              key={onlineUser.userId}
              className={`w-full text-left p-3 rounded-lg text-gray-700 flex items-center gap-2 transition-all ${
                selectedUser?.userId === onlineUser.userId ? "bg-blue-500 text-white" : "hover:bg-gray-200"
              }`}
              onClick={() => setSelectedUser(onlineUser)}
            >
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              {onlineUser.username}
            </button>
          ))
        ) : (
          <p className="text-sm text-gray-500">No users online</p>
        )}
      </div>

     
      <div className="flex flex-col w-2/3">
        <div className="bg-blue-500 text-white px-4 py-3 font-semibold flex items-center">
          {selectedUser ? selectedUser.username : "Select a user to chat"}
        </div>

        <div className="flex-grow overflow-y-auto p-4 space-y-2 bg-gray-50">
          {selectedUser ? (
            messages.length > 0 ? (
              messages.map((msg, index) => (
                <MessageItem key={msg._id || index} msg={msg} user={user} />
              ))
            ) : (
              <p className="text-gray-500 text-center">No messages yet</p>
            )
          ) : (
            <p className="text-gray-500 text-center mt-10">Select a user to start chatting</p>
          )}
        </div>

        
        {selectedUser && <InputBox socket={socket} user={user} receiver={selectedUser} setMessages={setMessages} />}
      </div>
    </div>
  );
};

export default ChatBox;
