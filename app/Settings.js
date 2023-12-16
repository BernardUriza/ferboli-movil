// Users.js
import React, {useState, useEffect} from 'react';
import { fetchCategories } from './useCases/fetchCategories';
import { saveCategory } from './useCases/saveCategory';
import CategoriesTable from './components/CategoriesTable';

const Settings = () => {
  const [categories, setCategories] = useState([]); 
  const [key, setKey] = useState(1);

  const getCategories = () => {
    fetchCategories()
      .then((p) => {setCategories(p); 
        console.log('Category data refreshed.');})
      .catch((error) => console.error(error.message))
      .finally(() => {
        setKey(key+1);
      });
  }

  useEffect(getCategories, []);  

  const handleSave = (editedCategory) => {
    return saveCategory(editedCategory)
      .then((result) => {
        if (result.success) {
          // Category data saved successfully, you can perform additional actions if needed
          console.log('Category data saved successfully in settings.');
          getCategories(); // Refresh the list of categories
        } else {
          // Error while saving, you can display an error message
          console.error('Error while saving category data in the API.');
        }
      })
      .catch((error) => {
        console.error('Error while saving category data: ' + error.message);
      });
  };
  

  return (
    <div className='pt-3'>
      {/* Table of Categories */}
      <div className='pt-3'>
        <CategoriesTable key={key} categories={categories} saveCategory={handleSave}/>
      </div>
    </div>
  );
};

export default Settings;
