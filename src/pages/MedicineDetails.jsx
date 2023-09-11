import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const MedicineDetails = () => {
  const params = useParams();
  const [medicine, setMedicine] = useState({});
  const [cart, setCart] = useCart();
  //initial details
  useEffect(() => {
    if (params?.slug) getMedicine();
  }, [params?.slug]);
  //get medicine
  const getMedicine = async () => {
    try {
      const { data } = await axios.get(
        `/pharma/medicine/get-medicine/${params.slug}`
      );
      setMedicine(data?.medicine);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="row container">
        <div className="col-md-6">
          <img
            src={`/pharma/medicine/medicine-photo/${medicine._id}`}
            className="card-img-top"
            alt={medicine.name}
            width={"800px"}
            height={"418px"}
          />
        </div>
        <div className="col-md-6">
          <h1>Medicine Details</h1>
          <h6>Description: {medicine.description}</h6>
          <h6>Price: {medicine.price}</h6>
          <h6>Category: {medicine?.category?.name}</h6>
          <button
            className="btn btn-secondary"
            onClick={() => {
              setCart([...cart, medicine]);
              localStorage.setItem("cart", JSON.stringify([...cart, medicine]));
              toast.success("Item added to cart!");
            }}
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default MedicineDetails;
