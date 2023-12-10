// Users.js
import React, {useState, useEffect} from 'react';
import PatientsTable from './components/PatientsTable';
import { fetchCategories } from './useCases/fetchCategories';
import { savePatient } from './useCases/savePatient';
import CategoriesTable from './components/CategoriesTable';

const Settings = () => {
  const [categories, setCategories] = useState([]); 
  const [key, setKey] = useState(1);

  useEffect(() => {
    fetchCategories()
      .then((p) => setCategories(p))
      .catch((error) => console.error(error.message))
      .finally(() => {
        setKey(key+1);
      });
  }, []);  

  const handleSave = (editedCategory) => {
    saveCategory(editedCategory)
      .then((result) => {
        if (result.success) {
          // Category data saved successfully, you can perform additional actions if needed
          console.log('Category data saved successfully in dashboard.');
          fetchCategories(); // Refresh the list of categories
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
        <CategoriesTable key={key} categories={categories} save={handleSave}/>
      </div>
    </div>
  );
};

export default Settings;
