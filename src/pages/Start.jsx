import React from "react";
import Layout from "../components/Layout";
import "../styles/StartStyles.css";

const Start = () => {
  return (
    <div>
      <Layout>
        <div className="main">
          <div className="container">
            <div className="greet">Welcome</div>
            <div className="title">
              <p>Preserve Your Health: Book Your Medications Now!</p>
            </div>
            <div className="text">
              We're PharmaPower - the online pharmacy that offers booking
              medicine online. We put your health first and we are glad to help
              you everytime!
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Start;
