import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link, useLocation } from "react-router-dom";
import AdminLayout from "../../../Components/Admin/Layout/AdminLayout";
import axios from "../../../Helpers/axios";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import "./Books.scss";
import { imgUrl } from "../../../urlConfig";
import ReactHtmlParser from 'react-html-parser';
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BooksAdmin = () => {
  const location = useLocation();
  console.log(location.pathname);
  localStorage.setItem('path',location.pathname)
  const history = useHistory();
  const [bookList, setBookList] = useState([]);
  const user = useSelector((state) => state.user);
  const [render,setRender] = useState(false);
  const token = localStorage.getItem("access_token");

  useEffect(async () => {
    try {
      const res = await axios.get("/get/all/books");
      if (res.status === 200) {
        setBookList(res.data.books);
      }
    } catch (error) {
      console.log(error.message);
    }
  }, [render]);

  const deleteBookHandle = async(item) => {
    const id = item.id;
    try {
      const res = await axios.post(
        `/admin/delete/book/${id}`,
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
  const editBookHandle = (item) => {
    history.push(`/admin/update/books/${item.id}`)

  }
  if (!user.authenticate) {
    history.push("/login");
  }
  return (
    <AdminLayout>
      <ToastContainer />
      <div className="containerAdmin">
        <div className="contentTitle">
          <h3>List of all books: </h3>
          <Link to={"/admin/create/books"} className="createBookButton">
            Create book
          </Link>
        </div>
        <table style={{ marginTop: "30px" }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Book name</th>
              <th>Author name</th>
              <th>Description</th>
              <th>Book Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookList?.map((item, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item?.name}</td>
                  <td>{item?.writer}</td>
                  <td>{ReactHtmlParser((item?.description).slice(0,((item?.description).length/4)))}{'.........'}</td>
                  <td>
                      <img src={imgUrl+item?.bookImage} alt="Book Image" height="150px" width="150px"/>
                  </td>
                  <td style={{ fontSize: "30px" }}>
                    <RiDeleteBin5Fill
                      style={{ cursor: "pointer",margin:'10px' }}
                      onClick={()=>deleteBookHandle(item)}
                    />
                    <BiEdit
                      style={{ cursor: "pointer",margin:'10px' }}
                      onClick={()=>editBookHandle(item)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default BooksAdmin;
