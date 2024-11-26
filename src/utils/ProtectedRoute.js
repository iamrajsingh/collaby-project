import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = (props) => {
  const loginSuccess = localStorage.getItem("loginSuccess");
  let location = useLocation();

  if (!loginSuccess) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return props.children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
