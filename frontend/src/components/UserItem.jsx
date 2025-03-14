import React from "react";

const UserItem = ({ user }) => {
  return (
    <div className="p-2 bg-gray-200 rounded-lg mb-2 text-gray-800">
      {user}
    </div>
  );
};

export default UserItem;
