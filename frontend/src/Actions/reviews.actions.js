import axios from "../Helpers/axios";
import { reviewConstant } from "./constants";

export const getAllReviews = (book_id) => {
  return async (dispatch) => {
    dispatch({ type: reviewConstant.GET_REVIEWS_REQUEST });

    await axios
      .get(`/get/reviews/${book_id}`)
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: reviewConstant.GET_REVIEWS_SUCCESS,
            payload: {
              reviews: res.data.result,
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
