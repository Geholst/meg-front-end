import React, { useEffect } from "react";
import Journey from "./Journey";

const Dashboard = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      // Redirect to /signup if token is not found
      window.location.href = "/signup";
    }
  }, []);

  // Get the user's first name from local storage
  const email = localStorage.getItem("email");

  return (
    <div>
      <h2>Welcome to your dashboard, {email}!</h2>
      <Journey />
    </div>
  );
};

export default Dashboard;
