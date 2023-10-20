import React, { useState } from 'react';
import { Button, TextInput, DatePicker } from '@tremor/react';
import CustomModal from '../controls/CustomModal';
import { Select, SelectItem } from "@tremor/react";


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
      <form>
        <div className="flex">
          <div className="w-1/2 pr-3">
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
          <div className="w-1/2">
            <div className="mb-4">
              <label>Fecha</label>
              <DatePicker
                name="date"
                value={new Date(editedReport.date)}
                onValueChange={(e) => setEditedReport({ ...editedReport, date: e })}
              />
            </div>
          </div>
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
      </form>

      <Button type="primary" className='ml-auto' onClose={onClose} onClick={() => onSave(editedReport)}>
        Guardar
      </Button>
    </CustomModal>
  );
};

export default ReportForm;
