import React from "react";
import Datatable from "./UI/Datatable";
import TitleText from "./UI/TitleText";
import DashboardCard from "./UI/DashboardCard";

const projectColumns = ["Company", "Members", "Budget", "Completion"];

const projectRows = [
  {
    company: "Material UI XD Version",
    members: ["John Doe", "Jane Smith"],
    budget: "$14,000",
    completion: 60,
  },
  {
    company: "Add Progress Track",
    members: ["Alice", "Bob"],
    budget: "$3,000",
    completion: 10,
  },
];

const renderProjectRow = (row, index) => (
  <tr key={index}>
    <td className="p-4">
      <TitleText variant="small">{row.company}</TitleText>
    </td>
    <td className="p-4">
      <TitleText variant="small">{row.members.join(", ")}</TitleText>
    </td>
    <td className="p-4">
      <TitleText variant="small">{row.budget}</TitleText>
    </td>
    <td className="p-4">
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-green-500 h-2.5 rounded-full"
          style={{ width: `${row.completion}%` }}
        ></div>
      </div>
      <TitleText variant="small" className="text-gray-500 mt-1">
        {row.completion}%
      </TitleText>
    </td>
  </tr>
);

const ProjectsTable = () => (
  <DashboardCard
    icon="📋"
    title="Projects Overview"
    value="" // optional
    footer="" // optional
    color="bg-gradient-to-tr from-blue-400 to-blue-600"
  >
    <Datatable
      title="Projects"
      columns={projectColumns}
      data={projectRows}
      renderRow={renderProjectRow}
    />
  </DashboardCard>
);

export default ProjectsTable;
