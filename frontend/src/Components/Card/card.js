import React from "react";
import RateStar from "../RatingStar/RatingStar";
import "./card.scss";
const Card = (props) => {
  return (
    <div className="card" onClick={props.onClick}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={process.env.PUBLIC_URL + props.image}
          alt="Avatar"
          style={{
            width: "200px",
            height: "200px",
          }}
        />
      </div>

      <div className="container">
        <h5>
          <b>{props.name}</b>
        </h5>
        <p className="author">By {props.author}</p>
        <p><RateStar rating={5}/></p>
      </div>
    </div>
  );
};

export default Card;
