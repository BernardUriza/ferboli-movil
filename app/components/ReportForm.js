import React, { useState } from 'react';
import { Button, TextInput, DatePicker } from '@tremor/react';
import CustomModal from '../controls/CustomModal';

const ReportForm = ({ report, onClose, onSave }) => {
  // Set initial state based on whether report is null
  const initialEditedReport = report || {
    id: '',
    date: new Date(),
    name: '',
    status: '',
  };

  const [editedReport, setEditedReport] = useState(initialEditedReport);

  return (
    <CustomModal
      title={report ? 'Administrar Reporte' : 'Nuevo Reporte'}
      visible={!!report}
      onClose={onClose}
      widthPercentage="1/2"
      titleClassName="text-blue-500"
      modalClassName="p-8"
    >
      <form className="flex">
        {/* First Column */}
        <div className="w-1/2 p-4">
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
          <div className="mb-4">
            <label>Fecha</label>
            <DatePicker
              name="date"
              value={new Date(editedReport.date)}
              onChange={(e) => setEditedReport({ ...editedReport, date: e.target.value })}
            />
          </div>
        </div>

        {/* Second Column */}
        <div className="w-1/2 p-4">
          <div className="mb-4">
            <label>Nombre</label>
            <TextInput
              type="text"
              name="name"
              value={editedReport.name}
              onChange={(e) => setEditedReport({ ...editedReport, name: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label>Status</label>
            <TextInput
              type="text"
              name="status"
              value={editedReport.status}
              onChange={(e) => setEditedReport({ ...editedReport, status: e.target.value })}
            />
          </div>
        </div>
      </form>

      <Button type="primary" onClose={onClose} onClick={() => onSave(editedReport)}>
        Guardar
      </Button>
    </CustomModal>
  );
};

export default ReportForm;
