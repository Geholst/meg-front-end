import React, { useState, useEffect } from "react";

const Journey = () => {
  const [journeys, setJourneys] = useState([]);
  const [newJourney, setNewJourney] = useState({
    userId: localStorage.getItem("userId"),
    type: "",
    details: "",
    endTime: "",
    route: "",
  });

  const handleChange = (event) => {
    setNewJourney({
      ...newJourney,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("https://meg-backend.herokuapp.com/api/journey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newJourney),
      });

      if (response.ok) {
        const data = await response.json();
        setJourneys([...journeys, data]);
        setNewJourney({
          userId: localStorage.getItem("userId"),
          type: "",
          details: "",
          endTime: "",
          route: "",
        });
      } else {
        console.error("Error creating journey:", response.status);
      }
    } catch (error) {
      console.error("Error creating journey:", error);
    }
  };

  return (
    <div>
      <h2>Journeys</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="type">Type:</label>
          <input
            type="text"
            className="form-control"
            id="type"
            name="type"
            value={newJourney.type}
            onChange={handleChange}
          />
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
        <button type="submit" className="btn btn-primary">
          Create Journey
        </button>
      </form>

      {journeys.length === 0 ? (
        <p>No journeys found.</p>
      ) : (
        <ul className="list-group">
          {journeys.map((journey) => (
            <li key={journey.id} className="list-group-item">
              <h3>{journey.type}</h3>
              <p>{journey.details}</p>
              <p>Start Time: {journey.startTime}</p>
              <p>End Time: {journey.endTime}</p>
              <p>Route: {journey.route}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Journey;
