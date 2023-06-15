import React, { useState, useEffect } from "react";
import { Card, ListGroup, Dropdown, DropdownButton } from "react-bootstrap";

let userId;
userId = localStorage.getItem("userId");

const EmergencyContactsList = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch(
          "https://meg-backend.herokuapp.com/api/emergency/get",
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
          setContacts(data);
        } else {
          console.error("Error fetching emergency contacts:", response.status);
        }
      } catch (error) {
        console.error("Error fetching emergency contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h2>Emergency Contacts List</h2>
      {contacts.length > 0 ? (
        <DropdownButton id="dropdown-basic-button" title="Emergency Contacts">
          {contacts.map((contact, index) => (
            <Dropdown.Item key={index}>
              <h5>{contact.name}</h5>
              <span className="text-primary">Number: </span>
              <span>{contact.number}</span>
              <br />
              <span className="text-primary">Relationship: </span>
              <span>{contact.relationship}</span>
              <br />
            </Dropdown.Item>
          ))}
        </DropdownButton>
      ) : (
        <p>No emergency contacts found.</p>
      )}
    </div>
  );
};

export default EmergencyContactsList;
