import { useState, useEffect } from "react";
import Layout from "../components/Layout";

import { Checkbox, Radio } from "antd";

import axios from "axios";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";

import toast from "react-hot-toast";

const Home = () => {
  const [cart, setCart] = useCart();
  const [medicine, setMedicine] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/pharma/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  //get medicine
  const getAllMedicine = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/pharma/medicine/medicine-list/${page}`
      );
      setLoading(false);
      setMedicine(data.medicine);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/pharma/medicine/medicine-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/pharma/medicine/medicine-list/${page}`
      );
      setLoading(false);
      setMedicine([...medicine, ...data?.medicine]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllMedicine();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterMedicine();
  }, [checked, radio]);

  //get filterd product
  const filterMedicine = async () => {
    try {
      const { data } = await axios.post("/pharma/medicine/medicine-filters", {
        checked,
        radio,
      });
      setMedicine(data?.medicine);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="row mt-3 justify-content-center">
        <div className="col-md-2">
          <h4 className="text-center">Filter by Category</h4>
          <div className="d-flex flex-column p-3">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>

          <h4 className="text-center">Filter by Price</h4>
          <div className="d-flex flex-column p-3">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((m) => (
                <div key={m._id}>
                  <Radio value={m.array}>{m.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>

          <div className="d-flex flex-column p-3">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className="col-md-9 ml-2">
          <h1 className="text-center">All Medicine</h1>
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
                  <button
                    className="btn btn-secondary ms-1"
                    onClick={() => {
                      setCart([...cart, m]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, m])
                      );
                      toast.success("Item added to cart!");
                    }}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {medicine && medicine.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "loading ..." : "loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
