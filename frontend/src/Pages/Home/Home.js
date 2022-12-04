import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getAllBooks, getAllCategories } from "../../Actions";
import Banner from "../../Components/Banner/Banner";
import Card from "../../Components/Card/card";
import Footer from "../../Components/Footer/Footer";
import Layout from "../../Components/Layouts/Layout";
import RateStar from "../../Components/RatingStar/RatingStar";
import axiosInstance from "../../Helpers/axios";
import { imgUrl } from "../../urlConfig";
import "./Home.scss";

const Home = (props) => {
  const book = useSelector((state) => state.book);
  const [totalReviews, setTotalReviews ] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(getAllCategories());
  }, []);
  useEffect(() => {
    dispatch(getAllBooks());
  }, []);

  useEffect(() => {
    getReviews();
  }, []);
  const getReviews = () => {
    axiosInstance.get("/get/all/reviews")
    .then((response)=>{
      setTotalReviews(response.data.result);
    })
    .catch((error)=> {
      console.log(error)
    })
  }

  const getRatingValue = (reviews) => {
    let r = 0;
    let count = reviews.length;
    reviews.forEach((item, index) => {
      r = r + item.rating;
    });
    return Math.round(r / count);
  };

  const bookHandle = (item) => {
    history.push(`/book/details/${item.id}`);
  };
  return (
    <Layout>
      <div className="homeDiv">
        <h4>Top rated books:</h4>
        <br />
        <div className="cardDiv">
          {book.books.slice(book.books.length-4,book.books.length).map((item, index) => {
            const r = totalReviews.filter((x)=> x.book_id == item.id)
            return (
              <div className="cardRow" key={index}>
                <Card
                  name={item?.name}
                  author={item?.writer}
                  image={imgUrl + item?.bookImage}
                  rating={getRatingValue(r)}
                  onClick={() => bookHandle(item)}
                />
              </div>
            );
          })}
        </div>
        <div style={{marginRight: "110px" }}>
          <button onClick={()=>history.push('/books')}>Show more {">>"}</button>
        </div>
        <br />
        <h4>Latest books:</h4>
        <br />
        <div className="cardDiv">
          {book.books.slice(0,4).map((item, index) => {
            const r = totalReviews.filter((x)=> x.book_id == item.id)
            return (
              <div className="cardRow" key={index}>
                <Card
                  name={item?.name}
                  author={item?.writer}
                  image={imgUrl + item?.bookImage}
                  rating={getRatingValue(r)}
                  onClick={() => bookHandle(item)}
                />
              </div>
            );
          })}
        </div>
        <div style={{marginRight: "110px" }}>
          <button onClick={()=>history.push('/books')}>Show more {">>"}</button>
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default Home;
