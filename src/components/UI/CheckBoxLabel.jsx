// src/components/CheckboxLabel.jsx
import React from "react";
import { Checkbox } from "@material-tailwind/react";

const CheckboxLabel = ({ label = "Default Label", ...props }) => {
  return <Checkbox label={label} {...props} />;
};

export default CheckboxLabel;
