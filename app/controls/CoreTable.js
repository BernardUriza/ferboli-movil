import React, { useState, useEffect } from 'react';
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
  const [itemsSelected, setItemsSelected] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);

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

  useEffect(() => {
    // Update the currentItems state when the pagination or filtered data changes
    const start = (pageNumber - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setCurrentItems(sortedData.slice(start, end));
    // Deselect all when pagination or filters change
    //setItemsSelected([]);
    //setSelectAll(false);
  }, [pageNumber, itemsPerPage, sortedData, filterText, selectedFilter]);

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

  const handleSelect = (item, newCheckedState) => {
    const selectedIndex = itemsSelected.indexOf(item);
    const newSelected = [...itemsSelected];

    if(newCheckedState){
      if (selectedIndex === -1) {
        newSelected.push(item);
      }
    }
    else{
      if (selectedIndex != -1) {
        newSelected.splice(selectedIndex, 1);
      }
    }

    setItemsSelected(newSelected);
  };

  const handleSelectAll = (newCheckedState) => {
    setSelectAll(newCheckedState);
  };
  useEffect(() => {
    if (selectAll) {
      // Select all items on the current page
      setItemsSelected([...currentItems]);
    } else {
      // Deselect all items on the current page
      setItemsSelected([]);
    }
  }, [selectAll]);


  return (
    <Table>
      <TableHead className="bg-slate-50">
        <TableRow>
          <TableHeaderCell>
            <CustomCheckbox
              checked={selectAll}
              onChange={handleSelectAll}
            />
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
        {currentItems.map((item) => (
          <TableRow key={item.id}>
            <TableCell>
              <CustomCheckbox
                checked={selectAll || itemsSelected.includes(item)}
                onChange={(newCheckedState) => handleSelect(item, newCheckedState)}
              />
            </TableCell>
            {columns.map((column) => (
              <TableCell key={column.key}>{renderCell(column.key, item)}</TableCell>
            ))}
            <TableCell>
              <TableCellButtonIcon text={"Downlsoad"} icon={<DownloadIcon className="w-4 h-4" />} />
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
