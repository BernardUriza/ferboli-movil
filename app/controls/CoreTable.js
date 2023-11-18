import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell } from "@tremor/react";
import { TrashIcon, PencilIcon, SortAscendingIcon, SortDescendingIcon } from '@heroicons/react/outline';
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
  onFiltered,
  key
}) => {
  const [selectAll, setSelectAll] = useState(false);
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortAscending, setSortAscending] = useState(true);
  const [itemsSelected, setItemsSelected] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);

  const filteredData = data.filter((item) => {
    const textToSearch = Object.values(item)
      .flatMap((value) => {
        if (typeof value === 'object') {
          // If the value is an object, extract its properties
          return Object.values(value);
        } else {
          return [value];
        }
      })
      .join(' ')
      .toLowerCase();

    return textToSearch.includes(filterText.toLowerCase());
  });


  const filteredDataWithColumnFilter = selectedFilter
    ? filteredData.filter((item) => {
      const filterParts = selectedFilter.split('.');
      let value = item;
      for (const part of filterParts) {
        if (value && value.hasOwnProperty(part)) {
          value = value[part];
        } else {
          // Handle the case where the property doesn't exist
          value = null;
          break;
        }
      }
      return value && (value + '').toLowerCase().includes(filterText.toLowerCase());
    })
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

  const handleDataFiltering = () => {
    debugger
    // Update the currentItems state when the pagination or filtered data changes
    const start = (pageNumber - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setCurrentItems(sortedData.slice(start, end));
    // Deselect all when pagination or filters change
    //setItemsSelected([]);
    //setSelectAll(false);
    onFiltered(filteredDataWithColumnFilter.length)
  }

  useEffect(handleDataFiltering, [pageNumber, filterText, selectedFilter, key]);

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

    if (newCheckedState) {
      if (selectedIndex === -1) {
        newSelected.push(item);
      }
    }
    else {
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
          <TableHeaderCell
            style={{ "width": "50px" }}
          >
            <CustomCheckbox
              checked={selectAll}
              onChange={handleSelectAll}
            />
          </TableHeaderCell>
          {columns.map((column) => (
            <TableHeaderCell
              key={column.key}
              onClick={() => handleSortColumn(column.key)}
              style={{ "width": column.width }}
            >
              <div className="flex">
                <span style={{ "cursor": "pointer" }}>{column.title}</span>
                {sortedColumn === column.key && (
                  <span className="ml-2 mt-1">
                    {sortAscending ? (
                      <SortAscendingIcon className="w-4 h-4" />
                    ) : (
                      <SortDescendingIcon className="w-4 h-4" />
                    )}
                  </span>
                )}
              </div>
            </TableHeaderCell>
          ))}
          <TableHeaderCell></TableHeaderCell>
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
              <TableCellButtonIcon text={"Remover"} icon={<TrashIcon className="w-6 h-6" />} />
              <TableCellButtonIcon onClick={() => openForm(item)} text={"Editar"} icon={<PencilIcon className="w-6 h-6" />} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CoreTable;
