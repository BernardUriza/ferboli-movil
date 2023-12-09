// Dashboard.js
import React, {useState, useEffect} from 'react';
import { Grid, Col } from "@tremor/react";
import NumericIndicators from './components/NumericIndicators';
import TopStudiesList from './components/TopStudiesList';
import ClinicalResultsTable from './components/ClinicalResultsTable';
import { fetchMedicalReports } from './useCases/fetchMedicalReports';
import { saveMedicalReports } from './useCases/saveMedicalReport';
import { savePatient } from './useCases/savePatient';
import { fetchCategories } from './useCases/fetchCategories';
import { saveStudy } from './useCases/saveStudy';

const Dashboard = ({setLoadingState}) => {
  const [studiesData, setStudiesData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [keyClinicalResultsTable, setKeyClinicalResultsTable] = useState(1);
  const [openForm, setOpenForm] = useState(false);

  const fetchReports = (loadingStateActive=true) => {
    if(loadingStateActive)
      setLoadingState(true);

    // Realizar ambos fetch simultáneamente
    Promise.all([fetchMedicalReports(), fetchCategories()])
      .then(([medicalReports, c]) => {
        // Establecer los estados después de que ambos fetch se completen
        setStudiesData(medicalReports);
        setCategories(c);
      })
      .catch((error) => console.error(error.message))
      .finally(() => {
        if(loadingStateActive)
          setLoadingState(false)
        setKeyClinicalResultsTable(keyClinicalResultsTable+1);
      });
  };

  useEffect(() => {
    fetchReports();
  }, []); 

  const handleSaveReport = (editedReport) => {
    saveMedicalReports(editedReport)      
    .then((result) => {
      if (result.success) {
        // Guardado exitoso, puedes realizar acciones adicionales si es necesario
        console.log('Informe médico guardado exitosamente en dashboard.');
        fecthReports()
      } else {
        // Error al guardar, puedes mostrar un mensaje de error
        console.error('Error al guardar el informe médico en api.');
      }
    })
    .catch((error) => {
      console.error('Error al guardar el informe médico: ' + error.message);
    });
  };  

  
  const handleSaveStudy = (editedStudy) => {
    saveStudy(editedStudy)      
    .then((result) => {
      if (result.success) {
        // Guardado exitoso, puedes realizar acciones adicionales si es necesario
        console.log('Estudio guardado exitosamente en dashboard.');
        fecthReports()
      } else {
        // Error al guardar, puedes mostrar un mensaje de error
        console.error('Error al guardar el informe estudio en api.');
      }
    })
    .catch((error) => {
      console.error('Error al guardar el estudio: ' + error.message);
    });
  };    

  const handleSavePatient = (editedPatient) => {
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
  
  function handleOpenForm (){
    setOpenForm(true)
  }

  return (
    <div className='pt-3'>
      <Grid numItems={1} numItemsLg={3} className="gap-2">
        <Col numColSpan={1} numColSpanLg={1}>
          {/* Numeric Indicators */}
          <NumericIndicators setOpenForm={handleOpenForm} />
        </Col>
        <Col numColSpan={1} numColSpanLg={2}>
          {/* List of Top Studies */}
          <TopStudiesList medicalReports={studiesData} categories={categories}/>
        </Col>
      </Grid> 
      {/* Table of Clinical Results */}
      <div className='pt-3'>
        <ClinicalResultsTable isOpenForm={openForm} key={keyClinicalResultsTable} reports={studiesData} categories={categories} save={handleSaveReport} saveStudy={handleSaveStudy} savePatient={handleSavePatient} refresh={fetchReports}/>
      </div>
    </div>
  );
};

export default Dashboard;
