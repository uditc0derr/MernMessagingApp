const express = require("express");
const { getAllUsers, getUserById, getOnlineUsers } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


router.get("/", authMiddleware, getAllUsers);


router.get("/:id", authMiddleware, getUserById);


router.get("/online", authMiddleware, getOnlineUsers);

module.exports = router;
