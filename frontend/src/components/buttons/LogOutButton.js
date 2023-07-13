import React from "react";

const LogoutButton = ({ logout }) => {

  return (
    <button
      className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full px-6 py-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition duration-200 ease-in-out absolute top-4 right-4"
      onClick={logout}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
