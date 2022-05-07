import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import { logout } from "../../Actions/user.actions";
import axios from "../../Helpers/axios";
import Dropdown from "../Dropdown/Dropdown";
import "./Header.scss";
const Header = (props) => {
  const [dropdown, setDropdown] = useState(false);
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const token = localStorage.getItem("access_token");
  const dispatch = useDispatch();

  
  return (
    <div>
      <header>
        <div className="appBrand">
          <Link to="/">
            <img
              src={process.env.PUBLIC_URL + "/brand.png"}
              alt="brand"
              height="50px"
              width="300px"
            />
          </Link>
        </div>
        <nav>
          <ul>
            <NavLink
              to="/"
              exact={true}
              activeStyle={{ color: "blue" }}
              className="nav-link"
            >
              <li>Home</li>
            </NavLink>
            <NavLink
              to="/books"
              activeStyle={{ color: "blue" }}
              className="nav-link"
            >
              <li>Books</li>
            </NavLink>
            {user.authenticate ? (
              <>
                <NavLink
                  to="#"
                  activeStyle={{ color: "blue" }}
                  className="nav-link"
                  onMouseEnter={() => setDropdown(true)}
                  onMouseLeave={() => setDropdown(false)}
                >
                  <li>
                    {user?.user?.name}
                    <i className="fa fa-caret-down" style={{paddingLeft:"10px"}}></i>
                    {dropdown && <Dropdown />}
                  </li>
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  activeStyle={{ color: "blue" }}
                  className="nav-link"
                >
                  <li>Login</li>
                </NavLink>
                <NavLink to="/register">
                  <li className="signupLink">Register</li>
                </NavLink>
              </>
            )}
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;
