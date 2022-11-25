import React, { useEffect, useState } from "react";
import { Link,useHistory, useLocation} from "react-router-dom";
import AdminLayout from "../../../Components/Admin/Layout/AdminLayout";
import Input from "../../../Components/UI/Input";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../../Actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../../../Helpers/axios";
import { Redirect } from "react-router";
const CreateBook = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  localStorage.setItem('path',location.pathname)
  const user = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [writer, setWriter] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [catForForm, setCatForForm] = useState([]);
  const [bookImage, setBookImage] = useState("");
  const [bookFile, setBookFile] = useState("");
  const cate = useSelector((state) => state.category.categories);
  const token = localStorage.getItem("access_token");
  console.log(user)

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  const makeOption = () => {
    let options = [];
    for (let i = 0; i < cate.length; i++) {
      options.push({
        value: cate[i].id,
        label: cate[i].type,
      });
    }

    return options;
  };

  const getDescriptionData = (e, editor) => {
    const data = editor.getData();
    setDescription(data);
  };
  const getSelectValue = (e) => {
    setCategories(e)
    let cat = [];
    e.map((item)=>{
      cat.push(item.value)
    })
    setCatForForm(cat)
  };
  
  const bookFormSubmit = async(event) => {
    console.log(categories);
    event.preventDefault();
    const form = new FormData();
    form.append("name", name);
    form.append("writer", writer);
    form.append("description", description);
    form.append("categories", JSON.stringify(catForForm));
    form.append("bookImage", bookImage);
    form.append("bookFile", bookFile);

      try {
        const res = await axios.post(
          "/create/book",form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.status === 200) {
          toast.success(res.data.message);
          setBookImage(null);
          setCategories([]);
          setDescription('');
          setName('');
          setWriter('');
          event.target.reset();
        }
      } catch (error) {
        toast.error(error.message);
      }
  };

  return (
    <AdminLayout>
      <div className="containerAdmin">
        <ToastContainer />
        <div style={{ fontSize: "18px" }}>
          <Link to={"/admin/books"}>Books</Link>
          {"/"}Create book
        </div>
        <form className="bookCreateForm" onSubmit={bookFormSubmit} id="create-book-form">
          <h2 style={{ textAlign: "center" }}>Create book</h2>
          <label>Book Name:</label>
          <Input
            type="text"
            placeholder="Enter book name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Author Name:</label>
          <Input
            type="text"
            placeholder="Enter book name"
            value={writer}
            onChange={(e) => setWriter(e.target.value)}
          />

          <label>Description:</label>
          <CKEditor
            editor={ClassicEditor}
            data={description}
            onChange={getDescriptionData}
          />
          <div style={{ marginTop: "10px" }}>
            <label>Select book image: </label>
            <input
              type="file"
              name="bookImage"
              onChange={(e) => setBookImage(e.target.files[0])}
            />
          </div>
          <div style={{ marginTop: "10px" }}>
            <label>Select book's PDF file: </label>
            <input
              type="file"
              name="bookFile"
              onChange={(e) => setBookFile(e.target.files[0])}
            />
          </div>
          <div style={{ marginTop: "10px" }}>
            <label>Select category:</label>
            <Select options={makeOption()} isMulti onChange={getSelectValue} value={categories} />
          </div>
          <button className="submitButton">Submit</button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default CreateBook;
