// src/components/TitleText.jsx
import React from "react";
import { Typography } from "@material-tailwind/react";

const TitleText = ({
  children,
  variant = "small",
  color = "blue-gray",
  className = "",
}) => {
  return (
    <Typography
      variant={variant}
      color={color}
      className={`block font-sans antialiased leading-tight tracking-normal text-blue-gray-900 ${className}`}
    >
      {children}
    </Typography>
  );
};

export default TitleText;
