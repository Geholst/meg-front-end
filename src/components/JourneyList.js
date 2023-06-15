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
              <span className="text-primary">Type: {journey.type}</span>
              <br />
              <span className="text-primary">Details: {journey.details}</span>
              <br />
              <span className="text-primary">
                Start Time: {journey.startTime}
              </span>
              <br />
              <span className="text-primary">End Time: {journey.endTime}</span>
              <br />
              <span className="text-primary">Route: {journey.route}</span>
              <br />
              <span className="text-primary">Name: {journey.name}</span>
              <br />
              <span className="text-primary">Username: {journey.username}</span>
              <br />
              <span className="text-primary">
                License Plate: {journey.licensePlate}
              </span>
              <br />
              <span className="text-primary">Color: {journey.color}</span>
              <br />
              <span className="text-primary">Year: {journey.year}</span>
              <br />
              <span className="text-primary">Make: {journey.make}</span>
              <br />
              <span className="text-primary">Model: {journey.model}</span>
              <br />
              <span className="text-primary">
                Image Name: {journey.imageName}
              </span>
              <br />
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
