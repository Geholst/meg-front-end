import React, { useState, useEffect } from "react";
import { Card, ListGroup } from "react-bootstrap";

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
    <div>
      <h2>Emergency Contacts List</h2>
      {contacts.length > 0 ? (
        <Card style={{ width: "18rem" }}>
          <ListGroup variant="flush">
            {contacts.map((contact, index) => (
              <ListGroup.Item key={index}>
                <h5>{contact.name}</h5>
                <p>Number: {contact.number}</p>
                <p>Relationship: {contact.relationship}</p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      ) : (
        <p>No emergency contacts found.</p>
      )}
    </div>
  );
};

export default EmergencyContactsList;
