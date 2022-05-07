import React from "react";
import './CardSide.scss';

const CardSide = (props) => {
  return (
    <div className="Scard">
      <div className="cardContent1">
        <img src={process.env.PUBLIC_URL+props.image } alt="BookImage"
        height="100%" width="100%"
         />
      </div>
      <div className="cardContent2">
          <h4><b>{props.name}</b></h4>
          <p>{props.author}</p>
      </div>
    </div>
  );
};

export default CardSide;
