import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link, useLocation } from "react-router-dom";
import AdminLayout from "../../../Components/Admin/Layout/AdminLayout";
import axios from "../../../Helpers/axios";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { BsEyeFill } from "react-icons/bs"
import { BiEdit } from "react-icons/bi";
import "./Books.scss";
import { imgUrl } from "../../../urlConfig";
import ReactHtmlParser from 'react-html-parser';
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BooksAdmin = () => {
  const location = useLocation();
  const history = useHistory();
  const [bookList, setBookList] = useState([]);
  const [page, setPage] = useState(1);
  const [size,setSize] = useState(5);
  const [sort,setSort] = useState("latest");
  const user = useSelector((state) => state.user);
  const [render, setRender] = useState(false);
  const token = localStorage.getItem("access_token");

  useEffect(async () => {
    try {
      const res = await axios.get(`/get/all/books?page=${page}&size=${size}&sorting_type=${sort}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        setBookList(res.data.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  }, [render,page,size,sort]);

  const deleteBookHandle = async (item) => {
    const id = item.id;
    try {
      const res = await axios.delete(
        `/delete/book/${id}`,
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
    history.push(`/admin/update/books/${item.slug}`)
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
        <div style={{ display: "flex" }}>
          <p style={{ fontSize: "19px", padding: "2px 5px 0 0", }}>Number of rows:</p>
          <select style={{ padding: "5px", fontSize: "1rem" }} onChange={(e)=>setSize(e.target.value)}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={25}>25</option>
          </select>
          <p style={{ fontSize: "19px", padding: "2px 5px 0 30px", }}>Order:</p>
          <select style={{ padding: "5px", fontSize: "1rem" }} onChange={(e)=>setSort(e.target.value)}>
            <option value={"latest"}>Latest</option>
            <option value={"oldest"}>Oldest</option>
            <option value={"a_to_z"}>A_to_Z</option>
            <option value={"z_to_a"}>Z_to_A</option>
          </select>
        </div>
        <table style={{ marginTop: "30px" }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Book name</th>
              <th>Author name</th>
              <th>Categories</th>
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
                  <td>

                    <div className="book_tag">
                      {
                        item?.categories.map((element) => {
                          return (
                            <div>{element?.type}</div>
                          )
                        })
                      }
                    </div>
                  </td>
                  <td style={{ fontSize: "30px" }}>
                    <RiDeleteBin5Fill
                      style={{ cursor: "pointer", margin: '10px' }}
                      onClick={() => deleteBookHandle(item)}
                    />
                    <BiEdit
                      style={{ cursor: "pointer", margin: '10px' }}
                      onClick={() => editBookHandle(item)}
                    />
                    <BsEyeFill style={{ cursor: "pointer", margin: '10px' }} />
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
