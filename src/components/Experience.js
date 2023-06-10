import React, { useState, useEffect } from "react";

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [newExperience, setNewExperience] = useState({
    userId: localStorage.getItem("userId"),
    description: "",
  });

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
      } else {
        console.error("Error creating experience:", response.status);
      }
    } catch (error) {
      console.error("Error creating experience:", error);
    }
  };

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:3001/api/experience/user/" +
            localStorage.getItem("userId")
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
      <h2>Experiences</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={newExperience.description}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Experience
        </button>
      </form>

      {experiences.length === 0 ? (
        <p>No experiences found.</p>
      ) : (
        <ul className="list-group">
          {experiences.map((experience) => (
            <li key={experience.id} className="list-group-item">
              <p>{experience.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Experience;
