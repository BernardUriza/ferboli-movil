import React, { useState, useEffect } from 'react';
import { Button, TextInput, DatePicker } from '@tremor/react';
import CustomModal from '../controls/CustomModal';
import { SearchSelect, SearchSelectItem } from '@tremor/react';
import TableCellButtonIcon from '../controls/TableCellButtonIcon';
import { PencilIcon } from '@heroicons/react/outline';
import PatientForm from './PatientForm';
import StatusSelect from '../controls/StatusSelect';
import StudieCard from '../controls/StudieCard'; // Import StudieCard component

const ReportForm = ({ report, categories, onClose, onSave, onSavePatient, onSend }) => {
  const [isPatientEditorOpen, setPatientEditorOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    setEditedReport(report || {
      id: '',
      date: new Date(),
      name: '',
      status: '',
      patient: {
        name: '',
        email: ''
      }
    });
  }, [report]);

  const [editedReport, setEditedReport] = useState(report || {
    id: '',
    date: new Date(),
    name: '',
    status: '',
    patient: {
      name: '',
      email: ''
    }
  });

  const editPatient = (patient) => {
    setSelectedPatient(patient);
    setPatientEditorOpen(true);
  };

  const closePatientEditor = () => {
    setPatientEditorOpen(false);
  };

  const handlePatientSave = (editedPatientData) => {
    onSavePatient(editedPatientData);
    closePatientEditor();
  };

  return (
    <>
      <CustomModal
        title={report ? 'Administrar Reporte' : 'Nuevo Reporte'}
        visible={true}
        onClose={onClose}
        widthPercentage="80"
        titleClassName="text-blue-500"
        modalClassName="p-8"
        footerElement={
          <div className="flex">
            <Button type="primary" className="ml-auto" onClose={onClose} onClick={() => onSave(editedReport)}>
              Guardar
            </Button>

            <Button type="primary" className="ml-auto" onClose={onClose} onClick={() => onSend(editedReport)}>
              Enviar al cliente
            </Button>
          </div>
        }
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
                  enableClear={false}
                  onValueChange={(e) => setEditedReport({ ...editedReport, date: e })}
                />
              </div>
            </div>

            <div className="flex-1">
              <div className="mb-4">
                <label>Status</label>
                <StatusSelect
                  value={editedReport.status}
                  onValueChange={(value) => setEditedReport({ ...editedReport, status: value })}
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label>Paciente</label>
            <div className="flex">
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
          {/* Contenedor para tarjetas de estudios */}
          <div className="mb-4">
            <label>Estudios</label>
            <div className="max-h-[20vh] flex flex-wrap">
              {editedReport.studies.map((study) => (
                <div className="max-w-[200px] p-2" key={study.id}>
                  <StudieCard
                    category={study.category.name}
                    dateCreated={study.createdAt}
                    fileLink={study.fileLink}
                  />
                </div>
              ))}
            </div>
          </div>
        </form>
      </CustomModal>
      {isPatientEditorOpen && (
        <PatientForm
          patient={selectedPatient}
          onClose={closePatientEditor}
          onSave={handlePatientSave}
        />
      )}
    </>
  );
};

export default ReportForm;
