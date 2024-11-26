import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = (props) => {
  const loggedInUserInfo = localStorage.getItem("frontendUserInfo");
  let location = useLocation();

  if (!loggedInUserInfo) {
    return <Navigate to="/register" state={{ from: location }} replace />;
  }

  return props.children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
