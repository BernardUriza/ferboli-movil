// Dashboard.js
import React from 'react';
import { Card } from "@tremor/react";
import NumericIndicators from './components/NumericIndicators';
import TopStudiesList from './components/TopStudiesList';
import ClinicalResultsTable from './components/ClinicalResultsTable';

const Dashboard = () => {
  const studiesData = [
    { id: 1, name: "Study 1", date: "2023-09-25", status: "Completed" },
    { id: 2, name: "Study 2", date: "2023-09-24", status: "In Progress" },
    { id: 3, name: "Study 3", date: "2023-09-23", status: "Pending" },
    { id: 4, name: "Study 4", date: "2023-09-22", status: "Completed" },
    { id: 5, name: "Study 5", date: "2023-09-21", status: "In Progress" },
  ];

  return (
    <Card>
      
      <div className="flex justify-between mb-4">
          {/* Numeric Indicators */}
          <NumericIndicators />

          {/* List of Top Studies */}
          <TopStudiesList studiesData={studiesData} />
      </div>

      {/* Table of Clinical Results */}
      <ClinicalResultsTable studiesData={studiesData} />
    </Card>
  );
};

export default Dashboard;
