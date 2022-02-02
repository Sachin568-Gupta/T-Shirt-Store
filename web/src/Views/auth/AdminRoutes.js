import React from "react";
import { Route, Navigate } from "react-router-dom";
import { isAutheticated } from "../user/api";

const AdminRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAutheticated() && isAutheticated().user.role === 1 ? (
          <Component {...props} />
        ) : (
          <Navigate to="/signin" replace />
        )
      }
    />
  );
};

export default AdminRoute;
