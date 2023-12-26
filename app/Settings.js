// Users.js
import React, { useState, useEffect } from 'react';
import { fetchCategories } from './useCases/fetchCategories';
import { saveCategory } from './useCases/saveCategory';
import { fetchStudyTypes } from './useCases/fetchStudyTypes';
import { saveStudyType } from './useCases/saveStudyType';
import CategoriesTable from './components/CategoriesTable';
import StudyTypesTable from './components/StudyTypesTable';

const Settings = () => {
  const [categories, setCategories] = useState([]);
  const [studyTypes, setStudyTypes] = useState([]);
  const [key, setKey] = useState(1);

  const getCategories = () => {
    fetchCategories()
      .then((data) => {
        setCategories(data);
        console.log('Category data refreshed.');
      })
      .catch((error) => console.error(error.message))
      .finally(() => {
        setKey((prevKey) => prevKey + 1);
      });
  };

  const getStudyTypes = () => {
    fetchStudyTypes()
      .then((data) => {
        setStudyTypes(data);
        console.log('StudyType data refreshed.');
      })
      .catch((error) => console.error(error.message))
      .finally(() => {
        setKey((prevKey) => prevKey + 1);
      });
  };

  useEffect(() => {
    getCategories();
    getStudyTypes();
  }, []);

  const handleSaveCategory = (editedCategory) => {
    return saveCategory(editedCategory)
      .then((result) => {
        if (result.success) {
          console.log('Category data saved successfully in settings.');
          getCategories(); // Refresh the list of categories
        } else {
          console.error('Error while saving category data in the API.');
        }
      })
      .catch((error) => {
        console.error('Error while saving category data: ' + error.message);
      });
  };

  const handleSaveStudyType = (editedStudyType) => {
    return saveStudyType(editedStudyType)
      .then((result) => {
        if (result.success) {
          console.log('StudyType data saved successfully in settings.');
          getStudyTypes(); // Refresh the list of study types
        } else {
          console.error('Error while saving StudyType data in the API.');
        }
      })
      .catch((error) => {
        console.error('Error while saving StudyType data: ' + error.message);
      });
  };

  return (
    <div className='pt-3'>
      {/* Table of StudyTypes */}
      <div className='pt-3'>
        <StudyTypesTable key={key} categories={categories} studyTypes={studyTypes} saveStudyType={handleSaveStudyType} />
      </div>
      {/* Table of Categories */}
      <div className='pt-3'>
        <CategoriesTable key={key} categories={categories} saveCategory={handleSaveCategory} />
      </div>
    </div>
  );
};

export default Settings;
