import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ChatBox from "../components/ChatBox";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const Chat = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      console.warn("No valid user data found, redirecting to login...");
      navigate("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      if (!parsedUser || !parsedUser._id) {
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }
      setUser(parsedUser);
      socket.emit("userConnected", parsedUser._id); 
    } catch (error) {
      console.error("Error parsing user data:", error.message);
      localStorage.removeItem("user");
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    socket.on("onlineUsers", (users) => {
      console.log("Updated online users:", users);
      setOnlineUsers(users);
    });

    return () => {
      socket.off("onlineUsers");
    };
  }, []);

  return (
    <div className="h-screen flex bg-gray-100">
      <Sidebar onlineUsers={onlineUsers} /> 
      <div className="flex-grow flex justify-center items-center">
        {user ? <ChatBox user={user} /> : <p>Loading...</p>}
      </div>
    </div>
  );
};

export default Chat;
