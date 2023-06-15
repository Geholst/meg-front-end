import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";

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
    <div>
      <h2>Rating List</h2>
      {ratings.length > 0 ? (
        <ListGroup>
          {ratings.map((rating, index) => (
            <ListGroup.Item key={index}>
              <span className="text-primary">
                Rating Title: {rating.ratingTitle}
              </span>
              <br />
              <span className="text-primary">Rating: {rating.rating}</span>
              <br />
              <span className="text-primary">Comments: {rating.comments}</span>
              <br />
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p>No ratings found.</p>
      )}
    </div>
  );
};

export default RatingList;
