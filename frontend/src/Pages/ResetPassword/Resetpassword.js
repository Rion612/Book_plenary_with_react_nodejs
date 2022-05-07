import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  passwordMatch,
  validatePasswordHandler,
} from "../../Commonfiles/functions/commonFunction";
import Layout from "../../Components/Layouts/Layout";
import Input from "../../Components/UI/Input";
import axios from "../../Helpers/axios";
const ResetPassword = (props) => {
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [passwordMatchValid, setPasswordMatchValid] = useState();
  const [sucessMessage, setSuccessMessage] = useState(false);
  const [failureMessage, setFailureMessage] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  const token = props.match.params.token;
  const alerClose = () => {
    setSuccessMessage(false);
    setFailureMessage(false);
  };
  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log(formIsValid);
      setFormIsValid(
        validatePasswordHandler(password) &&
          passwordMatch(password, password_confirmation)
      );
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [password, password_confirmation]);

  const formSubmit = async (event) => {
    event.preventDefault();
    const obj = {
      token,
      password,
      password_confirmation,
    };
    try {
      const res = await axios.post("/user/reset/password", obj);
      if (res.status === 200) {
        setPassword("");
        setPassword_confirmation("");
        setSuccessMessage(true);
      }
    } catch (error) {
      setFailureMessage(false);
    }
  };
  return (
    <Layout>
      <div className="rMainDiv">
        <div className="rFormDiv">
          <form onSubmit={formSubmit}>
            <h1>Reset password</h1>
            <p>
              Please enter your new password below, we are just being extra
              safe.
            </p>
            {sucessMessage ? (
              <div className="alertMessage">
                <span className="closebtn" onClick={alerClose}>
                  &times;
                </span>
                <strong>Password changed successfully!</strong>
                <br/>Do <Link to={'/login'}>login</Link> with new password
              </div>
            ) : null}
            {failureMessage ? (
              <div className="falertMessage">
                <span className="closebtn" onClick={alerClose}>
                  &times;
                </span>
                <strong>Password changed failed!</strong>
              </div>
            ) : null}
            <Input
              type="password"
              placeholder="New password"
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
            <Input
              type="password"
              placeholder="Confirm password"
              value={password_confirmation}
              onChange={(e) => setPassword_confirmation(e.target.value)}
              onBlur={(e) => {
                setPasswordMatchValid(
                  passwordMatch(password, password_confirmation)
                );
              }}
            />
            {passwordMatchValid === false ? (
              <span className="wrongInfo">Password doesn't match</span>
            ) : (
              <span></span>
            )}
            <button type="submit" className="signupbtn" disabled={!formIsValid}>
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ResetPassword;
