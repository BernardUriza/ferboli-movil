import React from 'react';
import { Select, SelectItem, Button } from "@tremor/react";
import { FilterIcon, PlusIcon } from '@heroicons/react/outline';
import TextInputWithIcon from './TextInputWithIcon';
import TableCellButtonIcon from './TableCellButtonIcon';

const FilterControls = ({
  selectedFilter,
  setSelectedFilter,
  filterText,
  setFilterText, 
  columns
}) => {
  debugger
  return (
    <div className="flex items-center">
      <div className="max-w-sm mx-auto space-y-6">
        <Select placeholder="Filtrar" style={{ width: '15vw' }} value={selectedFilter} onValueChange={setSelectedFilter}>
          <SelectItem value="" icon={FilterIcon}>
            All Columns
          </SelectItem>
          <SelectItem value="id" icon={FilterIcon}>
            ID
          </SelectItem>
          {
            columns?.map(column => ( column.presentInFilter ?           
              <SelectItem value={column.value} icon={FilterIcon}>
                {column.title}
              </SelectItem> : null
            ))
          }
        </Select>
      </div>
      <TextInputWithIcon
        value={filterText}
        onChange={(e) => setFilterText(e)}
      />
    </div>
  );
};

export default FilterControls;
