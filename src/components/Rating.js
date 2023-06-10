import React, { useState } from "react";

const Rating = () => {
  const [ratings, setRatings] = useState([]);
  const [newRating, setNewRating] = useState({
    userId: localStorage.getItem("userId"),
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
      const response = await fetch(
        "https://meg-backend.herokuapp.com/api/rating",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newRating),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setRatings([...ratings, data]);
        setNewRating({
          userId: localStorage.getItem("userId"),
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

  return (
    <div>
      <h2>Ratings</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="journeyId">Journey ID:</label>
          <input
            type="text"
            className="form-control"
            id="journeyId"
            name="journeyId"
            value={newRating.journeyId}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            className="form-control"
            id="rating"
            name="rating"
            min="1"
            max="5"
            value={newRating.rating}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="comments">Comments:</label>
          <input
            type="text"
            className="form-control"
            id="comments"
            name="comments"
            value={newRating.comments}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Rating
        </button>
      </form>

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
