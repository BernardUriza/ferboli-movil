import React, { useState, useEffect } from 'react';
import { Card, Title, Badge } from "@tremor/react";
import CategoryForm from './CategoryForm';
import FilterControls from '../controls/FilterControls';
import Pagination from '../controls/Pagination';
import CoreTable from '../controls/CoreTable';
import { ConfirmAlert } from '../controls/Alerts/ConfirmAlert';

const CategoriesTable = ({ categories, saveCategory, key }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredCategories, setFilteredCategories] = useState(categories);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [lengthFiltered, setLengthFiltered] = useState(categories.length);
  const [showConfirm, setShowConfirm] = useState(false);
  const itemsPerPage = 11;  

  const handleConfirm = () => {
    // Perform additional actions or call your save logic here
    // ...

    // After handling the confirm, close the ConfirmAlert
    setShowConfirm(false);
  };

  const handleCancel = () => {
    // Handle cancel logic or simply close the ConfirmAlert
    setShowConfirm(false);
  };

  useEffect(() => {
    setFilteredCategories(categories);
  }, [categories]);

  const openForm = (item) => {
    setSelectedCategory(item);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setSelectedCategory(null);
    setIsFormOpen(false);
  };

  const handleSaveCategory = (category) => {
    if (selectedCategory) {
      setSelectedCategory({
        ...selectedCategory,
        name: category.name, // Update the category name
        // Add other properties to update here
      });
    }
    saveCategory(category);
    // Refresh the category list if needed
    setShowConfirm(true);
    debugger
  };

  const renderCell = (columnKey, item) => {
    if (columnKey === 'studyTypes') {
      const studyTypeList = item.studyTypes.map(studyType => studyType.name).join(', ');
      const quantity = item.studyTypes.length;
  
      return (
        <div>
          <p>Types: {studyTypeList}</p>
          <p>Quantity: {quantity}</p>
        </div>
      );
    } else {
      return item[columnKey];
    }
  };
  

  const columns = [
    { isFilterColumn: true, key: 'name', value: 'name', title: 'Nombre', width: '30%' },
    { isFilterColumn: true, key: 'studyTypes', value: 'studyTypes.*', title: 'Tipos de estudio', width: '30%' },
  ];

  return (
    <Card style={{ "padding": "0px" }}>
      <div className="md:flex justify-between items-center p-4">
        <Title className='my-2'>Lista de Categorías
          <Badge className='mx-3' color="green" size="sm">
            {lengthFiltered} categorías
          </Badge>
        </Title>
        <FilterControls
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          filterText={filterText}
          setFilterText={setFilterText}
          setIsFormOpen={setIsFormOpen}
          columns={columns}
        />
      </div>
      <CoreTable
        key={key}
        data={filteredCategories}
        columns={columns}
        filterText={filterText}
        selectedFilter={selectedFilter}
        itemsPerPage={itemsPerPage}
        pageNumber={pageNumber}
        openForm={openForm}
        renderCell={renderCell}
        onFiltered={(e) => { setLengthFiltered(e) }}
      />
      <Pagination
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        totalPageCount={Math.ceil(lengthFiltered / itemsPerPage)}
      />
      {isFormOpen && <CategoryForm category={selectedCategory} onClose={closeForm} onSave={handleSaveCategory} />}
      {/* Show ConfirmAlert */}
      <ConfirmAlert
        open={showConfirm}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />

    </Card>
  );
};

export default CategoriesTable;
