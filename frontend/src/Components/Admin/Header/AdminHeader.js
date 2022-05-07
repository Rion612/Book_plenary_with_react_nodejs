import React, { useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { IconContext } from "react-icons";
import "./style.css";
import { sidebarData } from "../Data/sidebarData";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../../Helpers/axios";
import { logout } from "../../../Actions/user.actions";

function AdminHeader() {
  const [sidebar, setsidebar] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const token = localStorage.getItem("access_token");

  const showSideBar = () => setsidebar(!sidebar);

  const logoutHandle = async () => {
    try {
      await axios.post(
        "/users/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((res)=>{
        console.log(res)
        if (res.status === 200) {
          dispatch(logout());
          history.push("/login");
        }
      })
      .catch((error)=>{
        if(error.message.split(' ').pop() == '401'){
          dispatch(logout());
          history.push("/login");
        }
        console.log(error)
      })
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaBars onClick={showSideBar} />
          </Link>
          <div className="adminPannel">
            <div>
              <h3 className="text">Admin Pannel</h3>
            </div>
            <div className="adminPannelContent">
              {user.authenticate ? (
                <>
                  <NavLink to="/admin" className="adminNav">
                    {user?.user?.name}
                  </NavLink>
                  <NavLink
                    to="/login"
                    className="adminNav"
                    style={{ paddingLeft: "30px" }}
                    onClick={logoutHandle}
                  >
                    Logout
                  </NavLink>
                </>
              ) : null}
            </div>
          </div>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSideBar}>
            <li className="navbar-toggle">
              <Link to="#">
                <AiOutlineClose onClick={showSideBar} />
              </Link>
            </li>
            {sidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default AdminHeader;
