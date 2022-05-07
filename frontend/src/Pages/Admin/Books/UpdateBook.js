import React, { useEffect, useState } from "react";
import { Link,useHistory} from "react-router-dom";
import AdminLayout from "../../../Components/Admin/Layout/AdminLayout";
import Input from "../../../Components/UI/Input";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks, getAllCategories } from "../../../Actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../../../Helpers/axios";
import ReactHtmlParser from 'react-html-parser';
const UpdateBook = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const book = useSelector(state=>state.book);
  const [name, setName] = useState("");
  const [writer, setWriter] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState();
  const [bookImage, setBookImage] = useState("");
  const cate = useSelector((state) => state.category.categories);
  const token = localStorage.getItem("access_token");
  const bookId = props.match.params.id;

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  useEffect(()=>{
      dispatch(getAllBooks())
  },[]);

  useEffect(async () => {
    try {
      const res = await axios.get(`/get/book/${bookId}`);
      if (res.status === 200) {
        setName(res.data.book.name);
        setWriter(res.data.book.writer);
        setDescription(res.data.book.description)
      }
    } catch (error) {
      console.log(error.message);
    }
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
    setCategories(Array.isArray(e) ? e.map((x) => x.value) : []);
  };
  
  const bookFormSubmit = async(event) => {
    event.preventDefault();
    const form = new FormData();
    form.append("name", name);
    form.append("writer", writer);
    form.append("description", description);
    form.append("categories", categories);
    form.append("image", bookImage);

      try {
        const res = await axios.post(
          "/admin/create/books",form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.status === 200) {
          toast.success(res.data.message);
          setBookImage(null);
          setCategories('');
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
          {"/"}Update book
        </div>
        <form className="bookCreateForm" onSubmit={bookFormSubmit}>
          <h2 style={{ textAlign: "center" }}>Update book</h2>
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
            <label>Select category:</label>
            <Select options={makeOption()} isMulti onChange={getSelectValue} />
          </div>

          <button className="submitButton">Update</button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default UpdateBook;
