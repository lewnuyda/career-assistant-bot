import React from "react";
import { Textarea } from "@material-tailwind/react";

const TextArea = React.forwardRef(
  ({ name, label, error, className = "", ...rest }, ref) => {
    return (
      <div className="w-full">
        <Textarea
          label={label}
          name={name}
          ref={ref}
          error={!!error} // For red border
          className={`!min-h-[15rem] ${className}`}
          {...rest}
        />
        {/* Show error message if it exists */}
        {error?.message && (
          <p className="mt-1 text-sm text-red-500">{error.message}</p>
        )}
      </div>
    );
  }
);

export default TextArea;
