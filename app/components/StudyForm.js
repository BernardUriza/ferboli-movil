import React, { useState } from 'react';
import { Button, TextInput, DatePicker, SearchSelect, SearchSelectItem } from '@tremor/react';
import CustomModal from '../controls/CustomModal';
import { Select, SelectItem } from "@tremor/react";
import { BanIcon, CheckCircleIcon } from "@heroicons/react/outline";
import StudieCard from '../controls/StudieCard';
import { DocumentAddIcon } from '@heroicons/react/solid';
import { HiDocumentArrowUp } from 'react-icons/hi2';
import { useEdgeStore } from '../lib/edgestore';

const StudyForm = ({ study, onClose, onSave, categories }) => {
    const { edgestore } = useEdgeStore();
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

    const CONST_SeleccionaUnDocumentoPDF = "Selecciona un documento PDF";
    const CONST_HazClickParaVerPDF = "Haz click para ver el documento PDF";

    const [editedStudy, setEditedStudy] = useState(initialEditedStudy);
    const [fileMessage, setFileMessage] = useState(CONST_SeleccionaUnDocumentoPDF);
    const [selectedCategory, setSelectedCategory] = useState(categories.find((category) => category.id === study.type.category.id));    
    const fileInputRef = React.createRef(); // Create a ref for the file input

    const openFileSelector = () => {
        // Trigger the click event on the hidden file input
        fileInputRef.current.click();
    };

    return (
        <CustomModal
            title={study ? 'Estudio' : 'Nuevo Estudio'}
            visible={!!study}
            onClose={onClose}
            widthPercentage="20"
            titleClassName="text-blue-500"
            modalClassName="p-8"
            footerElement={
                <div className="flex">
                    <Button type="primary" className='ml-auto' onClick={async (e) => {
                        e.preventDefault();
                        onSave(editedStudy)
                    }}>
                        Guardar
                    </Button>
                </div>}
        >
            <form>
                <div className="mb-4">
                    <label>ID</label>
                    <TextInput
                        type="text"
                        name="id"
                        disabled={true}
                        value={editedStudy.id}
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
                        value={selectedCategory.id} 
                        onValueChange={(value) => {
                            setSelectedCategory(categories.find((category) => category.id === value));
                        }}
                    >
                        {categories.map((category) => (
                            <SearchSelectItem key={category.id} value={category.id}>
                                {category.name}
                            </SearchSelectItem>
                        ))}
                    </SearchSelect>
                </div>

                <div className="mb-4">
                    <label>Nombre (Tipo)</label>
                    <SearchSelect
                        value={editedStudy.type.id} 
                        onValueChange={(value) => {
                            // Busca la categoría con el ID coincidente
                            const selectedType = selectedCategory.studyTypes.find((type) => type.id === value);
                            if (selectedType) {
                                // Actualiza el objeto de categoría en editedReport
                                setEditedStudy({ ...editedStudy, type: selectedType });
                            }
                        }}
                    >
                        {selectedCategory.studyTypes?.map((category) => (
                            <SearchSelectItem key={category.id} value={category.id}>
                                {category.name}
                            </SearchSelectItem>
                        ))}
                    </SearchSelect>
                </div>
                <div className="mb-4">
                    <StudieCard
                        empty={fileMessage}
                    />
                </div>

                {/* Add a label to visually hide the file input */}
                <label htmlFor="fileInput" className="sr-only">File Input</label>
                <input
                    id="fileInput"
                    type="file"
                    ref={fileInputRef} // Connect the ref to the file input
                    className="hidden"
                    onChange={async (e) => {
                        var file = (e.target.files?.[0]);
                        if (file) {
                            const res = await edgestore.publicFiles.upload({
                                file,
                                onProgressChange: (progress) => {
                                    // you can use this to show a progress bar
                                    console.log(progress);
                                },
                            });
                            // you can run some server action or api here
                            // to add the necessary data to your database
                            console.log(res);
                            editedStudy.name = res.url;
                            setFileMessage(CONST_HazClickParaVerPDF);
                        }
                    }}
                />

                {/* "Nuevo resultado clínico" button to trigger file selection */}
                <Button onClick={async (e) => {
                    e.preventDefault(); 
                    openFileSelector();
                }
                } style={{ width: "100%" }}>
                    <div className='flex' style={{ height: "52px" }}>
                        <HiDocumentArrowUp style={{ width: "20px", height: "20px", marginTop: "15px" }}></HiDocumentArrowUp>
                        <span className='mx-3 my-auto' style={{ fontSize: "17px" }}>Subir resultado clínico</span>
                    </div>
                </Button>
            </form>
        </CustomModal>
    );
};

export default StudyForm;
