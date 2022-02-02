import React, { Fragment } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { isAutheticated, signout } from "../user/api";

const currentTab = (location, path) => {
  if (location.pathname === path) {
    return { color: "#2ecc72" };
  } else {
    return { color: "#FFFFFF" };
  }
};

const Menu = () => {
  let location = useLocation();
  const navigate = useNavigate();
  return (
    <div>
      <ul className="nav nav-tabs bg-dark">
        <li className="nav-item">
          <Link style={currentTab(location, "/")} className="nav-link" to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            style={currentTab(location, "/cart")}
            className="nav-link"
            to="/cart"
          >
            Cart
          </Link>
        </li>
        {isAutheticated() && isAutheticated().user.role === 0 && (
          <li className="nav-item">
            <Link
              style={currentTab(location, "/user/dashboard")}
              className="nav-link"
              to="/user/dashboard"
            >
              U. Dashboard
            </Link>
          </li>
        )}
        {isAutheticated() && isAutheticated().user.role === 1 && (
          <li className="nav-item">
            <Link
              style={currentTab(location, "/admin/dashboard")}
              className="nav-link"
              to="/admin/dashboard"
            >
              A. Dashboard
            </Link>
          </li>
        )}
        {!isAutheticated() && (
          <Fragment>
            <li className="nav-item">
              <Link
                style={currentTab(location, "/signup")}
                className="nav-link"
                to="/signup"
              >
                Signup
              </Link>
            </li>
            <li className="nav-item">
              <Link
                style={currentTab(location, "/signin")}
                className="nav-link"
                to="/signin"
              >
                Sign In
              </Link>
            </li>
          </Fragment>
        )}
        {isAutheticated() && (
          <li className="nav-item">
            <span
              className="nav-link text-warning"
              onClick={() => {
                signout(() => {
                  navigate("/");
                });
              }}
            >
              Signout
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Menu;
