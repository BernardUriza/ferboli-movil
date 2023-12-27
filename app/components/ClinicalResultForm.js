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
import CustomStatus from '../controls/CustomStatus';
import StudieCard from '../controls/StudieCard';
import StudyForm from './StudyForm';
import toast from 'react-hot-toast';

const ClinicalResultForm = ({ refresh, report, categories, onClose, onSave, onSaveStudy, onSavePatient, onSend, disableSave }) => {
  const [isPatientEditorOpen, setPatientEditorOpen] = useState(false);
  const [isStudyFormOpen, setStudyFormOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedStudy, setSelectedStudy] = useState(null);
  const [disableSavePatient, setDisableSavePatient] = useState(false);
  const [disableSaveStudy, setDisableSaveStudy] = useState(false);
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
  };

  useEffect(() => {
    setEditedReport(report || getDefaultReport());
  }, [report]);

  const getDefaultReport = () => {
    const parseISODate = (isoDateString) => isoDateString ? new Date(isoDateString) : new Date();

    return {
      id: report?.id ?? '-1',
      date: parseISODate(report?.date),
      name: report?.name ?? '',
      status: report?.status ?? 'Pendiente',
      patient: {
        name: report?.patient?.name ?? '',
        email: report?.patient?.email ?? '',
        phone: '33',
        information: 'information',
        dateOfBirth: parseISODate(report?.patient?.dateOfBirth),
        gender: report?.patient?.gender ?? 'NA',
        status: report?.patient?.status ?? 'Activo',
      },
      studies: report?.studies ?? [],
    };
  };

  const [editedReport, setEditedReport] = useState(getDefaultReport());

  debugger

  const editPatient = (patient) => {
    setSelectedPatient(patient);
    setPatientEditorOpen(true);
  };

  const closePatientEditor = () => {
    setPatientEditorOpen(false);
  };

  const handlePatientSave = async (editedPatientData) => {
    setDisableSavePatient(true);
    try {
      await onSavePatient(editedPatientData);
      setDisableSavePatient(false);
      setPatientEditorOpen(false);
      toast.success(`Cambios guardados con éxito, paciente ${editedPatientData.name} modificado.`);
    } catch (err) {
      setDisableSavePatient(false);
      toast.error(`Error ha sucedido: ${err.toString()}`);
    }
  };

  const clickToOpenStudyForm = (selectedStudie) => {
    setSelectedStudy(selectedStudie);
    setStudyFormOpen(true);
  };

  const closeStudyForm = () => {
    setStudyFormOpen(false);
  };

  const handleStudySave = async (editedStudy) => {
    try {
      if (editedReport.id > 0) {
        editedStudy.medicalReportId = editedReport.id;
        setDisableSaveStudy(true);
        await onSaveStudy(editedStudy);
        setDisableSaveStudy(false);
        setStudyFormOpen(false);
        toast.success('Cambios guardados con éxito, estudio modificado.');
      } else {
        setEditedReport((prevReport) => ({
          ...prevReport,
          studies: [...prevReport.studies, editedStudy],
        }));
        setDisableSaveStudy(false);
        setStudyFormOpen(false);
        toast.success('Cambios guardados con éxito, estudio modificado.');
      }
    } catch (err) {
      setDisableSaveStudy(false);
      toast.error(`Error ha sucedido: ${err.toString()}`);
    }
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
            <Button variant="light" className="ml-3" onClose={onClose} onClick={onClose}>
              Cancelar
            </Button>

            <Button variant="secondary" className="ml-3" onClose={onClose} onClick={() => onSend(editedReport)}>
              Enviar al cliente
            </Button>

            <Button disabled={disableSave} type="primary" className="ml-3" onClick={() => onSave(editedReport)}>
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
                    placeholder="ID"
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
                <CustomStatus status={editedReport.status} />
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="flex-1 mb-4">
              <label className="block text-sm font-medium text-gray-700">Nombre</label>
              <div className="flex">
                <TextInput
                  type="text"
                  name="name"
                  readOnly={!!report}
                  placeholder="Escribe el nombre del paciente."
                  value={editedReport.patient.name}
                  onValueChange={(value) => setEditedReport({ ...editedReport, patient: { ...editedReport.patient, name: value } })}
                  className="mt-1 border rounded-md flex-1"
                />
                <TableCellButtonIcon visible={report} text="Editar" icon={<PencilIcon className="w-6 h-6" />} onClick={() => editPatient(editedReport.patient)} />
              </div>
            </div>
            <div className="flex-1">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <TextInput
                  type="text"
                  name="id"
                  readOnly={!!report}
                  placeholder="Escribe el mail del paciente."
                  value={editedReport.patient.email}
                  onValueChange={(value) => setEditedReport({ ...editedReport, patient: { ...editedReport.patient, email: value } })}
                  className="mt-1 border rounded-md"
                />
              </div>
            </div>
          </div>
          <div className="mb-4 max-w-full ml-3">
            <label className="block text-sm font-medium text-gray-700">Estudios</label>
            <Slider {...sliderSettings}>
              {editedReport.studies.map((study, index) => (
                <StudieCard key={index} clickFileLink={clickToOpenStudyForm} studieData={study} />
              ))}
              <StudieCard
                newCard={true}
                openNewStudyForm={(e) => {
                  e.preventDefault();
                  clickToOpenStudyForm(null);
                }}
              />
            </Slider>
          </div>
        </form>
      </CustomModal>
      {isPatientEditorOpen && (
        <PatientForm
          patient={selectedPatient}
          onClose={closePatientEditor}
          onSave={handlePatientSave}
          disableSave={disableSavePatient}
        />
      )}
      {isStudyFormOpen && (
        <StudyForm
          categories={categories}
          study={selectedStudy}
          onClose={closeStudyForm}
          onSave={handleStudySave}
          disabledSave={disableSaveStudy}
        />
      )}
    </>
  );
};

export default ClinicalResultForm;
