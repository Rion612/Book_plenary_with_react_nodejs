import axios from "../Helpers/axios";
import { reviewConstant } from "./constants";

export const getAllReviews = () => {
  return async (dispatch) => {
    dispatch({ type: reviewConstant.GET_REVIEWS_REQUEST });

    await axios
      .get("/get/all/reviews")
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: reviewConstant.GET_REVIEWS_SUCCESS,
            payload: {
              reviews: res.data.reviews,
            },
          });
        } else {
          dispatch({
            type: reviewConstant.GET_REVIEWS_FAILURE,
            payload: {
              message: "something wrong!",
            },
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: reviewConstant.GET_REVIEWS_FAILURE,
          payload: {
            message: "something wrong!",
          },
        });
      });
  };
};
