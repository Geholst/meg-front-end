import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";

let userId;
userId = localStorage.getItem("userId");

const ExperiencesList = () => {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await fetch(
          `https://meg-backend.herokuapp.com/api/experience/get`,
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
          setExperiences(data);
        } else {
          console.error("Error fetching experiences:", response.status);
        }
      } catch (error) {
        console.error("Error fetching experiences:", error);
      }
    };
    fetchExperiences();
  }, []);

  return (
    <div>
      <h2>Experiences List</h2>
      {experiences.length > 0 ? (
        <ListGroup>
          {experiences.map((experience, index) => (
            <ListGroup.Item key={index}>
              <p>{experience.description}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p>No experiences found.</p>
      )}
    </div>
  );
};

export default ExperiencesList;
