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
  setIsFormOpen,
}) => {
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
          <SelectItem value="date" icon={FilterIcon}>
            Fecha
          </SelectItem>
          <SelectItem value="patient.name" icon={FilterIcon}>
            Nombre
          </SelectItem>
          <SelectItem value="status" icon={FilterIcon}>
            Status
          </SelectItem>
        </Select>
      </div>
      <TextInputWithIcon
        value={filterText}
        onChange={(e) => setFilterText(e)}
      />
      <TableCellButtonIcon onClick={() => setIsFormOpen(true)} icon={<PlusIcon className="w-6 h-6" />} />
    </div>
  );
};

export default FilterControls;
