// Dashboard.js
import React, {useState, useEffect} from 'react';
import { Grid, Col } from "@tremor/react";
import NumericIndicators from './components/NumericIndicators';
import TopStudiesList from './components/TopStudiesList';
import ClinicalResultsTable from './components/ClinicalResultsTable';
import { fetchMedicalReports } from './useCases/fetchMedicalReports';
import { fetchPatients } from './useCases/fetchPatients';
import { saveMedicalReports } from './useCases/saveMedicalReport';
import { savePatient } from './useCases/savePatient';
import { fetchCategories } from './useCases/fetchCategories';
import { saveStudy } from './useCases/saveStudy';
import { removeStudy } from './useCases/removeStudy';

const Dashboard = ({setLoadingState}) => {
  const [patientsCount, setPatientsCount] = useState(0);
  const [reportsSentCount, setReportsSentCount] = useState(0);
  const [studiesData, setStudiesData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [keyClinicalResultsTable, setKeyClinicalResultsTableState] = useState(1);
  
  const setKeyClinicalResultsTable = () => {
    setKeyClinicalResultsTableState(keyClinicalResultsTable+1)
  }
  const [openForm, setOpenForm] = useState(false);

  const fetchReports = (loadingStateActive=true) => {
    if(loadingStateActive)
      setLoadingState(true);

    // Realizar ambos fetch simultáneamente
    Promise.all([fetchMedicalReports(), fetchCategories(), fetchPatients()])
      .then(([medicalReports, c, p]) => {
        // Establecer los estados después de que ambos fetch se completen
        setStudiesData(medicalReports);
        setCategories(c);
        setPatientsCount(p.length)
        setReportsSentCount(medicalReports.length)
      })
      .catch((error) => console.error(error.message))
      .finally(() => {
        if(loadingStateActive){
          setLoadingState(false)
          setKeyClinicalResultsTable();
        }
      });
  };

  useEffect(() => {
    fetchReports();
  }, []); 

  const handleSaveReport = (editedReport) => {
    return new Promise((resolve, reject) => {
      saveMedicalReports(editedReport)
        .then((result) => {
          if (result.success) {
            fetchReports(false);
            setOpenForm(false)
            resolve(result.data); // Resolve with the original result
          } else {
            console.error('Error saving the medical report in the API.');
            reject(result); // Reject with the original result
          }
        })
        .catch((error) => {
          console.error('Error saving the medical report: ' + error.message);
          reject(error); // Reject with the original error
        });
    });
  };
  
  const handleSaveStudy = (editedStudy) => {
    return saveStudy(editedStudy)      
    .then((result) => {
      if (result.success) {
        // Guardado exitoso, puedes realizar acciones adicionales si es necesario
        console.log('Estudio guardado exitosamente en dashboard.');
      } else {
        // Error al guardar, puedes mostrar un mensaje de error
        console.error('Error al guardar el informe estudio en api.');
        throw "Error al guardar el informe estudio en api.";
      }
    })
    .catch((error) => {
      throw 'Error al guardar el estudio: ' + error.message;
    });
  };    

  const handleSavePatient = (editedPatient) => {
    return savePatient(editedPatient)
      .then((result) => {
        if (result.success) {
          // Patient data saved successfully, you can perform additional actions if needed
          console.log('Patient data saved successfully in dashboard.');
        } else {
          // Error while saving, you can display an error message
          console.error('Error while saving patient data in the API.');
        }
      })
      .catch((error) => {
        console.error('Error while saving patient data: ' + error.message);
      });
  };
  
  const handleOpenForm = () => {
    setOpenForm(true)
  }
  
  const handleCloseForm = () => {
    setKeyClinicalResultsTable();
    setOpenForm(false)
  }
  return (
    <div className='pt-3'>
      <Grid numItems={1} numItemsLg={3} className="gap-2">
        <Col numColSpan={1} numColSpanLg={1}>
          {/* Numeric Indicators */}
          <NumericIndicators setOpenForm={handleOpenForm} patientsCount={patientsCount} reportsSentCount={reportsSentCount} />
        </Col>
        <Col numColSpan={1} numColSpanLg={2}>
          {/* List of Top Studies */}
          <TopStudiesList medicalReports={studiesData} categories={categories}/>
        </Col>
      </Grid> 
      {/* Table of Clinical Results */}
      <div className='pt-3'>
        <ClinicalResultsTable onClose={handleCloseForm} isOpenForm={openForm} key={keyClinicalResultsTable} reports={studiesData} categories={categories} save={handleSaveReport} saveStudy={handleSaveStudy} savePatient={handleSavePatient} refresh={fetchReports} removeStudy={removeStudy} setKeyClinicalResultsTable={setKeyClinicalResultsTable}/>
      </div>
    </div>
  );
};

export default Dashboard;
