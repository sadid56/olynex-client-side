/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import "./Sideber.css";

const StyledNavLink = ({ to, children, icon }) => {
  return (
    <NavLink to={to} className="flex items-center gap-2 text-xl hover:bg-gray-600 p-2 rounded-md">
      {icon && <span className="bg-primary p-1 rounded-md text-white">{icon}</span>}
      {children}
    </NavLink>
  );
};

export default StyledNavLink;
