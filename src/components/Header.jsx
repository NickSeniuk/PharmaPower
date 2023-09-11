import React from "react";
import { NavLink, Link } from "react-router-dom";
import { MdLocalPharmacy } from "react-icons/md";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";
import SearchInput from "./SearchInput";
import useCategory from "../hooks/useCategory";
import { useCart } from "../context/cart";
import { Badge } from "antd";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const categories = useCategory();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link to="/home" className="navbar-brand" href="#">
            <div className="d-flex align-items-center">
              <MdLocalPharmacy /> PHARMAPOWER
            </div>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {!auth?.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/about" className="nav-link">
                      About
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/policy" className="nav-link">
                      Policy
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <SearchInput />
                  <li className="nav-item">
                    <NavLink to="/home" className="nav-link">
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      to={"/categories"}
                      data-bs-toggle="dropdown"
                    >
                      Categories
                    </Link>
                    <ul className="dropdown-menu">
                      <li>
                        <Link className="dropdown-item" to={"/categories"}>
                          All Categories
                        </Link>
                      </li>
                      {categories?.map((c) => (
                        <li>
                          <Link
                            className="dropdown-item"
                            to={`/category/${c.slug}`}
                          >
                            {c.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>

                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      style={{ border: "none" }}
                    >
                      {`${auth?.user?.name} ${auth?.user?.surname}`}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <Badge count={cart?.length} showZero>
                      <NavLink to="/cart" className="nav-link">
                        Cart
                      </NavLink>
                    </Badge>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
