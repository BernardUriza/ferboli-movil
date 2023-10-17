import React, { useState } from 'react';
import { Card, Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell, Button, Title, Select, SelectItem, Badge } from "@tremor/react";
import { DownloadIcon, UserAddIcon, PrinterIcon, PencilIcon, FilterIcon, SearchIcon } from '@heroicons/react/outline';
import ReportForm from './ReportForm';
import TableCellButtonIcon from '../controls/TableCellButtonIcon';
import TextInputWithIcon from '../controls/TextInputWithIcon';
import StatusBadge from '../controls/StatusBadge';

const ClinicalResultsTable = ({ studiesData }) => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState(''); // State for column filtering

  const reportsPerPage = 4; // Adjust the number of reports per page

  const filteredReports = studiesData.filter((report) =>
    report.name.toLowerCase().includes(filterText.toLowerCase())
  );

  // Apply column filtering based on the selected option
  const filteredReportsWithColumnFilter = selectedFilter
    ? filteredReports.filter((report) => {
      report[selectedFilter] && (report[selectedFilter] + "").toLowerCase().includes(filterText.toLowerCase())
    }
    )
    : filteredReports;

  const totalPageCount = Math.ceil(filteredReportsWithColumnFilter.length / reportsPerPage);
  const paginatedReports = filteredReportsWithColumnFilter.slice(
    (pageNumber - 1) * reportsPerPage,
    pageNumber * reportsPerPage
  );

  const openForm = (report) => {
    setSelectedReport(report);
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

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPageCount; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers.map((number) => (
      <button
        key={number}
        onClick={() => setPageNumber(number)}
        className={`mx-1 px-3 py-1 rounded-full ${number === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-blue-500 hover:text-white'
          }`}
      >
        {number}
      </button>
    ));
  };

  return (
    <Card style={{ "padding": "0px" }}>
      <div className="flex justify-between items-center p-4">
        <Title>Lista de Resultados Clínicos
          <Badge className='mx-3' color="green" size="sm">
            {paginatedReports.length} reportes
          </Badge>
        </Title>
        <div className="flex items-center">
          <div className="max-w-sm mx-auto space-y-6">
            <Select placeholder="Filtrar" style={{ width: '15vw' }} value={selectedFilter} onValueChange={setSelectedFilter}>
              <SelectItem value="" icon={FilterIcon}>
                All Columns
              </SelectItem>
              <SelectItem value="id" icon={FilterIcon}>
                ID
              </SelectItem>
              <SelectItem value="date" icon={FilterIcon}>
                Fecha
              </SelectItem>
              <SelectItem value="name" icon={FilterIcon}>
                Nombre
              </SelectItem>
              <SelectItem value="status" icon={FilterIcon}>
                Status
              </SelectItem>
            </Select>
          </div>
          <TextInputWithIcon
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
          <Button onClick={() => setIsFormOpen(true)}>
            <label className='flex'>
              <UserAddIcon className="w-6 h-6 mr-2" /> <div>New</div>
            </label>
          </Button>
        </div>
      </div>
      <Table>
        <TableHead className='bg-slate-50'>
          <TableRow>
            <TableHeaderCell>ID</TableHeaderCell>
            <TableHeaderCell>Fecha</TableHeaderCell>
            <TableHeaderCell>Nombre</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedReports.map((report) => (
            <TableRow key={report.id}>
              <TableCell>{report.id}</TableCell>
              <TableCell>{report.date}</TableCell>
              <TableCell>{report.name}</TableCell>
              <TableCell><StatusBadge status={report.status} /></TableCell>
              <TableCell>
                <TableCellButtonIcon text={"Download"} icon={<DownloadIcon className="w-4 h-4" />} />
                <TableCellButtonIcon text={"Print"} icon={<PrinterIcon className="w-4 h-4" />} />
                <TableCellButtonIcon onClick={() => openForm(report)} text={"Edit"} icon={<PencilIcon className="w-4 h-4" />} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Pagination section */}
      <div className="bg-slate-50 flex justify-between border-t border-solid border-t-1 border-t-gray-300 p-3">
        <Button
          onClick={() => setPageNumber(Math.max(pageNumber - 1, 1))}
          disabled={pageNumber === 1}
          className="ml-2"
        >
          Anterior
        </Button>
        <div>
          {renderPageNumbers()}
        </div>
        <Button
          onClick={() => setPageNumber(Math.min(pageNumber + 1, totalPageCount))}
          disabled={pageNumber === totalPageCount}
          className="mr-2"
        >
          Siguiente
        </Button>
      </div>
      {isFormOpen && <ReportForm report={selectedReport} onClose={closeForm} onSave={saveReport} />}
    </Card>
  );
};

export default ClinicalResultsTable;
