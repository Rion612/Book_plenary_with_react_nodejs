
import axios from "../Helpers/axios";
import { bookConstants } from "./constants";

export const getAllBooks = () => {
    return async dispatch => {
        dispatch({ type: bookConstants.GET_BOOK_LIST_REQUEST});


        await axios.get('/get/all/books')
            .then((res) => {
                if (res.status === 200) {

                    dispatch({
                        type: bookConstants.GET_BOOK_LIST_SUCCESS,
                        payload: {
                            books : res.data.data
                        }
                    })
                }
                else {
                    dispatch({
                        type: bookConstants.GET_BOOK_LIST_FAILURE,
                        payload: {
                            message: "something wrong!"
                        }
                    })
                }

            })
            .catch((error) => {
                dispatch({
                    type: bookConstants.GET_BOOK_LIST_FAILURE,
                        payload: {
                            message: "something wrong!"
                        }
                })

            });
    }
}