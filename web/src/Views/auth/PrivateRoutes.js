import React from "react";
import { Route, Navigate } from "react-router-dom";
import { isAutheticated } from "../user/api";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAutheticated() ? <Component {...props} /> : <Navigate to="/signin" />
      }
    />
  );
};

export default PrivateRoute;
