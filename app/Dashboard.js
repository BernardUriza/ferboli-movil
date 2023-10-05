// Dashboard.js
import React from 'react';
import { Grid, Col } from "@tremor/react";
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
    <div className='pt-3'>
      <Grid numItems={1} numItemsLg={3} className="gap-2">
        <Col numColSpan={1} numColSpanLg={1}>
          {/* Numeric Indicators */}
          <NumericIndicators />
        </Col>
        <Col numColSpan={1} numColSpanLg={2}>
          {/* List of Top Studies */}
          <TopStudiesList studiesData={studiesData} />
        </Col>
      </Grid>
      {/* Table of Clinical Results */}
      <div className='pt-3'>
        <ClinicalResultsTable studiesData={studiesData} />
      </div>
    </div>
  );
};

export default Dashboard;
