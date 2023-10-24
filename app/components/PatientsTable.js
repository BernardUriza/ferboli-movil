import React, { useState, useEffect } from 'react';
import { Card, Title, Badge } from "@tremor/react";
import PatientForm from './PatientForm';
import FilterControls from '../controls/FilterControls';
import Pagination from '../controls/Pagination';
import CoreTable from '../controls/CoreTable';

const PatientsTable = ({ patients, savePatient }) => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [filteredPatients, setFilteredPatients] = useState(patients);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [lengthFiltered, setLengthFiltered] = useState(patients.length);
  const itemsPerPage = 11;

  useEffect(() => {
    setFilteredPatients(patients);
  }, [patients]);

  const openForm = (item) => {
    setSelectedPatient(item);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setSelectedPatient(null);
    setIsFormOpen(false);
  };

  const handleSavePatient = (patient) => {
    if (selectedPatient) {
      setSelectedPatient({
        ...selectedPatient,
        name: patient.name, // Update the patient name
        // Add other properties to update here
      });
    }
    savePatient(patient);
    // Refresh the patient list if needed
  };

  const renderCell = (columnKey, item) => {
    if (columnKey === 'name') {
      return item.name;
    } else if (columnKey === 'email') {
      return item.email;
    } else if (columnKey === 'phone') {
      return item.phone;
    } else if (columnKey === 'dateOfBirth') {
      // Format the dateOfBirth as needed
      return new Date(item.dateOfBirth).toLocaleDateString();
    } else {
      return item[columnKey];
    }
  };

  const columns = [
    { key: 'name', title: 'Nombre', width: '30%' },
    { key: 'email', title: 'Correo Electrónico', width: '20%' },
    { key: 'phone', title: 'Teléfono', width: '15%' },
    { key: 'dateOfBirth', title: 'Fecha de Nacimiento', width: '15%' },
  ];

  return (
    <Card style={{ "padding": "0px" }}>
      <div className="md:flex justify-between items-center p-4">
        <Title className='my-2'>Lista de Pacientes
          <Badge className='mx-3' color="green" size="sm">
            {lengthFiltered} pacientes
          </Badge>
        </Title>
        <FilterControls
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          filterText={filterText}
          setFilterText={setFilterText}
          setIsFormOpen={setIsFormOpen}
        />
      </div>
      <CoreTable
        data={filteredPatients}
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
      {isFormOpen && <PatientForm patient={selectedPatient} onClose={closeForm} onSave={handleSavePatient} />}
    </Card>
  );
};

export default PatientsTable;
