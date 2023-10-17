import React, { useState } from 'react';
import { Card, Title, Badge } from "@tremor/react";
import ReportForm from './ReportForm';
import FilterControls from '../controls/FilterControls';
import Pagination from '../controls/Pagination';
import CoreTable from '../controls/CoreTable';
import StatusBadge from '../controls/StatusBadge';

const ClinicalResultsTable = ({ studiesData }) => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState(''); // State for column filtering
  const itemsPerPage = 4; // Adjust the number of items per page

  const openForm = (item) => {
    setSelectedReport(item);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setSelectedReport(null);
    setIsFormOpen(false);
  };

  const saveReport = (report) => {
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
      <div className="flex justify-between items-center p-4">
        <Title>Lista de Resultados Clínicos
          <Badge className='mx-3' color="green" size="sm">
            {studiesData.length} reportes
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
      />
      <Pagination
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        totalPageCount={Math.ceil(studiesData.length / itemsPerPage)}
      />
      {isFormOpen && <ReportForm report={selectedReport} onClose={closeForm} onSave={saveReport} />}
    </Card>
  );
};

export default ClinicalResultsTable;
