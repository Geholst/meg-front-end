import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";

let userId;
userId = localStorage.getItem("userId");

const JourneysList = () => {
  const [journeys, setJourneys] = useState([]);

  useEffect(() => {
    const fetchJourneys = async () => {
      try {
        const response = await fetch(
          "https://meg-backend.herokuapp.com/api/journey/get",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: userId }),
          }
        );
        if (response.ok) {
          const data = await response.json();
          setJourneys(data);
        } else {
          console.error("Error fetching journeys:", response.status);
        }
      } catch (error) {
        console.error("Error fetching journeys:", error);
      }
    };
    fetchJourneys();
  }, []);

  return (
    <div>
      <h2>Journeys List</h2>
      {journeys.length > 0 ? (
        <ListGroup>
          {journeys.map((journey, index) => (
            <ListGroup.Item key={index}>
              <p>Type: {journey.type}</p>
              <p>Details: {journey.details}</p>
              <p>Start Time: {journey.startTime}</p>
              <p>End Time: {journey.endTime}</p>
              <p>Route: {journey.route}</p>
              <p>Name: {journey.name}</p>
              <p>Username: {journey.username}</p>
              <p>License Plate: {journey.licensePlate}</p>
              <p>Color: {journey.color}</p>
              <p>Year: {journey.year}</p>
              <p>Make: {journey.make}</p>
              <p>Model: {journey.model}</p>
              <p>Image Name: {journey.imageName}</p>
              {/* Display the image if it exists and is a valid URL */}
              {journey.image && (
                <img src={journey.image} alt={journey.imageName} />
              )}
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p>No journeys found.</p>
      )}
    </div>
  );
};

export default JourneysList;
