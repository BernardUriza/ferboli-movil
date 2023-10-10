// Dashboard.js
import React, {useState, useEffect} from 'react';
import { Grid, Col } from "@tremor/react";
import NumericIndicators from './components/NumericIndicators';
import TopStudiesList from './components/TopStudiesList';
import ClinicalResultsTable from './components/ClinicalResultsTable';
import { fetchMedicalReports } from './useCases/fetchMedicalReports';

const Dashboard = () => {
  const [studiesData, setStudiesData] = useState([]);

  useEffect(() => {
    fetchMedicalReports()
      .then((medicalReports) => setStudiesData(medicalReports))
      .catch((error) => console.error(error.message));
  }, []);  

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
