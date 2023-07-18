import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutInitiate } from "../redux/actions/actions";
import "./css/Header.css";

const Header = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const location = useLocation();

  const { currentUser: user } = useSelector((state) => ({ ...state.user }));
  // console.log("user", user);
  const dispatch = useDispatch();

  const handleAuth = () => {
    dispatch(logoutInitiate());
  };

  useEffect(() => {
    if (location.pathname === "/") {
      setActiveTab("Product");
    } else if (location.pathname === "/addContact") {
      setActiveTab("AddContact");
    } else if (location.pathname === "/home") {
      setActiveTab("Home");
    } else if (location.pathname === "/login") {
      setActiveTab("Signin");
    }
  }, [location]);
  return (
    <div className="header">
      <Link to="/">
        <p className="logo">TuanTinh App</p>
      </Link>
      <div className="header-right">
      <Link to="/home">
          <p
            className={`${activeTab === "Home" ? "active" : ""}`}
            onClick={() => setActiveTab("Home")}
          >
            Home
          </p>
        </Link>
        <Link to="/">
          <p
            className={`${activeTab === "Product" ? "active" : ""}`}
            onClick={() => setActiveTab("Product")}
          >
            Product
          </p>
        </Link>
        <Link to="/addContact">
          <p
            className={`${activeTab === "AddContact" ? "active" : ""}`}
            onClick={() => setActiveTab("AddContact")}
          >
            Add Contact
          </p>
        </Link>
        {user ? (
          <p style={{ cursor: "pointer" }} onClick={handleAuth}>
            Sign Out
          </p>
        ) : (
          <Link to="/login">
            <p
              className={`${activeTab === "Signin" ? "active" : ""}`}
              onClick={() => setActiveTab("Signin")}
            >
              Sign In
            </p>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
