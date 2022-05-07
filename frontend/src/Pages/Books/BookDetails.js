import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layouts/Layout";
import { FaBook, FaStar, FaWpforms } from "react-icons/fa";
import { GoPerson } from "react-icons/go";
import { MdCategory } from "react-icons/md";
import { CgDetailsMore } from "react-icons/cg";
import "./bookDetails.scss";
import Breadcumb from "../../Components/Breadcumb/Breadcumb";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks, getAllCategories, getAllReviews } from "../../Actions";
import { imgUrl } from "../../urlConfig";
import RateStar from "../../Components/RatingStar/RatingStar";
import axios from "../../Helpers/axios";
import { useHistory } from "react-router";
import Accordion from "../../Components/Accordion/Accordion";
import Footer from "../../Components/Footer/Footer";
import ReactHtmlParser from "react-html-parser";

const BookDetail = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const book = useSelector((state) => state.book);
  const [cateList, setCateList] = useState([]);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [review, setReview] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [ratingValid, setRatingValid] = useState();
  const [reviewValid, setReviewValid] = useState();
  const [failureMessage, setFailureMessage] = useState(false);
  const [sucessMessage, setSuccessMessage] = useState(false);
  const [render,setRender] = useState(false);
  const rv = useSelector((state) => state.review.reviews);
  const book_id = props.match.params.id;
  const user_id = user?.user?.id;
  const b = book.books.find((x) => x.id == props.match.params.id);
  const token = localStorage.getItem("access_token");
  const reviewComments = rv.filter((x) => x.book_id == props.match.params.id);

  useEffect(async () => {
    try {
      const res = await axios.get(
        `/get/book/${props.match.params.id}/categories`
      );
      if (res.status === 200) {
        setCateList(res.data.categories);
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
  useEffect(() => {
    dispatch(getAllReviews());
  }, [render]);
  useEffect(async () => {
    try {
      const res = await axios.get("/get/all/users");
      if (res.status === 200) {
        setUsersList(res.data.users);
      }
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  const categoryHandle = (item) => {
    history.push(`/books/category/${item.id}`);
  };

  const reviewSumitHandle = async () => {
    const obj = {
      book_id,
      rating,
      review,
      user_id,
    };
    if (rating == null) {
      setRatingValid(false);
      setReviewValid(true);
    } else if (review == "") {
      setRatingValid(true);
      setReviewValid(false);
    } else {
      setReviewValid(true);
      setRatingValid(true);
      try {
        const res = await axios.post("/user/submit/review", obj, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 200) {
          setRender(!render);
          setSuccessMessage(true);
        }
      } catch (error) {
        setFailureMessage(true);
      }
      setRating(null);
      setReview("");
    }
  };
  const alerClose = () => {
    setSuccessMessage(false);
    setFailureMessage(false);
  };
  const getRatingValue = () => {
    let r = 0;
    let count = reviewComments.length;
    reviewComments.forEach((item, index) => {
      r = r + item.rating;
    });
    return Math.round(r / count);
  };
  return (
    <Layout>
      <div className="bDetailsContainer">
        <Breadcumb
          route1="/"
          page1="Home"
          route2="/books"
          page2="Books"
          name={b?.name}
        />
        <div className="bdContent">
          <div className="bookImageDiv">
            <img
              src={imgUrl + b?.bookImage}
              alt="Book Image"
              width="250px"
              height="350px"
              style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.5)" }}
            />
          </div>
          <div className="bookInfo">
            <div style={{ display: "flex" }}>
              <FaBook size={30} color={"#19626a"} />
              <p>{b?.name}</p>
              <div style={{ paddingLeft: "20px" }}>
                <RateStar size="30" rating={getRatingValue()} />
              </div>
            </div>
            <div style={{ display: "flex", marginTop: "10px" }}>
              <GoPerson size={25} color={"#19626a"} />
              <p style={{ fontSize: "20px" }}>Author- {b?.writer}</p>
            </div>
            <div style={{ display: "flex", marginTop: "10px" }}>
              <MdCategory size={25} color={"#19626a"} />
              <div>
                <div>
                  <p style={{ fontSize: "20px" }}>Category</p>
                </div>
                <div style={{ display: "flex" }}>
                  {cateList.map((item, index) => {
                    return (
                      <label
                        className="cateName"
                        key={index}
                        onClick={() => categoryHandle(item)}
                      >
                        {item?.type}
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Accordion
            status={true}
            icon={<CgDetailsMore size={20} />}
            headtitle={"Description"}
          >
            {ReactHtmlParser(b?.description)}
          </Accordion>
        </div>
        <div style={{ marginTop: "30px" }}>
          <Accordion
            icon={<FaStar size={20} />}
            headtitle={"All reviews"}
            status={true}
          >
            {reviewComments.length > 0 ? (
              reviewComments.map((item, index) => {
                const u = usersList.find((x) => x.id == item.user_id);
                return (
                  <div style={{ display: "flex" }}>
                    <div>
                      <img
                        src={process.env.PUBLIC_URL + "/avater.png"}
                        alt="Avater"
                        height="50px"
                        width="50px"
                      />
                    </div>
                    <div>
                      <div style={{ display: "flex" }}>
                        <div style={{ padding: "10px" }}>
                          <h5>{u?.name}</h5>
                        </div>
                        <div style={{ padding: "10px" }}>
                          <RateStar rating={item?.rating} />
                        </div>
                      </div>
                      <div style={{ padding: "10px", fontSize: "12px" }}>
                        Date: {(item?.created_at).split(" ")[0]}
                      </div>
                      <div style={{ padding: "10px" }}>{item?.review}</div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>There are no reviews yet.</div>
            )}
          </Accordion>
        </div>
        <div style={{ marginTop: "30px" }}>
          <Accordion
            status={true}
            icon={<FaWpforms size={20} />}
            headtitle={"Submit you review"}
          >
            {sucessMessage ? (
              <div className="alertMessage">
                <span className="closebtn" onClick={alerClose}>
                  &times;
                </span>
                <strong>Review submit success!</strong>
              </div>
            ) : null}
            {failureMessage ? (
              <div className="falertMessage">
                <span className="closebtn" onClick={alerClose}>
                  &times;
                </span>
                <strong>Review submit failed!</strong>
              </div>
            ) : null}
            <div style={{ display: "flex" }}>
              <div>
                <label>Your rating: </label>
              </div>
              <div>
                {[...Array(5)].map((star, index) => {
                  const ratingValue = index + 1;
                  return (
                    <label>
                      <input
                        type="radio"
                        value={ratingValue}
                        name="rating"
                        className="radioButton"
                        onClick={() => setRating(ratingValue)}
                      />
                      <FaStar
                        size={20}
                        className="star"
                        color={
                          ratingValue <= (hover || rating) ? "orange" : "grey"
                        }
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(null)}
                      />
                    </label>
                  );
                })}
              </div>
            </div>
            {ratingValid === false ? (
              <span style={{ color: "red" }}>Rating is required!</span>
            ) : (
              <span></span>
            )}
            <div>
              <label>Your review:</label>
              <br />
              <textarea
                placeholder="Enter your review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
              ></textarea>
              {reviewValid === false ? (
                <span style={{ color: "red" }}>Review is required!</span>
              ) : (
                <span></span>
              )}
            </div>
            <div>
              <button className="rsButton" onClick={reviewSumitHandle}>
                Submit
              </button>
            </div>
          </Accordion>
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default BookDetail;
