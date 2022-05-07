import React, { useEffect, useState } from "react";
import AdminLayout from "../../../Components/Admin/Layout/AdminLayout";
import Input from "../../../Components/UI/Input";
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import "./Category.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../../Actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../../../Helpers/axios";
import Modal from "../../../Components/Modal/Modal";
import { useHistory } from "react-router";
import ReactModal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
const Category = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const [error, setError] = useState(false);
  const token = localStorage.getItem("access_token");
  const [type, setType] = useState("");
  const [render, setRender] = useState(false);
  const [categoryDetails, setCategoryDetails] = useState(null);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [render]);

  const category = useSelector((state) => state.category);

  const deleteCategory = async (item) => {
    const id = item.id;
    try {
      const res = await axios.delete(
        `/delete/category/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200 && res.data.status) {
        setRender(!render);
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const categoryFormSubmit = async () => {
    if (type === "") {
      setError(true);
    } else {
      setError(false);
      try {
        const res = await axios.post(
          "/create/category",
          { type },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.status === 200 && res.data.status) {
          setRender(!render);
          toast.success(res.data.message);
          setType("");
        } else {
          setRender(!render);
          toast.error(res.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };
  if (!user.authenticate) {
    history.push("/login");
  }
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [editCategory, setEditCategory] = useState("")
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const editButtonClick= (item) =>{
    setCategoryDetails(item);
    setEditCategory(item?.type);
    setIsOpen(true);
  }
  const updateCategory = async () =>{
    const data = {
      category_id: categoryDetails?.id,
      type: editCategory
    }
    try {
      const res = await axios.put(
        `/edit/category`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200 && res.data.status) {
        setRender(!render);
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    console.log(categoryDetails)
    console.log(editCategory)
    setIsOpen(false)
  }
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  return (
    <AdminLayout>
      <div className="containerAdmin">
        <div className="categoryDiv">
          <Modal />
          <div className="addCategory">
            <ToastContainer position="bottom-right" theme={"colored"} />
            <Input
              label="Create new category of books"
              placeholder="Enter category name"
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
            {error ? (
              <p style={{ color: "red", marginBottom: "10px" }}>
                Category name is required!
              </p>
            ) : null}
            <button className="createCateButton" onClick={categoryFormSubmit}>
              Create
            </button>
          </div>
          <div className="allCategory">
            <h3 style={{ marginBottom: "10px" }}>All categories of books:</h3>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Category Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {category.categories.map((item, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item?.type}</td>
                      <td style={{ fontSize: "20px" }}>
                        <button className="actionButton edit" onClick={()=>editButtonClick(item)}> 
                          <BiEdit />
                          Edit
                        </button>
                        <button
                          className="actionButton delete"
                          onClick={() => deleteCategory(item)}
                        >
                          <MdDeleteOutline />
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <ReactModal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            ariaHideApp={false}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <h2>Edit category</h2>
              </div>
              <div>
                <AiOutlineClose
                  onClick={closeModal}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
            <div style={{width:'400px'}}>
              <input type="text" value={editCategory} onChange={(e)=>setEditCategory(e.target.value)}/>
              <button className="createCateButton" onClick={updateCategory}>Save</button>
            </div>
          </ReactModal>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Category;
