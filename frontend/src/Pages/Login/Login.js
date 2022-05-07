import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory,useLocation } from "react-router-dom";
import { userSignIn } from "../../Actions/user.actions";
import {
  validateEmailHandler,
  validatePasswordHandler,
} from "../../Commonfiles/functions/commonFunction";
import Layout from "../../Components/Layouts/Layout";
import Input from "../../Components/UI/Input";
import axios from "../../Helpers/axios";

const Login = () => {
  const history = useHistory();
  localStorage.removeItem('path')
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const [failureMessage, setFailureMessage] = useState(false);
  const [sucessMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log(formIsValid);
      setFormIsValid(
        validateEmailHandler(email) && validatePasswordHandler(password)
      );
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [email, password]);

  const formSubmit = async (event) => {
    event.preventDefault();
    const user = {
      email,
      password,
    };
    try {
      const res = await axios.post("/users/login", user);
      if (res.status == 200 && res.data.status) {
        setSuccessMessage(true);
        dispatch(userSignIn(user));
      }
    } catch (error) {
      setFailureMessage(true);
    }
  };
  const alerClose = () => {
    setSuccessMessage(false);
    setFailureMessage(false);
  };
  if (user.authenticate) {
    if (user.user.is_admin === 1) {
      if(localStorage.getItem('path')) {
        history.push(localStorage.getItem('path'))
      }
      else history.push("/admin");
    } else {
      if(localStorage.getItem('path')) {
        history.push(localStorage.getItem('path'))
      }
      else history.push("/");
    };
  }
  return (
    <Layout>
      <div className="rMainDiv">
        <div className="rFormDiv">
          <form onSubmit={formSubmit}>
            <h1>Login</h1>
            {sucessMessage ? (
              <div className="alertMessage">
                <span className="closebtn" onClick={alerClose}>
                  &times;
                </span>
                <strong>Login success!</strong>
              </div>
            ) : null}
            {failureMessage ? (
              <div className="falertMessage">
                <span className="closebtn" onClick={alerClose}>
                  &times;
                </span>
                <strong>Invalid credentials!</strong>
              </div>
            ) : null}
            <Input
              label="Email:"
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={(e) => {
                setEmailIsValid(validateEmailHandler(email));
              }}
            />
            {emailIsValid === false ? (
              <span className="wrongInfo">Email is invalid</span>
            ) : (
              <span></span>
            )}
            <Input
              label="Password:"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={(e) => {
                setPasswordIsValid(validatePasswordHandler(password));
              }}
            />
            {passwordIsValid === false ? (
              <span className="wrongInfo">
                Password length should be greater than 6 characters
              </span>
            ) : (
              <span></span>
            )}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div></div>
              <div>
                <Link to="/forgot/password">Forgot password?</Link>
              </div>
            </div>
            <button type="submit" className="signupbtn" disabled={!formIsValid}>
              Signin
            </button>
            <p>
              Not registered yet? <Link to="/register">Create an account.</Link>
            </p>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
