import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
let userId;
userId = localStorage.getItem("userId");
const Rating = () => {
  const [ratings, setRatings] = useState([]);
  const [newRating, setNewRating] = useState({
    userId: userId,
    journeyId: "",
    rating: "",
    comments: "",
  });

  const handleChange = (event) => {
    setNewRating({
      ...newRating,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("https://meg-backend.herokuapp.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRating),
      });

      if (response.ok) {
        const data = await response.json();
        setRatings([...ratings, data]);
        setNewRating({
          userId: userId,
          journeyId: "",
          rating: "",
          comments: "",
        });
      } else {
        console.error("Error creating rating:", response.status);
      }
    } catch (error) {
      console.error("Error creating rating:", error);
    }
  };

  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <h2>Ratings</h2>
      <Button onClick={handleOpenModal}>Add Rating</Button>

      <Modal show={modalOpen} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Rating</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formRating">
              <Form.Label>Rating:</Form.Label>
              <Form.Control
                type="number"
                name="rating"
                min="1"
                max="5"
                value={newRating.rating}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formComments">
              <Form.Label>Comments:</Form.Label>
              <Form.Control
                type="text"
                name="comments"
                value={newRating.comments}
                onChange={handleChange}
              />
            </Form.Group>
            <Button className="mt-2" variant="primary" type="submit">
              Save Rating
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {ratings.length === 0 ? (
        <p>No ratings found.</p>
      ) : (
        <ul className="list-group">
          {ratings.map((rating) => (
            <li key={rating.id} className="list-group-item">
              <p>Rating: {rating.rating}</p>
              <p>Comments: {rating.comments}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Rating;
