const User = require("../models/User");


const getAllUsers = async (req, res) => {
  try {
    const loggedInUserId = req.user.id; 
    const users = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};


const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};


const getOnlineUsers = async (req, res) => {
  try {
    const onlineUsers = req.onlineUsers || [];
    res.status(200).json(onlineUsers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching online users", error });
  }
};

module.exports = { getAllUsers, getUserById, getOnlineUsers };
