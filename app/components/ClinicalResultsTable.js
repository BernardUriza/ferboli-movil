import React, { useState, useEffect } from 'react';
import { Card, Title, Badge } from "@tremor/react";
import ReportForm from './ReportForm';
import FilterControls from '../controls/FilterControls';
import Pagination from '../controls/Pagination';
import CoreTable from '../controls/CoreTable';
import StatusBadge from '../controls/StatusBadge';

const ClinicalResultsTable = ({ reports, categories, save, savePatient, refresh }) => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [studiesData, setStudiesData] = useState(reports);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState(''); // State for column filtering
  const [lengthFiltered, setLengthFiltered] = useState(reports.length);
  const itemsPerPage = 11; // Adjust the number of items per page

  useEffect(() => {
    setStudiesData(reports);
  }, [reports]);

  const openForm = (item) => {
    setSelectedReport(item);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setSelectedReport(null);
    setIsFormOpen(false);
  };

  const handleSavePatient = (patient) => {
    // Update the patient information in the selected report
    if (selectedReport) {
      setSelectedReport({
        ...selectedReport,
        patient: patient, // Update the patient property
      });
    }
  
    // Call the savePatient function to save the patient information
    savePatient(patient);
    refresh();
  };
  
  
  const saveReport = (report) => {
    save(report)
    setSelectedReport(report);
    setIsFormOpen(false);
  };

  const renderCell = (columnKey, item) => {
    if (columnKey === 'status') {
      // Render the StatusBadge for the 'status' column
      return <StatusBadge status={item.status} />;
    }
    else if (columnKey === 'date') {
      // Render the 'date' column in the desired format with slashes
      const dateOptions = { day: 'numeric', month: 'short', year: 'numeric' };
      const formattedDate = new Date(item.date).toLocaleDateString('es-AR', dateOptions).replace(/de /g, '');
      return formattedDate.replace(/ /g, '/'); // Replace spaces with slashes
    }
    else if (columnKey === 'name') {      
      return item.patient?.name + " - " + item.category?.name; // Replace spaces with slashes
    } else {
      // Render other columns as usual
      return item[columnKey];
    }
  };
  const columns = [
    //{ key: 'id', title: 'ID' },
    { key: 'name', title: 'Nombre', width: '45%' },
    { key: 'date', title: 'Fecha', width: '25%' },
    { key: 'status', title: 'Status', width: '10%' },
  ];

  return (
    <Card style={{ "padding": "0px" }}>
      <div className="md:flex justify-between items-center p-4">
        <Title className='my-2'>Lista de Resultados Clínicos
          <Badge className='mx-3' color="green" size="sm">
            {lengthFiltered} reportes
          </Badge>
        </Title>
        <FilterControls
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          filterText={filterText}
          setFilterText={setFilterText}
          setIsFormOpen={setIsFormOpen}
        />
      </div>
      <CoreTable
        data={studiesData}
        columns={columns}
        filterText={filterText}
        selectedFilter={selectedFilter}
        itemsPerPage={itemsPerPage}
        pageNumber={pageNumber}
        openForm={openForm}
        renderCell={renderCell}
        onFiltered={(e)=>{setLengthFiltered(e)}}
      />
      <Pagination
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        totalPageCount={Math.ceil(lengthFiltered / itemsPerPage)}
      />
      {isFormOpen && <ReportForm categories={categories} report={selectedReport} onClose={closeForm} onSave={saveReport} onSavePatient={handleSavePatient} />}
    </Card>
  );
};

export default ClinicalResultsTable;
