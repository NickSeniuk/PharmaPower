import React from "react";
import { Link } from "react-router-dom";
import { BsInstagram, BsFacebook, BsTwitter } from "react-icons/bs";
const Footer = () => {
  return (
    <div className="footer">
      <h1 className="text-center">All Right Reserved &copy; Techinfoyt</h1>
      <p className="text-center mt-3">
        <Link to="/insta">
          <BsInstagram size={30} />
        </Link>
        <Link to="/facebook">
          <BsFacebook size={30} />
        </Link>
        <Link to="/twitter">
          <BsTwitter size={30} />
        </Link>
      </p>
    </div>
  );
};

export default Footer;
