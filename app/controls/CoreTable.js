import React from 'react';
import { Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell } from "@tremor/react";
import { DownloadIcon, PrinterIcon, PencilIcon } from '@heroicons/react/outline';
import TableCellButtonIcon from './TableCellButtonIcon';

const CoreTable = ({
  data,
  columns,
  filterText,
  selectedFilter,
  itemsPerPage,
  pageNumber,
  openForm
}) => {
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const filteredDataWithColumnFilter = selectedFilter
    ? filteredData.filter((item) =>
        item[selectedFilter] && (item[selectedFilter] + "").toLowerCase().includes(filterText.toLowerCase())
      )
    : filteredData;

  const paginatedData = filteredDataWithColumnFilter.slice(
    (pageNumber - 1) * itemsPerPage,
    pageNumber * itemsPerPage
  );

  return (
    <Table>
      <TableHead className="bg-slate-50">
        <TableRow>
          {columns.map((column) => (
            <TableHeaderCell key={column.key}>{column.title}</TableHeaderCell>
          ))}
          <TableHeaderCell>Actions</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {paginatedData.map((item) => (
          <TableRow key={item.id}>
            {columns.map((column) => (
              <TableCell key={column.key}>{item[column.key]}</TableCell>
            ))}
            <TableCell>
              <TableCellButtonIcon text={"Download"} icon={<DownloadIcon className="w-4 h-4" />} />
              <TableCellButtonIcon text={"Print"} icon={<PrinterIcon className="w-4 h-4" />} />
              <TableCellButtonIcon onClick={() => openForm(item)} text={"Edit"} icon={<PencilIcon className="w-4 h-4" />} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CoreTable;
