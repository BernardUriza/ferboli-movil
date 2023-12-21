import React, { useState } from 'react';
import { Button, TextInput } from '@tremor/react';
import CustomModal from '../controls/CustomModal';

const StudyTypeForm = ({ studyType, onClose, onSave, disableSave }) => {
  // Set initial state based on whether studyType is null
  const initialEditedStudyType = studyType || {
    id: '',
    name: '',
    description: '',
    // Add other properties specific to StudyTypes
  };

  const [editedStudyType, setEditedStudyType] = useState(initialEditedStudyType);

  return (
    <CustomModal
      title={studyType ? 'Administrar Tipo de Estudio' : 'Nuevo Tipo de Estudio'}
      visible={!!studyType}
      onClose={onClose}
      widthPercentage="50"
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
                value={editedStudyType.id}
                onChange={(e) => setEditedStudyType({ ...editedStudyType, id: e.target.value })}
              />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label>Nombre</label>
          <TextInput
            type="text"
            name="name"
            value={editedStudyType.name}
            onChange={(e) => setEditedStudyType({ ...editedStudyType, name: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label>categoria</label>
          <TextInput
            type="text"
            name="description"
            value={editedStudyType.description}
            onChange={(e) => setEditedStudyType({ ...editedStudyType, description: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label>Descripción</label>
          <TextInput
            type="text"
            name="description"
            value={editedStudyType.description}
            onChange={(e) => setEditedStudyType({ ...editedStudyType, description: e.target.value })}
          />
        </div>
        {/* Add other fields specific to StudyTypes */}
      </form>
      <div className="flex">
        <Button type="primary" disabled={disableSave} className="ml-auto" onClick={() => onSave(editedStudyType)}>
          Guardar
        </Button>
      </div>
    </CustomModal>
  );
};

export default StudyTypeForm;
