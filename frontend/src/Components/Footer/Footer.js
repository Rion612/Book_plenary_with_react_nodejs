import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";
const Footer = () => {
  return (
    <div className="site-footer">
      <p>
        Copyright &copy; 2021 All Rights Reserved by
        <Link to="/" style={{textDecoration:'none',color:'white'}}> Book Plenary</Link>.
      </p>
    </div>
  );
};

export default Footer;
