import React from "react";
import moment from "moment"; 

const MessageItem = ({ msg, user }) => {
  const isSender = msg.senderId === user._id;

  return (
    <div className={`flex ${isSender ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`p-3 rounded-lg max-w-xs shadow-md ${
          isSender
            ? "bg-blue-500 text-white"
            : "bg-gray-300 text-gray-900 border border-gray-400"
        }`}
      >
        <p className="text-sm">{msg.content}</p>
        <span className={`text-xs block text-right ${isSender ? "text-gray-200" : "text-gray-600"}`}>
          {moment(msg.createdAt).format("hh:mm A")}
        </span>
      </div>
    </div>
  );
};

export default MessageItem;
