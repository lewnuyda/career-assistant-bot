import React from "react";
import { Select, Option } from "@material-tailwind/react";

const SelectInput = ({
  label = "Select Option",
  options = [],
  name,
  value,
  onChange = () => {},
  error = false,
  errorMessage = "",
  className = "w-full",
}) => {
  return (
    <div className={className}>
      <Select
        label={label}
        value={value}
        onChange={onChange}
        error={error} // Material Tailwind uses this for red border
      >
        {options.map((item, index) => (
          <Option key={index} value={item.value ?? item}>
            {item.label ?? item}
          </Option>
        ))}
      </Select>
      {error && <p className="mt-1 text-sm text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default SelectInput;
