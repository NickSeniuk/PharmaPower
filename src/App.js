import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Start from "./pages/Start";
import Dashboard from "./pages/user/Dashboard";

import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import PrivateRoute from "./components/Routes/Private";
import Search from "./pages/Search";
import MedicineDetails from "./pages/MedicineDetails";
import Categories from "./pages/Categories";
import CategoryMedicine from "./pages/CategoryMedicine";
import Cart from "./pages/Cart";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:slug" element={<CategoryMedicine />} />
        <Route path="/medicine/:slug" element={<MedicineDetails />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
