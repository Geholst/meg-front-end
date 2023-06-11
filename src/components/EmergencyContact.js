import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
let userId;
userId = localStorage.getItem("userId");

const EmergencyContact = () => {
  const [showModal, setShowModal] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({
    userId: userId,
    name: "",
    number: "",
    relationship: "",
  });

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleChange = (event) => {
    setNewContact({
      ...newContact,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://meg-backend.herokuapp.com/api/emergency",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newContact),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setContacts([...contacts, data]);
        setNewContact({
          userId: userId,
          name: "",
          number: "",
          relationship: "",
        });
      } else {
        console.error("Error creating emergency contact:", response.status);
      }
    } catch (error) {
      console.error("Error creating emergency contact:", error);
      setNewContact({
        ...newContact,
        [event.target.name]: event.target.value,
      });
    }
    console.log(newContact);
    handleCloseModal();
  };

  return (
    <div>
      <h2>Emergency Contacts</h2>
      <Button variant="primary" onClick={handleShowModal}>
        Add Contact
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newContact.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formNumber">
              <Form.Label>Number:</Form.Label>
              <Form.Control
                type="text"
                name="number"
                value={newContact.number}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formRelationship">
              <Form.Label>Relationship:</Form.Label>
              <Form.Control
                type="text"
                name="relationship"
                value={newContact.relationship}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button
              className="btn btn-primary mt-2"
              variant="primary"
              type="submit">
              Save Contact
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EmergencyContact;
