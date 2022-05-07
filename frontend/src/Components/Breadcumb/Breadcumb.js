import React from "react";
import { Link } from "react-router-dom";

import { AiOutlineDoubleRight } from "react-icons/ai";
const Breadcumb = (props) => {
  return (
    <div style={{ fontSize: "16px" }}>
      <Link to={props.route1} style={{ textDecoration: "none" }}>
        {props.page1}
      </Link>
      <AiOutlineDoubleRight style={{ margin: "0 10px" }} />
      <Link to={props.route2} style={{ textDecoration: "none" }}>
        {props.page2}
      </Link>
      <AiOutlineDoubleRight style={{ margin: "0 10px" }} />
      {props.name}
    </div>
  );
};

export default Breadcumb;
