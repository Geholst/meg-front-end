import React, { useEffect, useState } from "react";
import Journey from "./Journey";
import EmergencyContact from "./EmergencyContact";
import Experience from "./Experience";
import Rating from "./Rating";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const email = localStorage.getItem("email");
    if (!token) {
      // Redirect to /signup if token is not found
      window.location.href = "/signup";
    } else {
      const getProfile = async () => {
        let results = await fetch(`http://127.0.0.1:3001/api/profile`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
          }),
        });
        results = await results.json();
        setUserData(results);
        // alert(`User retrieved: ${JSON.stringify(results)}`);
      };
      getProfile();
    }
  }, []);

  // Destructure the user data
  const { firstName, lastName, email, number, allergies, preferredHospital } =
    userData || {};

  return (
    <div className="container">
      <div className="card mt-4">
        <div className="card-body">
          <h2 className="card-title">
            Welcome to your dashboard, {firstName}!
          </h2>
          <h3 className="card-subtitle mb-3">User Information:</h3>
          <div className="row">
            <div className="col-md-6">
              <p>
                <strong>First Name:</strong> {firstName}
              </p>
              <p>
                <strong>Last Name:</strong> {lastName}
              </p>
              <p>
                <strong>Email:</strong> {email}
              </p>
            </div>
            <div className="col-md-6">
              <p>
                <strong>Phone Number:</strong> {number}
              </p>
              <p>
                <strong>Allergies:</strong> {allergies}
              </p>
              <p>
                <strong>Preferred Hospital:</strong> {preferredHospital}
              </p>
            </div>
          </div>
          <hr />
          <h3 className="card-title mb-3 mt-4 text-center fs-1">
            User Content
          </h3>
          <EmergencyContact />
          <Journey />
          <Experience />
          <Rating />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
