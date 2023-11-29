// ClinicalResultForm.jsx
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Button, TextInput, DatePicker } from '@tremor/react';
import CustomModal from '../controls/CustomModal';
import TableCellButtonIcon from '../controls/TableCellButtonIcon';
import { PencilIcon } from '@heroicons/react/outline';
import PatientForm from './PatientForm';
import StatusSelect from '../controls/StatusSelect';
import StudieCard from '../controls/StudieCard';

const ClinicalResultForm = ({ report, categories, onClose, onSave, onSavePatient, onSend }) => {
  const [isPatientEditorOpen, setPatientEditorOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  useEffect(() => {
    setEditedReport(report || {
      id: '',
      date: new Date(),
      name: '',
      status: '',
      patient: {
        name: '',
        email: '',
      },
    });
  }, [report]);

  const [editedReport, setEditedReport] = useState(report || {
    id: '',
    date: new Date(),
    name: '',
    status: '',
    patient: {
      name: '',
      email: '',
    },
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
        title={report ? 'Resultados Clinicos' : 'Nuevo Reporte'}
        visible={true}
        onClose={onClose}
        widthPercentage="80"
        titleClassName="text-blue-500"
        modalClassName="p-8"
        footerElement={
          <div className="flex justify-end">
            <Button variant="light" className="ml-3" onClose={onClose} onClick={() => onSave(editedReport)}>
              Guardar
            </Button>

            <Button variant="secondary" className="ml-3" onClose={onClose} onClick={() => onSend(editedReport)}>
              Enviar al cliente
            </Button>
            
            <Button type="primary"  className="ml-3" onClick={() => onSend(editedReport)}>
              Guardar
            </Button>
          </div>
        }
      >
        <form>
          <div className="flex">
            <div className="flex-1 flex">
              <div className="flex-1 pr-3">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Folio / ID</label>
                  <TextInput
                    type="text"
                    name="id"
                    disabled={true}
                    value={editedReport.id}
                    onChange={(e) => setEditedReport({ ...editedReport, id: e.target.value })}
                    className="mt-1 border rounded-md"
                  />
                </div>
              </div>
              <div className="flex-1 pr-3">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Fecha</label>
                  <DatePicker
                    name="date"
                    value={new Date(editedReport.date)}
                    enableClear={false}
                    onValueChange={(e) => setEditedReport({ ...editedReport, date: e })}
                    className="mt-1 rounded-md"
                  />
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="mb-4 w-48">
                <label className="block text-sm font-medium mb-1 text-gray-700">Status</label>
                <StatusSelect
                  value={editedReport.status}
                  onValueChange={(value) => setEditedReport({ ...editedReport, status: value })}
                />
              </div>
            </div>
          </div>
          <div className='flex'>
            <div className="flex-1 mb-4">
              <label className="block text-sm font-medium text-gray-700">Nombre</label>
              <div className="flex">
                <TextInput
                  type="text"
                  name="name"
                  readOnly={true}
                  value={editedReport.patient.name}
                  onChange={(e) => setEditedReport({ ...editedReport, name: e.target.value })}
                  className="mt-1 border rounded-md flex-1"
                />
                <TableCellButtonIcon text={"Editar"} icon={<PencilIcon className="w-6 h-6" />} onClick={() => editPatient(editedReport.patient)} />
              </div>
            </div>
            <div className="flex-1 pr-3">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Folio / ID</label>
                <TextInput
                  type="text"
                  name="id"
                  disabled={true}
                  value={editedReport.id}
                  onChange={(e) => setEditedReport({ ...editedReport, id: e.target.value })}
                  className="mt-1 border rounded-md"
                />
              </div>
            </div>
          </div>
          <div className="mb-4 max-w-full ml-3">
            <label className="block text-sm font-medium text-gray-700">Estudios</label>
            <Slider {...sliderSettings}>
              {editedReport.studies?.map((study) => (
                <div key={study.id}>
                  <StudieCard
                    studyName={study.name}
                    category={study.category.name}
                    dateCreated={study.createdAt}
                    fileLink={study.fileLink}
                  />
                </div>
              ))}
            </Slider>
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

export default ClinicalResultForm;
