import React, { useState } from 'react';
import { Button, TextInput, DatePicker } from '@tremor/react';
import CustomModal from '../controls/CustomModal';
import { Select, SelectItem } from "@tremor/react";
import { BanIcon, CheckCircleIcon } from "@heroicons/react/outline";

const CategoryForm = ({ category, onClose, onSave }) => {
    // Set initial state based on whether category is null
    const initialEditedCategory = category || {
        id: '',
        name: '',
        email: '',
        phone: '',
        information: '',
        dateOfBirth: new Date(),
        gender: '',
        status: '',
    };

    const [editedCategory, setEditedCategory] = useState(initialEditedCategory);

    return (
        <CustomModal
            title={category ? 'Administrar Categoría' : 'Nueva Categoría'}
            visible={!!category}
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
                                value={editedCategory.id}
                                onChange={(e) => setEditedCategory({ ...editedCategory, id: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="w-1/2 mb-4">
                        <label>Status</label>
                        <Select
                            value={editedCategory.status}
                            onValueChange={(value) => setEditedCategory({ ...editedCategory, status: value })}
                        >
                            <SelectItem value="Activo" icon={CheckCircleIcon}>Activo</SelectItem>
                            <SelectItem value="Archivado" icon={BanIcon}>Archivado</SelectItem>
                        </Select>
                    </div>
                </div>
                <div className="mb-4">
                    <label>Nombre</label>
                    <TextInput
                        type="text"
                        name="name"
                        value={editedCategory.name}
                        onChange={(e) => setEditedCategory({ ...editedCategory, name: e.target.value })}
                    />
                </div>
                <div className="mb-4">
                    <label>Correo Electrónico</label>
                    <TextInput
                        type="email"
                        name="email"
                        value={editedCategory.email}
                        onChange={(e) => setEditedCategory({ ...editedCategory, email: e.target.value })}
                    />
                </div>
                <div className="mb-4">
                    <label>Teléfono</label>
                    <TextInput
                        type="tel"
                        name="phone"
                        value={editedCategory.phone}
                        onChange={(e) => setEditedCategory({ ...editedCategory, phone: e.target.value })}
                    />
                </div>
                <div className="mb-4">
                    <label>Información</label>
                    <TextInput
                        type="text"
                        name="information"
                        value={editedCategory.information}
                        onChange={(e) => setEditedCategory({ ...editedCategory, information: e.target.value })}
                    />
                </div>
                <div className="mb-4">
                    <label>Fecha de Nacimiento</label>
                    <DatePicker
                        name="dateOfBirth"
                        value={new Date(editedCategory.dateOfBirth)}
                        onValueChange={(e) => setEditedCategory({ ...editedCategory, dateOfBirth: e })}
                    />
                </div>
                <div className="mb-4">
                    <label>Género</label>
                    <Select
                        value={editedCategory.gender}
                        onValueChange={(value) => setEditedCategory({ ...editedCategory, gender: value })}
                    >
                        <SelectItem value="Male">Masculino</SelectItem>
                        <SelectItem value="Female">Femenino</SelectItem>
                        <SelectItem value="Other">Otro</SelectItem>
                    </Select>
                </div>
            </form>
            <div className="flex">
                <Button type="primary" className='ml-auto' onClick={() => onSave(editedCategory)}>
                    Guardar
                </Button>
            </div>
        </CustomModal>
    );
};

export default CategoryForm;
