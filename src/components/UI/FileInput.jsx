import React from "react";

const FileInput = ({
  label = "Upload File",
  name = "file",
  accept = ".pdf,.doc,.docx",
  required = false,
  multiple = false,
  onChange,
  error,
  register,
}) => {
  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className="block mb-1 text-sm font-medium text-blue-gray-700"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type="file"
        accept={accept}
        multiple={multiple}
        {...(register && register(name))}
        onChange={onChange}
        className={`block w-full px-4 py-2 text-sm text-gray-700 border ${
          error ? "border-red-500" : "border-blue-gray-200"
        } rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
          error ? "focus:ring-red-500" : "focus:ring-blue-500"
        } file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100`}
      />

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FileInput;
