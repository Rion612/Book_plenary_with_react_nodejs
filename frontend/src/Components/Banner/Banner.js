import React from "react";
import "./Banner.scss";

const Banner = (props) => {
  return (
    <div
      className="hero-image"
      style={{ backgroundImage: "url(/background.jpg)" }}
    >
      <div className="hero-text">
        <h1>Welcome to Book Plenary</h1>
      </div>
    </div>
  );
};

export default Banner;
