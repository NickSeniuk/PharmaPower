import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { useParams, useNavigate } from "react-router-dom";

const CategoryMedicine = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [medicine, setMedicine] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getMedicineByCategory();
  }, [params?.slug]);
  const getMedicineByCategory = async () => {
    try {
      const { data } = await axios.get(
        `/pharma/medicine/medicine-category/${params.slug}`
      );
      setMedicine(data?.medicine);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="container mt-3">
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">{medicine?.length} result found</h6>
        <div className="row">
          <div className="col-md-9">
            <div className="d-flex flex-wrap">
              {medicine?.map((m) => (
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`/pharma/medicine/medicine-photo/${m._id}`}
                    className="card-img-top"
                    alt={m.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{m.name}</h5>
                    <p className="card-text">
                      {m.description.length > 30
                        ? m.description.substring(0, 30) + "..."
                        : m.description}
                    </p>
                    <p className="card-text"> $ {m.price}</p>
                    <button
                      className="btn btn-primary ms-1"
                      onClick={() => navigate(`/medicine/${m.slug}`)}
                    >
                      More details
                    </button>
                    <button className="btn btn-secondary ms-1">
                      ADD TO CART
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryMedicine;
