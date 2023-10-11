import React, { useState } from 'react';
import { Button, TextInput } from '@tremor/react';
import CustomModal from '../controls/CustomModal'; 

const ReportForm = ({ report, onClose, onSave }) => {
  const [editedReport, setEditedReport] = useState({});

  return (
    <CustomModal title={report ? 'Edit Report' : 'New Report'} visible={!!report} onClose={onClose}>
      <form>
        {/* Add form fields with Tremor components */}
        <div className="mb-4">
          <label>ID</label>
          <TextInput
            type="text"
            name="id"
            value={editedReport.id}
            onChange={(e) => setEditedReport({ ...editedReport, id: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label>Fecha</label>
          <TextInput
            type="text"
            name="date"
            value={editedReport.date}
            onChange={(e) => setEditedReport({ ...editedReport, date: e.target.value })}
          />
        </div>
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
        {/* Add more fields here */}
        <Button type="primary" onClose={onClose} onClick={() => onSave(editedReport)}>
          Save
        </Button>
      </form>
    </CustomModal>
  );
};

export default ReportForm;
