import React, { useState } from 'react';
import { Button, TextInput, DatePicker } from '@tremor/react';
import CustomModal from '../controls/CustomModal';
import { Select, SelectItem } from "@tremor/react";
import { SearchSelect, SearchSelectItem } from "@tremor/react";
import TableCellButtonIcon from '../controls/TableCellButtonIcon';
import { PencilIcon } from '@heroicons/react/outline';
import PatientForm from './PatientForm';


const ReportForm = ({ report, onClose, onSave }) => {
  const [isPatientEditorOpen, setPatientEditorOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Set initial state based on whether report is null
  const initialEditedReport = report || {
    id: '',
    date: new Date(),
    name: '',
    status: '',
  };

  const [editedReport, setEditedReport] = useState(initialEditedReport);

  const editPatient = (patient) => {
    setSelectedPatient(patient);
    setPatientEditorOpen(true);
  };

  const closePatientEditor = () => {
    setPatientEditorOpen(false);
  };

  const handlePatientSave = (editedPatientData) => {
    // Send a request to update the patient data on the server
    // You can use fetch or another HTTP client library here

    // After successfully saving, close the patient editor modal
    closePatientEditor();
  };

  return (
    <>
      <CustomModal
        title={report ? 'Administrar Reporte' : 'Nuevo Reporte'}
        visible={!!report}
        onClose={onClose}
        widthPercentage="80"
        titleClassName="text-blue-500"
        modalClassName="p-8"
        footerElement={
          <div className="flex">
            <Button type="primary" className='ml-auto' onClose={onClose} onClick={() => onSave(editedReport)}>
              Guardar
            </Button>

            <Button type="primary" className='ml-auto' onClose={onClose} onClick={() => onSave(editedReport)}>
              Enviar al cliente
            </Button>
          </div>}
      >
        <form>
          <div className="flex">
            <div className="flex-1 pr-3">
              <div className="mb-4">
                <label>ID</label>
                <TextInput
                  type="text"
                  name="id"
                  disabled={true}
                  value={editedReport.id}
                  onChange={(e) => setEditedReport({ ...editedReport, id: e.target.value })}
                />
              </div>
            </div>
            <div className="flex-1 pr-3">
              <div className="mb-4">
                <label>Fecha</label>
                <DatePicker
                  name="date"
                  value={new Date(editedReport.date)}
                  onValueChange={(e) => setEditedReport({ ...editedReport, date: e })}
                />
              </div>
            </div>

            <div className="flex-1">
              <div className="mb-4">
                <label>Status</label>
                <Select
                  value={editedReport.status}
                  onValueChange={(value) => setEditedReport({ ...editedReport, status: value })}
                >
                  <SelectItem value="Pendiente">Pendiente</SelectItem>
                  <SelectItem value="Enviando">Enviando</SelectItem>
                  <SelectItem value="No entregado">No entregado</SelectItem>
                  <SelectItem value="Activo">Activo</SelectItem>
                </Select>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label>Paciente</label>
            <div className='flex'>
              <TextInput
                type="text"
                name="name"
                readOnly={true}
                value={editedReport.patient.name}
                onChange={(e) => setEditedReport({ ...editedReport, name: e.target.value })}
              />
              <TableCellButtonIcon text={"Editar"} icon={<PencilIcon className="w-6 h-6" />} onClick={() => editPatient(editedReport.patient)} />
            </div>
          </div>
          <div className="mb-4">
            <label>Categoria</label>
            <SearchSelect
              value={editedReport.category}
              onValueChange={(value) => setEditedReport({ ...editedReport, category: value })}
            >
              <SearchSelectItem value="Hematología">Hematología</SearchSelectItem>
              <SearchSelectItem value="Química sanguínea">Química sanguínea</SearchSelectItem>
              {/* Agrega más categorías aquí */}
            </SearchSelect>
          </div>
          <div className="mb-4">
            <label>Estudio</label>
            <TextInput
              type="text"
              name="name"
              value={editedReport.name}
              onChange={(e) => setEditedReport({ ...editedReport, name: e.target.value })}
            />
          </div>
        </form>
      </CustomModal>
      {/* Patient Editor Modal */}
      {isPatientEditorOpen && (
        <PatientForm
          patient={selectedPatient}
          onClose={closePatientEditor}
          onSave={handlePatientSave} // Implement this function
        />
      )}
    </>
  );
};

export default ReportForm;
