
import axios from "../Helpers/axios";
import { userConstants } from "./constants";


export const userSignIn = (form) => {
    return async dispatch => {
        dispatch({ type: userConstants.USER_LOGIN_REQUEST });


        await axios.post('/users/login', form)
            .then((res) => {
                if (res.status === 200) {
                    const access_token = res.data.data.token;
                    const user = res.data.data.user;
                    const message = res.data.message;
                    localStorage.setItem('access_token', access_token);
                    localStorage.setItem('user', JSON.stringify(user));

                    dispatch({
                        type: userConstants.USER_LOGIN_SUCCESS,
                        payload: {
                            access_token,
                            user,
                            message
                        }
                    })
                }
                else {
                    dispatch({
                        type: userConstants.USER_LOGIN_FAILURE,
                        payload: {
                            message: res.data.message
                        }
                    })
                }

            })
            .catch((error) => {
                console.log(error.message);
                // dispatch({
                //     type: userConstants.USER_LOGIN_FAILURE,
                //     payload: {
                //         message: "something wrong!"
                //     }
                // })

            });
    }
}


export const userUpdate = (form) => {
    return async dispatch => {
        dispatch({ type: userConstants.PROFILE_UPDATE_REQUEST });


        await axios.post('/user/update/profile', form)
            .then((res) => {
                if (res.status === 200) {
                    const user = res.data.user;
                    localStorage.setItem('user', JSON.stringify(user));

                    dispatch({
                        type: userConstants.PROFILE_UPDATE_SUCCESS,
                        payload: {
                            user
                        }
                    })
                }
                else {
                    dispatch({
                        type: userConstants.PROFILE_UPDATE_FAILURE,
                        payload: {
                            message: "Something happend wrong!"
                        }
                    })
                }

            })
            .catch((error) => {
                dispatch({
                    type: userConstants.PROFILE_UPDATE_FAILURE,
                    payload: {
                        error,
                        message: "Something happend wrong!"
                    }
                })

            });
    }
}

export const isUSerLoggedin = () => {

    return async (dispatch) => {
        const access_token = localStorage.getItem('access_token');
        if (access_token) {
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch({
                type: userConstants.USER_LOGIN_SUCCESS,
                payload: {
                    access_token,
                    user,
                    message:"Success login!"
                }
            })

        } else {
            dispatch({
                type: userConstants.USER_LOGIN_FAILURE,
                payload: {
                    message: "User is not logged in"
                }
            })

        }



    }
}
export const logout = () => {
    return async (dispatch) => {

        dispatch({ type: userConstants.USER_LOGOUT_REQUEST });
        localStorage.removeItem('path')
        window.localStorage.clear();

        dispatch({
            type: userConstants.USER_LOGOUT_SUCCESS,
            payload: {
                message: "Logout successfully"
            }
        });


    }
}
