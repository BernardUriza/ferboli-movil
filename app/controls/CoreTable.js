import React, { useState } from 'react';
import { Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell } from "@tremor/react";
import { DownloadIcon, PrinterIcon, PencilIcon, SortAscendingIcon, SortDescendingIcon } from '@heroicons/react/outline';
import TableCellButtonIcon from './TableCellButtonIcon';
import CustomCheckbox from './CustomCheckbox'; 

const CoreTable = ({
  data,
  columns,
  filterText,
  selectedFilter,
  itemsPerPage,
  pageNumber,
  renderCell,
  openForm,
}) => {
  const [selectAll, setSelectAll] = useState(false);
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortAscending, setSortAscending] = useState(true);

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const filteredDataWithColumnFilter = selectedFilter
    ? filteredData.filter((item) =>
        item[selectedFilter] && (item[selectedFilter] + '').toLowerCase().includes(filterText.toLowerCase())
      )
    : filteredData;

  const sortedData = sortedColumn
    ? [...filteredDataWithColumnFilter].sort((a, b) => {
        const aValue = a[sortedColumn] || '';
        const bValue = b[sortedColumn] || '';
        if (sortAscending) {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      })
    : filteredDataWithColumnFilter;

  const paginatedData = sortedData.slice(
    (pageNumber - 1) * itemsPerPage,
    pageNumber * itemsPerPage
  );

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
  };

  const handleSortColumn = (column) => {
    if (column === sortedColumn) {
      // Toggle sort order
      setSortAscending(!sortAscending);
    } else {
      // Sort by the selected column in ascending order by default
      setSortedColumn(column);
      setSortAscending(true);
    }
  };

  return (
    <Table>
      <TableHead className="bg-slate-50">
        <TableRow>
          <TableHeaderCell>
            <CustomCheckbox checked={selectAll} onChange={handleSelectAll} />
          </TableHeaderCell>
          {columns.map((column) => (
            <TableHeaderCell
              key={column.key}
              onClick={() => handleSortColumn(column.key)}
            >
              {column.title}
              {sortedColumn === column.key && (
                <span className="ml-1">
                  {sortAscending ? (
                    <SortAscendingIcon className="w-4 h-4" />
                  ) : (
                    <SortDescendingIcon className="w-4 h-4" />
                  )}
                </span>
              )}
            </TableHeaderCell>
          ))}
          <TableHeaderCell>Actions</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {paginatedData.map((item) => (
          <TableRow key={item.id}>
            <TableCell>
              <CustomCheckbox checked={selectAll} onChange={() => {}}/>
            </TableCell>
            {columns.map((column) => (
              <TableCell key={column.key}>{renderCell(column.key, item)}</TableCell>
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
