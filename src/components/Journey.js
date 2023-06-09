import React, { useEffect, useState } from "react";

const Journey = () => {
  const [journeys, setJourneys] = useState([]);
  const [newJourney, setNewJourney] = useState({
    userId: 1,
    type: "",
    details: "",
    endTime: "",
    route: "",
  });

  useEffect(() => {
    // Fetch journeys from the server
    const fetchJourneys = async () => {
      try {
        const response = await fetch("https://meg-backend.herokuapp.com/api/journey");
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
          userId: 1,
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

  const handleChange = (event) => {
    setNewJourney({
      ...newJourney,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <h2>Journeys</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Type:
          <input
            type="text"
            name="type"
            value={newJourney.type}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Details:
          <input
            type="text"
            name="details"
            value={newJourney.details}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          End Time:
          <input
            type="datetime-local"
            name="endTime"
            value={newJourney.endTime}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Route:
          <input
            type="text"
            name="route"
            value={newJourney.route}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Create Journey</button>
      </form>

      {journeys.length === 0 ? (
        <p>No journeys found.</p>
      ) : (
        <ul>
          {journeys.map((journey) => (
            <li key={journey.id}>
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
