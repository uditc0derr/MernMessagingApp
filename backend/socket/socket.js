const { Server } = require("socket.io");

const onlineUsers = new Map(); 

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] },
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    
    socket.on("join", ({ userId, username }) => {
      if (userId && username) {
        onlineUsers.set(socket.id, { userId, username });
        console.log(`${username} joined. Online users:`, Array.from(onlineUsers.values()));

       
        io.emit("onlineUsers", Array.from(onlineUsers.values()));
      }
    });

    
    socket.on("sendMessage", (message) => {
      const { receiverId } = message;
      const recipientSocketId = [...onlineUsers.entries()].find(([_, user]) => user.userId === receiverId)?.[0];

      if (recipientSocketId) {
        io.to(recipientSocketId).emit("receiveMessage", message);
        console.log(`Message sent to ${receiverId}:`, message);
      }
    });

   
    socket.on("disconnect", () => {
      const user = onlineUsers.get(socket.id);
      if (user) {
        onlineUsers.delete(socket.id);
        console.log(`User ${user.username} disconnected. Online users:`, Array.from(onlineUsers.values()));

        
        io.emit("onlineUsers", Array.from(onlineUsers.values()));
      }
    });
  });

  return io;
};

module.exports = initializeSocket;
