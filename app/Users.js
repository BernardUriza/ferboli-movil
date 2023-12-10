// Users.js
import React, {useState, useEffect} from 'react';
import PatientsTable from './components/PatientsTable';
import { fetchPatients } from './useCases/fetchPatients';
import { savePatient } from './useCases/savePatient';

const Users = () => {
  const [patients, setPatients] = useState([]); 
  const [key, setKey] = useState(1);

  useEffect(() => {
    fetchPatients()
      .then((p) => setPatients(p))
      .catch((error) => console.error(error.message))
      .finally(() => {
        setKey(key+1);
      });
  }, []);  

  const handleSave = (editedPatient) => {
    savePatient(editedPatient)
      .then((result) => {
        if (result.success) {
          // Patient data saved successfully, you can perform additional actions if needed
          console.log('Patient data saved successfully in dashboard.');
          fetchReports(); // Refresh the list of medical reports
        } else {
          // Error while saving, you can display an error message
          console.error('Error while saving patient data in the API.');
        }
      })
      .catch((error) => {
        console.error('Error while saving patient data: ' + error.message);
      });
  };
  

  return (
    <div className='pt-3'>
      {/* Table of Clinical Results */}
      <div className='pt-3'>
        <PatientsTable key={key} patients={patients} save={handleSave}/>
      </div>
    </div>
  );
};

export default Users;
