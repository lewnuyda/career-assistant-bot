import React from "react";
import { Card, CardHeader, CardBody } from "@material-tailwind/react";
import TitleText from "./TitleText";

const Datatable = ({ title = "Table", columns = [], data = [], renderRow }) => {
  return (
    <Card>
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <TitleText variant="h6">{title}</TitleText>
      </CardHeader>
      <CardBody className="overflow-x-auto px-0 pt-0 pb-2">
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              {columns.map((col, index) => (
                <th key={index} className="border-b p-4 text-left">
                  <TitleText variant="small" className="font-semibold">
                    {col}
                  </TitleText>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row, index) =>
                renderRow ? (
                  renderRow(row, index) // 👈 this should return <tr>
                ) : (
                  <tr key={index}>
                    <td colSpan={columns.length} className="p-4">
                      {JSON.stringify(row)}
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td colSpan={columns.length} className="p-4 text-center">
                  <TitleText variant="small" className="text-gray-500">
                    No data available.
                  </TitleText>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
};

export default Datatable;
