import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks, getAllCategories } from "../../Actions";
import Card from "../../Components/Card/card";
import Footer from "../../Components/Footer/Footer";
import Layout from "../../Components/Layouts/Layout";
import { imgUrl } from "../../urlConfig";
import { AiOutlineDoubleRight } from "react-icons/ai";
import "./Books.scss";
import axios from "../../Helpers/axios";
import Breadcumb from "../../Components/Breadcumb/Breadcumb";

const BookCat = (props) => {
  const dispatch = useDispatch();
  const [bookList, setBookList] = useState([]);
  const category = useSelector((state) => state.category);
  const book = useSelector((state) => state.book);
  const c = category.categories.find((x) => x.id == props.match.params.id);

  useEffect(async () => {
    try {
      const res = await axios.get(
        `/get/category/${props.match.params.id}/books`
      );
      if (res.status === 200) {
        setBookList(res.data.books);
      }
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);
  useEffect(() => {
    dispatch(getAllBooks());
  }, []);
  return (
    <Layout>
      <div className="bookCatContainer">
        <Breadcumb
          route1="/"
          page1="Home"
          route2="/books"
          page2="Books"
          name={c?.type}
        />
        <h4 className="Booktitle">List of books Per Category</h4>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {bookList.length > 0 ? (
            bookList?.map((item, index) => {
              return (
                <div className="cardRow" key={index}>
                  <Card
                    name={item?.name}
                    author={item?.writer}
                    image={imgUrl + item?.bookImage}
                  />
                </div>
              );
            })
          ) : (
            <div style={{ width: "100%" }}>
              <p className="message">No books found!</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </Layout>
  );
};

export default BookCat;
