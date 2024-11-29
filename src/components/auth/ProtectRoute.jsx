import React from "react";
import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";

const ProtectRoute = ({ children, confirm, redirect = "/login" }) => {
  if (!confirm) return <Navigate to={redirect} />;

  return children ? children : <Outlet />;
};

// ProtectRoute.propTypes = {
//   children: PropTypes.node.isRequired,
//   confirm: PropTypes.bool.isRequired,
//   redirect: PropTypes.string,
// };

// ProtectRoute.defaultProps = {
//   children: <Outlet />,
//   redirect: "/login",
// };

export default ProtectRoute;
