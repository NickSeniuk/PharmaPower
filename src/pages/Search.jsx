import React from "react";
import Layout from "./../components/Layout";
import { useSearch } from "../context/search";
const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <Layout>
      <div className="container">
        <div className="text-center">
          <h1>Search Resuts</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((m) => (
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
                  <button class="btn btn-primary ms-1">More Details</button>
                  <button class="btn btn-secondary ms-1">ADD TO CART</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
