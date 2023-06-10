import React from "react";
import { useEffect } from "react";

const Logout = () => {
  const handleLogout = () => {
    // Remove the "email" and "token" items from local storage
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("results");
    // Redirect to the login page
    window.location.href = "/login";
  };

  return (
    <div>
      <h2>Logout</h2>
      {useEffect(() => {
        handleLogout();
      })}
    </div>
  );
};

export default Logout;
