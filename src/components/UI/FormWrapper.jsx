// src/components/FormWrapper.jsx
import React from "react";

const FormWrapper = ({ onSubmit, children, className = "" }) => (
  <form onSubmit={onSubmit} className={className}>
    {children}
  </form>
);

export default FormWrapper;
