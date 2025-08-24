// src/components/AppButton.jsx
import React from "react";
import { Button } from "@material-tailwind/react";

const AppButton = ({
  children,
  type = "button",
  color = "black",
  className = "",
  onClick,
  ...rest
}) => {
  return (
    <Button
      type={type}
      color={color}
      onClick={onClick}
      className={`w-full ${className}`}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default AppButton;
