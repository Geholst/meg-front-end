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
              {/* Add more fields as needed */}
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
