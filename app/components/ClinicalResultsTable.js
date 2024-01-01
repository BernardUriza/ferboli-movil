import React, { useState, useEffect } from 'react';
import { Card, Title, Badge } from "@tremor/react";
import ClinicalResultForm from './ClinicalResultForm';
import FilterControls from '../controls/FilterControls';
import Pagination from '../controls/Pagination';
import CoreTable from '../controls/CoreTable';
import StatusBadge from '../controls/StatusBadge';
import sendTokenByEmail from '../useCases/sendTokenByEmail';
import toast from 'react-hot-toast';
import { useConfirmationContext } from '../providers/ConfirmationContext';
import { removeMedicalReport } from '../useCases/removeMedicalReport';

const ClinicalResultsTable = ({ reports, categories, save, savePatient, saveStudy, refresh, key, isOpenForm, onClose }) => {
  const { confirm } = useConfirmationContext();
  const [selectedReport, setSelectedReport] = useState(null);
  const [studiesData, setStudiesData] = useState(reports);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState(''); // State for column filtering
  const [lengthFiltered, setLengthFiltered] = useState(reports.length);
  const [disableSave, setDisableSave] = useState(false);
  const itemsPerPage = 11; // Adjust the number of items per page

  useEffect(() => {
    setStudiesData(reports);
  }, [reports]);


  useEffect(() => {
    setIsFormOpen(isOpenForm);
  }, [isOpenForm]);

  const openForm = (item) => {
    setSelectedReport(item);
    setIsFormOpen(true);
  };
  const removeItem = async (item) => {
    try {
      await confirm("¿Estás seguro de que quieres eliminar este registro?");
      const result =  removeMedicalReport(item.id);
  
      toast.promise(
        result,
        {
          loading: 'Cargando',
          success: () => {
            refresh(false);
            return `Registro removido con éxito.`;
          },
          error: (err) => {
            return `Error ha sucedido: ${err.toString()}`;
          },
        }
      );
    } catch {
      console.log("Cancelado");
    }
  };
  
  const closeForm = () => {
    setSelectedReport(null);
    setIsFormOpen(false);
    refresh(false);
    onClose();
  };

  const handleSavePatient = (patient) => {
    // Update the patient information in the selected report
    if (selectedReport) {
      setSelectedReport({
        ...selectedReport,
        patient: patient, // Update the patient property
      });
    }
    // Call the savePatient function to save the patient information
    return savePatient(patient);
  };

  const handleSaveStudy = (study) => {
    if (selectedReport) {
      // Check if the study with the same id already exists in selectedReport.studies
      const studyIndex = selectedReport.studies.findIndex((existingStudy) => existingStudy.id === study.id);

      // If study with the same id is found, replace it; otherwise, add the new study
      const updatedStudies = studyIndex !== -1
        ? [
          ...selectedReport.studies.slice(0, studyIndex), // Studies before the updated study
          study, // Updated study
          ...selectedReport.studies.slice(studyIndex + 1), // Studies after the updated study
        ]
        : [
          ...selectedReport.studies,
          study, // Add the new study to the array
        ];

      setSelectedReport({
        ...selectedReport,
        studies: updatedStudies,
      });
    }
    return saveStudy(study);
  };

  const saveReport = (report) => {
    setDisableSave(true)
    var myPromise = save(report)
    toast.promise(
      myPromise,
      {
        loading: 'Cargando',
        success: () => {
          setDisableSave(false)
          setSelectedReport(null);
          setIsFormOpen(false);
          refresh(false);
          onClose();
          return `Cambios guardados con éxito.`
        },
        error: (err) => {
          setDisableSave(false)
          return `Error ha sucedido: ${err.toString()}`
        },
      }
    );
    return myPromise;
  };

  // ClinicalResultsTable.js
  const sendTokenReportByEmail = (report) => {
    const medicalReport = sendTokenByEmail(report);
    medicalReport.status = "Activo";
    const savedMedicalReport = save(medicalReport)    
    savedMedicalReport.then((res)=>{
      refresh(false)
    })
    return savedMedicalReport;
  };

  const renderCell = (columnKey, item) => {
    if (columnKey === 'status') {
      // Render the StatusBadge for the 'status' column
      return <StatusBadge status={item.status} />;
    }
    else if (columnKey === 'date') {
      // Render the 'date' column in the desired format with slashes
      const dateOptions = { day: 'numeric', month: 'short', year: 'numeric' };
      const formattedDate = new Date(item.date).toLocaleDateString('es-AR', dateOptions).replace(/de /g, '');
      return formattedDate.replace(/ /g, '/'); // Replace spaces with slashes
    }
    else if (columnKey === 'name') {
      return item.name + " - " + item.patient?.email; // Replace spaces with slashes
    } else {
      // Render other columns as usual
      return item[columnKey];
    }
  };
  const columns = [
    //{ key: 'id', title: 'ID' },
    { key: 'name', title: 'Nombre', width: '45%' },
    { key: 'date', title: 'Fecha', width: '25%' },
    { isFilterColumn: true, value: "status", key: 'status', title: 'Status', width: '10%' },
    { isFilterColumn: true, value: "patient.name", title: "Nombre del paciente" },
    { isFilterColumn: true, value: "patient.email", title: "Email del paciente" },
    { isFilterColumn: true, value: "category.name", title: "Categoría" }
  ];

  useEffect(() => {
    // Function to handle periodic refresh
    const handleAutomaticRefresh = () => {
      if (!isFormOpen) {
        refresh(false);
      }
    };

    // Set an interval for refreshing the data every 10 seconds
    const refreshInterval = setInterval(handleAutomaticRefresh, 2000);

    // Clear the interval when the component is unmounted or dependencies change
    return () => clearInterval(refreshInterval);
  }, [isFormOpen, refresh]);

  return (
    <Card style={{ "padding": "0px" }}>
      <div className="md:flex justify-between items-center p-4">
        <Title className='my-2'>Lista de Resultados Clínicos
          <Badge className='mx-3' color="green" size="sm">
            {lengthFiltered} reportes
          </Badge>
        </Title>
        <FilterControls
          columns={columns}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          filterText={filterText}
          setFilterText={setFilterText}
        />
      </div>
      <CoreTable
        data={studiesData}
        columns={columns}
        filterText={filterText}
        selectedFilter={selectedFilter}
        itemsPerPage={itemsPerPage}
        pageNumber={pageNumber}
        openForm={openForm}
        removeItem={removeItem}
        renderCell={renderCell}
        onFiltered={(e) => { setLengthFiltered(e) }}
        key={key}
      />
      <Pagination
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        totalPageCount={Math.ceil(lengthFiltered / itemsPerPage)}
      />
      {isFormOpen && <ClinicalResultForm
        refresh={refresh}
        disableSave={disableSave}
        categories={categories}
        report={selectedReport}
        onClose={closeForm}
        onSend={sendTokenReportByEmail}
        onSave={saveReport}
        onSaveStudy={handleSaveStudy}
        onSavePatient={handleSavePatient} />}
    </Card>
  );
};

export default ClinicalResultsTable;
