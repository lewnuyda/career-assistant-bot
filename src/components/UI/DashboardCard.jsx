import React from "react";
import { Card, CardHeader, CardBody } from "@material-tailwind/react";
import TitleText from "./TitleText"; // Adjust path if needed

const DashboardCard = ({
  icon,
  title,
  value,
  footer,
  color = "bg-gradient-to-tr from-blue-400 to-blue-600",
  footerColor = "text-blue-500",
  children,
}) => {
  return (
    <Card className="shadow-lg">
      <CardHeader
        floated={false}
        className={`shadow-none ${color} p-4 flex items-center justify-between`}
      >
        {icon && <div className="text-white text-2xl">{icon}</div>}
      </CardHeader>
      <CardBody>
        {title && (
          <TitleText variant="small" color="gray" className="mb-1">
            {title}
          </TitleText>
        )}
        {value && (
          <TitleText variant="h5" className="font-bold">
            {value}
          </TitleText>
        )}
        {footer && (
          <TitleText variant="small" className={`mt-2 ${footerColor}`}>
            {footer}
          </TitleText>
        )}

        {children && <div className="mt-4">{children}</div>}
      </CardBody>
    </Card>
  );
};

export default DashboardCard;
