import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import AdminLayout from "../../../Components/Admin/Layout/AdminLayout";
import axios from "../../../Helpers/axios";
import "./adminHome.scss";
const AdminHome = () => {
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const [totalUser, setTotalUser] = useState(0);
  const [totalCategory, setTotalCategory] = useState(0);
  const [totalBook, setTotalBook] = useState(0);


  useEffect(async() => {
    try {
      const res = await axios.get("/get/all/entity/count");
      if (res.status === 200) {
        setTotalBook(res.data.totalBooks);
        setTotalCategory(res.data.totalCategories);
        setTotalUser(res.data.totalUsers);

      }
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  if (!user.authenticate) {
    history.push("/login");
  }
  return (
    <div>
      <AdminLayout>
        <div className="containerAdmin">
          <div className="dashboardContent">
            <div className="contentdiv one">
              <div>
                <h3>Total Books</h3>
                <h1>{totalBook}</h1>
              </div>
            </div>
            <div className="contentdiv two">
              <div>
                <h3>Total Categories</h3>
                <h1>{totalCategory}</h1>
              </div>
            </div>
            <div className="contentdiv three">
              <div>
                <h3>Total Users</h3>
                <h1>{totalUser}</h1>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </div>
  );
};

export default AdminHome;
