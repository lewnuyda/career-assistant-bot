import React from "react";
import DashboardCard from "../../components/UI/DashboardCard";

import ProjectsTable from "../../components/ProjectsTable";
import OrdersOverview from "../../components/OrdersView";
import Breadcrumbs from "../../components/UI/Breadcrumbs";

const cardData = [
  {
    title: "Today's Money",
    value: "$53,000",
    icon: "💰",
    footer: "+55% since yesterday",
    color: "bg-gradient-to-tr from-green-400 to-green-600",
    footerColor: "text-green-500",
  },
  {
    title: "New Clients",
    value: "2,300",
    icon: "👥",
    footer: "+3% since last week",
    color: "bg-gradient-to-tr from-blue-400 to-blue-600",
    footerColor: "text-blue-500",
  },
  {
    title: "Sales",
    value: "$103,430",
    icon: "📈",
    footer: "+5% than last month",
    color: "bg-gradient-to-tr from-orange-400 to-orange-600",
    footerColor: "text-orange-500",
  },
  {
    title: "Items",
    value: "1,200",
    icon: "📦",
    footer: "-2% than yesterday",
    color: "bg-gradient-to-tr from-red-400 to-red-600",
    footerColor: "text-red-500",
  },
];

const Dashboard = () => {
  return (
    <>
      <Breadcrumbs />
      <div className="mt-12 grid gap-6 grid-cols-[repeat(auto-fit,minmax(260px,1fr))]">
        {cardData.map((card, index) => (
          <DashboardCard
            key={index}
            title={card.title}
            value={card.value}
            icon={card.icon}
            footer={card.footer}
            color={card.color}
            footerColor={card.footerColor}
          />
        ))}
      </div>
      <div className="mt-12 px-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProjectsTable />
        <OrdersOverview />
      </div>
    </>
  );
};

export default Dashboard;
