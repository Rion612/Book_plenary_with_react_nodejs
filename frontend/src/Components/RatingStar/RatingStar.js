import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import "./Rating.scss";

const RateStar = (props) => {
  const rating = props.rating;
  const hover = props.hover;

  return (
    <div>
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <label>
            <input
              type="radio"
              value={ratingValue}
              name="rating"
              className="radioButton"
            />
            <FaStar
              size={props.size}
              className="star"
              color={ratingValue <= (hover || rating) ? "orange" : "grey"}
            />
          </label>
        );
      })}
    </div>
  );
};

export default RateStar;
