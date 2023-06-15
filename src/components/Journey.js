import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
let userId;
userId = localStorage.getItem("userId");
const Journey = () => {
  const [showModal, setShowModal] = useState(false);
  const [journeys, setJourneys] = useState([]);
  const [newJourney, setNewJourney] = useState({
    userId: userId,
    type: "",
    details: "",
    startTime: "",
    endTime: "",
    route: "",
    name: "",
    username: "",
    licensePlate: "",
    color: "",
    year: "",
    make: "",
    model: "",
    imageName: "",
    image: null,
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      return;
      // localStorage.setItem(journeys.imageName, reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (event) => {
    if (event.target.name === "image") {
      setNewJourney({
        ...newJourney,
        image: event.target.files[0],
      });
    } else {
      setNewJourney({
        ...newJourney,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("type", newJourney.type);
      formData.append("details", newJourney.details);
      formData.append("startTime", newJourney.startTime);
      formData.append("endTime", newJourney.endTime);
      formData.append("route", newJourney.route);
      formData.append("name", newJourney.name);
      formData.append("username", newJourney.username);
      formData.append("licensePlate", newJourney.licensePlate);
      formData.append("color", newJourney.color);
      formData.append("year", newJourney.year);
      formData.append("make", newJourney.make);
      formData.append("model", newJourney.model);
      formData.append("imageName", newJourney.imageName);
      formData.append("image", "journeyImage");
      // Get the image name from localStorage
      // const imageName = localStorage.getItem("journeyImage");

      const response = await fetch(
        "https://meg-backend.herokuapp.com/api/journey",
        {
          method: "POST",
          headers: {
            "content-type": "Application/json",
          },
          body: JSON.stringify({
            userId: userId,
            type: formData.get("type"),
            details: formData.get("details"),
            startTime: formData.get("startTime"),
            endTime: formData.get("endTime"),
            route: formData.get("route"),
            name: formData.get("name"),
            username: formData.get("username"),
            licensePlate: formData.get("licensePlate"),
            color: formData.get("color"),
            year: formData.get("year"),
            make: formData.get("make"),
            model: formData.get("model"),
            image: formData.get("imageName"),
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();

        setJourneys([...journeys, data]);
        setNewJourney({
          userId: userId,
          type: "",
          details: "",
          startTime: "",
          endTime: "",
          route: "",
          name: "",
          username: "",
          licensePlate: "",
          color: "",
          year: "",
          make: "",
          model: "",
          image: null,
        });
      } else {
        console.error("Error creating journey:", response.status);
      }
    } catch (error) {
      console.error("Error creating journey:", error);
    }
  };

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div className="journey ">
      <h2>Uber | Lyft | Taxi | Other</h2>
      <button className="btn btn-primary" onClick={handleModalOpen}>
        Add Journey
      </button>

      <Modal className="bg-dark" show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Journey (Info)</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-warning">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="type">Type:</label>
              <select
                className="form-control"
                id="type"
                name="type"
                value={newJourney.type}
                onChange={handleChange}>
                <option value="">Select Type</option>
                <option value="uber">Uber</option>
                <option value="lyft">Lyft</option>
                <option value="taxi">Taxi</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="details">Details:</label>
              <input
                type="text"
                className="form-control"
                id="details"
                name="details"
                value={newJourney.details}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="startTime">Start Time:</label>
              <input
                type="datetime-local"
                className="form-control"
                id="startTime"
                name="startTime"
                value={newJourney.startTime}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="endTime">End Time:</label>
              <input
                type="datetime-local"
                className="form-control"
                id="endTime"
                name="endTime"
                value={newJourney.endTime}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="route">Route:</label>
              <input
                type="text"
                className="form-control"
                id="route"
                name="route"
                value={newJourney.route}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={newJourney.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={newJourney.username}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="licensePlate">License Plate #:</label>
              <input
                type="text"
                className="form-control"
                id="licensePlate"
                name="licensePlate"
                value={newJourney.licensePlate}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="color">Color:</label>
              <input
                type="text"
                className="form-control"
                id="color"
                name="color"
                value={newJourney.color}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="year">Year:</label>
              <input
                type="text"
                className="form-control"
                id="year"
                name="year"
                value={newJourney.year}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="make">Make:</label>
              <input
                type="text"
                className="form-control"
                id="make"
                name="make"
                value={newJourney.make}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="model">Model:</label>
              <input
                type="text"
                className="form-control"
                id="model"
                name="model"
                value={newJourney.model}
                onChange={handleChange}
              />
            </div>
            <hr></hr>
            <div className="form-group">
              <label htmlFor="imageName">Image Name:</label>
              <input
                type="text"
                className="form-control"
                id="imageName"
                name="imageName"
                value={newJourney.imageName}
                onChange={handleChange}
              />
              <label htmlFor="image">Upload Screenshot/Image:</label>
              <input
                type="file"
                className="form-control-file"
                id="image"
                name="image"
                onChange={handleFileChange}
              />
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              Save Journey
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Journey;
