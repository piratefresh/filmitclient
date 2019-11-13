import React from "react";
import PropTypes from "prop-types";

const UsersIcon = ({ fill, stroke, strokeWidth, className, ...props }) => (
  <svg
    width={24}
    height={24}
    fill={fill}
    stroke={stroke}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
    <circle cx={9} cy={7} r={4} />
    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
  </svg>
);

UsersIcon.propTypes = {
  fill: PropTypes.string,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.string,
  className: PropTypes.string
};

UsersIcon.defaultProps = {
  fill: "none",
  stroke: "#f6f9fc",
  strokeWidth: "2",
  className: "nav-icon"
};

export default UsersIcon;
