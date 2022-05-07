import React, { useState } from "react";
import { Link } from "react-router-dom";
import { validateEmailHandler } from "../../Commonfiles/functions/commonFunction";
import Layout from "../../Components/Layouts/Layout";
import Input from "../../Components/UI/Input";
import axios from "../../Helpers/axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  const [sucessMessage, setSuccessMessage] = useState(false);
  const [failureMessage, setFailureMessage] = useState(false);
  const [message,setMessage] = useState('');

  const alerClose = () => {
    setSuccessMessage(false);
    setFailureMessage(false);
  };

  const formSubmit = async (event) => {
    event.preventDefault();
    if (emailIsValid) {
      try {
        const res = await axios.post("/user/forgot/password", { email });
        if (res.status === 200) {
          setSuccessMessage(true);
        }
      } catch (error) {
        setFailureMessage(true);
      }
    } else {
    }
  };
  return (
    <Layout>
      <div className="rMainDiv">
        <div className="rFormDiv">
          <form onSubmit={formSubmit}>
            <h1>Forgot your password?</h1>
            <p>
              Please enter your email address to receive your password reset
              instructions.
            </p>
            {sucessMessage ? (
              <div className="alertMessage">
                <span className="closebtn" onClick={alerClose}>
                  &times;
                </span>
                <strong>Success!</strong>
                <br />A reset password email was sent to your email.
              </div>
            ) : null}
            {failureMessage ? (
              <div className="falertMessage">
                <span className="closebtn" onClick={alerClose}>
                  &times;
                </span>
                <strong>Email is not registered!</strong>
              </div>
            ) : null}
            <Input
              type="text"
              placeholder="Enter your email here"
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
            <button type="submit" className="signupbtn">
              Send
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
