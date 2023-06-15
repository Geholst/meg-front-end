import React, { useState, useEffect } from "react";
import { ListGroup, Dropdown, DropdownButton } from "react-bootstrap";

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
    <div className="d-flex flex-column align-items-center ">
      <h2>Experiences List</h2>
      {experiences.length > 0 ? (
        <DropdownButton id="dropdown-basic-button" title="Experiences">
          {experiences.map((experience, index) => (
            <Dropdown.Item key={index}>
              <div className="container border border-primary rounded">
                <span className="text-primary border-bottom border-primary">
                  Experience Description:
                </span>
                <br />
                <span>{experience.description}</span>
                <br />
              </div>
            </Dropdown.Item>
          ))}
        </DropdownButton>
      ) : (
        <p>No experiences found.</p>
      )}
    </div>
  );
};

export default ExperiencesList;
