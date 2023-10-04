// ClinicalResultsTable.js
import React from 'react';
import { Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell } from "@tremor/react";

const ClinicalResultsTable = ({ studiesData }) => {
  return (
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
        {studiesData.map((result) => (
          <TableRow key={result.id}>
            <TableCell>{result.id}</TableCell>
            <TableCell>{result.date}</TableCell>
            <TableCell>{result.name}</TableCell>
            <TableCell>{result.status}</TableCell>
            <TableCell>
              <button>Download</button>
              <button>Print</button>
              <button>View</button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ClinicalResultsTable;
