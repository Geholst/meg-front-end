import React, { useState, useEffect } from "react";
import { ListGroup, DropdownButton, Dropdown } from "react-bootstrap";

let userId;
userId = localStorage.getItem("userId");

const RatingList = () => {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await fetch(
          "https://meg-backend.herokuapp.com/api/rating/get",
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
          setRatings(data);
        } else {
          console.error("Error fetching ratings:", response.status);
        }
      } catch (error) {
        console.error("Error fetching ratings:", error);
      }
    };
    fetchRatings();
  }, []);

  return (
    <div className="d-flex flex-column align-items-center">
      <h2>Rating List</h2>
      {ratings.length > 0 ? (
        <DropdownButton id="dropdown-basic-button" title="Ratings">
          {ratings.map((rating, index) => (
            <Dropdown.Item key={index}>
              <span className="text-primary">Rating Title:</span>
              <span> {rating.ratingTitle}</span>
              <br />
              <span className="text-primary">Rating: </span>
              <span>{rating.rating}</span>
              <br />
              <span className="text-primary">Comments: </span>
              <span>{rating.comments}</span>
              <br />
            </Dropdown.Item>
          ))}
        </DropdownButton>
      ) : (
        <p>No ratings found.</p>
      )}
    </div>
  );
};

export default RatingList;
