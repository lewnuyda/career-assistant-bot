// src/components/UI/Breadcrumbs.jsx
import React from "react";
import { Breadcrumbs as MTBreadcrumbs } from "@material-tailwind/react";
import { Link, useLocation } from "react-router-dom";
import TitleText from "./TitleText";

const capitalize = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, " ");

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  return (
    <div className="mb-4">
      <MTBreadcrumbs fullWidth>
        <Link to="/dashboard" className="text-blue-600 hover:underline text-sm">
          Dashboard
        </Link>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          return isLast ? (
            <TitleText
              key={name}
              variant="small"
              className="text-gray-800 font-medium"
            >
              {capitalize(name)}
            </TitleText>
          ) : (
            <Link
              key={name}
              to={routeTo}
              className="text-blue-600 hover:underline text-sm"
            >
              {capitalize(name)}
            </Link>
          );
        })}
      </MTBreadcrumbs>
    </div>
  );
};

export default Breadcrumbs;
