import React, { useState } from 'react';
import { Card, Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell, Button, Title, Select, SelectItem  } from "@tremor/react";
import { DownloadIcon, UserAddIcon, PrinterIcon, PencilIcon, FilterIcon } from '@heroicons/react/outline';
import ReportForm from './ReportForm';
import TableCellButtonIcon from '../controls/TableCellButtonIcon';
import TextInputWithIcon from '../controls/TextInputWithIcon';


const ClinicalResultsTable = ({ studiesData }) => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [pageNumber, setPageNumber] = useState(1);

  const reportsPerPage = 10; // Adjust the number of reports per page

  const filteredReports = studiesData.filter((report) =>
    report.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const paginatedReports = filteredReports.slice(
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

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <Title>Lista de Resultados Clínicos</Title>
        <div className="flex items-center">
          <div className="max-w-sm mx-auto space-y-6">
            <Select style={{width: '15vw'}}>
              <SelectItem value="1" icon={FilterIcon}>
                Kilometers
              </SelectItem>
              <SelectItem value="2" icon={FilterIcon}>
                Meters
              </SelectItem>
              <SelectItem value="3" icon={FilterIcon}>
                Miles
              </SelectItem>
              <SelectItem value="4" icon={FilterIcon}>
                Nautical Miles
              </SelectItem>
            </Select>
          </div>
          <TextInputWithIcon />
          <Button  onClick={() => setIsFormOpen(true)}>
            <label className='flex'>
              <UserAddIcon className="w-6 h-6 mr-2" /> <div>New</div>
            </label>
          </Button>
        </div>
      </div>
      <Table className="mt-4">
        <TableHead>
          <TableRow>
            <TableHeaderCell>ID</TableHeaderCell>
            <TableHeaderCell>Fecha</TableHeaderCell>
            <TableHeaderCell>Nombre</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedReports.map((result) => (
            <TableRow key={result.id}>
              <TableCell>{result.id}</TableCell>
              <TableCell>{result.date}</TableCell>
              <TableCell>{result.name}</TableCell>
              <TableCell>{result.status}</TableCell>
              <TableCell>
                <TableCellButtonIcon text={"Download"} icon={<DownloadIcon className="w-4 h-4" />} />
                <TableCellButtonIcon text={"Print"} icon={<PrinterIcon className="w-4 h-4" />} />
                <TableCellButtonIcon onClick={() => openForm(result)} text={"Edit"} icon={<PencilIcon className="w-4 h-4" />} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isFormOpen && <ReportForm report={selectedReport} onClose={closeForm} onSave={saveReport} />}
    </Card>
  );
};

export default ClinicalResultsTable;