import React, { useState, useEffect } from "react";
import { ListGroup, Dropdown, DropdownButton } from "react-bootstrap";

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
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h2>Journeys List</h2>
      {journeys.length > 0 ? (
        <DropdownButton id="dropdown-basic-button" title="Journeys">
          {journeys.map((journey, index) => (
            <Dropdown.Item key={index}>
              <span className="text-primary">Type: </span>
              <span>{journey.type}</span>
              <br />
              <span className="text-primary">Details: </span>
              <span>{journey.details}</span>
              <br />
              <span className="text-primary">Start Time:</span>
              <span>{journey.startTime}</span>
              <br />
              <span className="text-primary">End Time: </span>
              <span>{journey.endTime}</span>
              <br />
              <span className="text-primary">Route: </span>
              <span>{journey.route}</span>
              <br />
              <span className="text-primary">Name: </span>
              <span>{journey.name}</span>
              <br />
              <span className="text-primary">Username: </span>
              <span>{journey.username}</span>
              <br />
              <span className="text-primary">License Plate:</span>
              <span>{journey.licensePlate}</span>
              <br />
              <span className="text-primary">Color: </span>
              <span>{journey.color}</span>
              <br />
              <span className="text-primary">Year: </span>
              <span>{journey.year}</span>
              <br />
              <span className="text-primary">Make: </span>
              <span>{journey.make}</span>
              <br />
              <span className="text-primary">Model: </span>
              <span>{journey.model}</span>
              <br />
              <span className="text-primary">Image Name:</span>
              <span>{journey.imageName}</span>
              <br />
              {/* Display the image if it exists and is a valid URL */}
              {journey.image && (
                <img src={journey.image} alt={journey.imageName} />
              )}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      ) : (
        <p>No journeys found.</p>
      )}
    </div>
  );
};

export default JourneysList;
