import React from "react";
import { Link } from "react-router-dom";
import Layout from "./../components/Layout";
import { useAuth } from "../context/auth";

const Pagenotfound = () => {
  const [auth, setAuth] = useAuth();
  return (
    <Layout title={"go back- page not found"}>
      <div className="pnf">
        <h1 className="pnf-title">404</h1>
        <h2 className="pnf-heading">Oops ! Page Not Found</h2>
        {!auth?.user ? (
          <Link to="/" className="pnf-btn">
            Go Back
          </Link>
        ) : (
          <Link to="/home" className="pnf-btn">
            Go Back
          </Link>
        )}
      </div>
    </Layout>
  );
};

export default Pagenotfound;
