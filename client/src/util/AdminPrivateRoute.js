import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthContext } from "../context/auth";

const AdminPrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        user && user.admin ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default AdminPrivateRoute;
