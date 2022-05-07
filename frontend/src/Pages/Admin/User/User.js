import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../../../Components/Admin/Layout/AdminLayout";
import { RiDeleteBin5Fill } from "react-icons/ri";
import "./User.scss";
import axios from "../../../Helpers/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router";

const User = () => {
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const [usersList, setUsersList] = useState([]);
  const [render, setRender] = useState(false);
  const token = localStorage.getItem("access_token");

  useEffect(async () => {
    try {
      const res = await axios.get("/get/all/users");
      if (res.status === 200) {
        setUsersList(res.data.users);
      }
    } catch (error) {
      console.log(error.message);
    }
  }, [render]);

  const deleteUser = async (item) => {
    const id = item.id;
    try {
      const res = await axios.post(
        `/admin/delete/user/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        setRender(!render);
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  if (!user.authenticate) {
    history.push("/login");
  }

  return (
    <AdminLayout>
      <div className="containerAdmin">
        <div>
          <ToastContainer />
          <h3 style={{ marginBottom: "10px" }}>All user list:</h3>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>User name</th>
                <th>User email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {usersList?.map((item, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item?.name}</td>
                    <td>{item?.email}</td>
                    <td style={{ fontSize: "30px" }}>
                      <RiDeleteBin5Fill onClick={() => deleteUser(item)} style={{cursor:'pointer'}} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default User;
