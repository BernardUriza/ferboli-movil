import React, { useState } from 'react';
import { Button, TextInput, DatePicker, SearchSelect, SearchSelectItem } from '@tremor/react';
import CustomModal from '../controls/CustomModal';
import { Select, SelectItem } from "@tremor/react";
import { BanIcon, CheckCircleIcon } from "@heroicons/react/outline";

const StudieForm = ({ study, onClose, onSave, categories }) => {
    // Set initial state based on whether study is null
    const initialEditedStudy = study || {
        id: '',
        name: '',
        categoryId: '',
        medicalReportId: '',
        medicalReport: {},
        category: {},
        createdAt: new Date(),
    };

    const [editedStudy, setEditedStudy] = useState(initialEditedStudy);

    return (
        <CustomModal
            title={study ? 'Estudio' : 'Nuevo Estudio'}
            visible={!!study}
            onClose={onClose}
            widthPercentage="20"
            titleClassName="text-blue-500"
            modalClassName="p-8"
        >
            <form>
                <div className="mb-4">
                    <label>ID</label>
                    <TextInput
                        type="text"
                        name="id"
                        disabled={true}
                        value={editedStudy.id}
                        onChange={(e) => setEditedStudy({ ...editedStudy, id: e.target.value })}
                    />
                </div>

                <div className="mb-4">
                    <label>Fecha</label>
                    <DatePicker
                        name="dateOfBirth"
                        value={new Date(editedStudy.dateOfBirth)}
                        onValueChange={(e) => setEditedStudy({ ...editedStudy, dateOfBirth: e })}
                    />
                </div>

                <div className="mb-4">
                    <label>Categoria</label>
                    <SearchSelect
                        value={editedStudy.category.id} // Debe ser el ID de la categoría, no el nombre
                        onValueChange={(value) => {
                            // Busca la categoría con el ID coincidente
                            const selectedCategory = categories.find((category) => category.id === value);
                            if (selectedCategory) {
                                // Actualiza el objeto de categoría en editedReport
                                setEditedStudy({ ...editedStudy, category: selectedCategory });
                            }
                        }}
                    >
                        {categories.map((category) => (
                            <SearchSelectItem key={category.id} value={category.id}>
                                {category.name}
                            </SearchSelectItem>
                        ))}
                    </SearchSelect>
                </div>
            </form>
            <div className="flex">
                <Button type="primary" className='ml-auto' onClick={() => onSave(editedStudy)}>
                    Guardar
                </Button>
            </div>
        </CustomModal >
    );
};

export default StudieForm;
