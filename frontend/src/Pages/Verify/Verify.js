import React, { useEffect, useState } from "react";
import { GiConfirmed } from "react-icons/gi";
import "./Verify.scss";
import { useHistory } from "react-router";
import Layout from "../../Components/Layouts/Layout";
import Footer from "../../Components/Footer/Footer";
import axios from "../../Helpers/axios";

const Verify = (props) => {
  const history = useHistory();
  const [verify, setVerify] = useState(false);
  const token = props.match.params.token;

  useEffect(async () => {
    try {
      const res = await axios.get(`/user/verify/${token}`);
      if (res.status === 200) {
        setVerify(true);
      }
    } catch (error) {
      setVerify(false);
    }
  }, []);
  const clickHandle = () => {
    history.push('/login');
  };
  return (
    <Layout>
      <div className="verifyDiv">
        <div className="verifySuccessContent">
          {verify ? (
            <div>
              <div className="confirmSign">
                <GiConfirmed size={100} color={"green"} />
              </div>
              <div className="confirmText">
                <h1>Your email has been successfully verifed!</h1>
                <h1>Now continue to do login.</h1>
                <button onClick={clickHandle} className="loginButton">
                  Login
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h1 style={{textAlign:"center"}}>Verifying....</h1>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default Verify;
