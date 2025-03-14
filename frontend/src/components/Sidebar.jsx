import React from "react";

const Sidebar = ({ onlineUsers }) => {
  return (
    <div className="w-1/4 bg-white p-4 shadow-lg rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Online Users</h2>

      <div className="p-2 bg-gray-50 rounded shadow">
        {onlineUsers.length > 0 ? (
          <div className="flex flex-col space-y-1">
            {onlineUsers.map((user, index) => (
              <div key={index} className="text-green-600 font-medium p-1 rounded bg-green-100">
                {user?.username || "Unknown User"} 
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No users online</p> 
        )}
      </div>
    </div>
  );
};

export default Sidebar;
