// src/components/UI/TextInput.jsx
import React from "react";
import { Input } from "@material-tailwind/react";

const TextInput = React.forwardRef(
  (
    {
      label,
      type = "text",
      name,
      value,
      onChange,
      placeholder,
      error = false,
      errorMessage = "",
      ...rest
    },
    ref
  ) => {
    return (
      <div className="mb-4">
        <Input
          type={type}
          label={label}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          error={error}
          crossOrigin=""
          inputRef={ref} // important for react-hook-form
          {...rest}
        />
        {error && errorMessage && (
          <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
        )}
      </div>
    );
  }
);

export default TextInput;
