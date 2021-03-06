import React from "react";
import PropTypes from "prop-types";

const EstimateIcon = ({ fill, stroke, strokeWidth, className, ...props }) => (
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
    <rect x={4} y={4} width={16} height={16} rx={2} ry={2} />
    <path d="M9 9h6v6H9zM9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
  </svg>
);

EstimateIcon.propTypes = {
  fill: PropTypes.string,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.string,
  className: PropTypes.string
};

EstimateIcon.defaultProps = {
  fill: "none",
  stroke: "#f6f9fc",
  strokeWidth: "2",
  className: "nav-icon"
};

export default EstimateIcon;
