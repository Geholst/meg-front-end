import React, { useEffect, useState } from "react";
import Journey from "./Journey";
import EmergencyContact from "./EmergencyContact";
import Experience from "./Experience";
import Rating from "./Rating";
import EmergencyContactsList from "./EmergencyContactList";
import ExperiencesList from "./ExperiencesList";
import JourneysList from "./JourneyList";
import RatingList from "./RatingList";

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
        let results = await fetch(
          `https://meg-backend.herokuapp.com/api/profile`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: userId,
            }),
          }
        );
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
    <div className="container ">
      <div className="card mt-4">
        <div className="card-body">
          <h2 className="card-title">
            Welcome to your dashboard,
            <span className="text-primary fs-1 bold"> {firstName}</span> !
          </h2>
          <h3 className="card-subtitle mb-3">User Information:</h3>
          <div className="row">
            <div className="col-md-6">
              <p>
                <strong className="text-primary">First Name:</strong>{" "}
                {firstName}
              </p>
              <p>
                <strong className="text-primary">Last Name:</strong> {lastName}
              </p>
              <p>
                <strong className="text-primary">Email:</strong> {email}
              </p>
            </div>
            <div className="col-md-6">
              <p>
                <strong className="text-primary">Phone Number:</strong> {number}
              </p>
              <p>
                <strong className="text-primary">Allergies:</strong> {allergies}
              </p>
              <p>
                <strong>
                  <span className="text-primary"> Preferred Hospital:</span>
                  <span className="text-danger"> {preferredHospital}</span>
                </strong>
              </p>
            </div>
          </div>
          <hr />

          <h3 className="card-title mb-3 mt-4 text-center fs-1">
            User Content
          </h3>
          <div className="d-flex justify-content-center m-1 p-2">
            <JourneysList />
          </div>
          <div className="d-flex justify-content-center m-1 p-2">
            <EmergencyContactsList />
          </div>
          <div className="d-flex justify-content-center m-1 p-2">
            <ExperiencesList />
          </div>
          <div className="d-flex justify-content-center m-1 p-2">
            <RatingList />
          </div>
          <div className="d-flex justify-content-center m-1 p-2">
            <button className="d-flex justify-content-center m-1 p-2 bg-warning">
              <Journey />
            </button>
          </div>
          <div className="d-flex justify-content-center m-1 p-2 ">
            <button className="d-flex justify-content-center m-1 p-2 bg-warning">
              <EmergencyContact />
            </button>
          </div>

          <div className="d-flex justify-content-center m-1 p-2">
            <button className="d-flex justify-content-center m-1 p-2 bg-warning">
              <Experience />
            </button>
          </div>
          <div className="d-flex justify-content-center m-1 p-2">
            <button className="d-flex justify-content-center m-1 p-2 bg-warning">
              <Rating />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
