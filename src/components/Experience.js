import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

let userId;
userId = localStorage.getItem("userId");
const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [newExperience, setNewExperience] = useState({
    userId: localStorage.getItem("userId"),
    description: "",
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (event) => {
    setNewExperience({
      ...newExperience,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://meg-backend.herokuapp.com/api/experience",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newExperience),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setExperiences([...experiences, data]);
        setNewExperience({
          userId: localStorage.getItem("userId"),
          description: "",
        });
        setShowModal(false); // Close the modal after submitting
      } else {
        console.error("Error creating experience:", response.status);
      }
    } catch (error) {
      console.error("Error creating experience:", error);
    }
    window.location.reload();
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await fetch(
          "https://meg-backend.herokuapp.com/api/experience/get",
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
    <div className="d-flex flex-column align-items-center justify-content-center my-5">
      <h2>Experiences</h2>
      <button className="btn btn-primary" onClick={handleOpenModal}>
        Add Experience
      </button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Experience</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-warning">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formDescription">
              <Form.Label>Description:</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={newExperience.description}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button className="mt-2" variant="primary" type="submit">
              Save Experience
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Experience;
