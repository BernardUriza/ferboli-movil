import React, { useState } from 'react';
import { Button, TextInput, DatePicker, SearchSelect, SearchSelectItem } from '@tremor/react';
import CustomModal from '../controls/CustomModal/CustomModal';
import StudieCard from '../controls/StudieCard';
import esLocale from 'date-fns/locale/es';
import { HiDocumentArrowUp } from 'react-icons/hi2';
import { useEdgeStore } from '../lib/edgestore';
import { useLoading } from '../providers/LoadingContext';

function isValidUrl(url) {
    try {
        new URL(url);
        return url;
    } catch (error) {
        return false;
    }
}

const StudyForm = ({ study, onClose, onSave, categories, disabledSave }) => {
    const { edgestore } = useEdgeStore();
    const { showLoading, hideLoading, showLoadingWithProgress } = useLoading();

    const initialEditedStudy = study || {
        id: '',
        name: '',
        categoryId: '',
        medicalReportId: '',
        medicalReport: {},
        type: {
            category: {}
        },
        createdAt: new Date(),
    };


    const CONST_SeleccionaUnDocumentoPDF = "Selecciona un documento PDF";
    const CONST_HazClickParaVerPDF = "Haz click para ver el documento PDF";

    const [editedStudy, setEditedStudy] = useState(initialEditedStudy);
    const [fileUploaded, setFileUploaded] = useState(isValidUrl(editedStudy.name)); const [fileMessage, setFileMessage] = useState(isValidUrl(editedStudy.name) ? CONST_HazClickParaVerPDF : CONST_SeleccionaUnDocumentoPDF);
    const [selectedCategory, setSelectedCategory] = useState(categories.find((category) => category.id === editedStudy.type.category.id) ?? {});
    const [selectedType, setSelectedType] = useState(null);
    const fileInputRef = React.createRef();

    const openFileSelector = () => {
        fileInputRef.current.click();
    };

    const isSaveEnabled = selectedCategory.id && selectedType && fileUploaded && !disabledSave;

    return (
        <CustomModal
            title={study ? 'Estudio' : 'Nuevo Estudio'}
            visible={true}
            onClose={onClose}
            widthPercentage="20"
            titleClassName="text-blue-500"
            modalClassName="p-8"
            footerElement={
                <div className="flex">
                    <Button type="primary" className='ml-auto' disabled={!isSaveEnabled} onClick={async (e) => {
                        e.preventDefault();
                        onSave(editedStudy);
                    }}>
                        Guardar
                    </Button>
                </div>}
        >
            <form>
                <div className={"mb-4 " + (study ? '' : 'hidden')}>
                    <label>ID</label>
                    <TextInput
                        type="text"
                        name="id"
                        disabled={true}
                        value={editedStudy.id}
                    />
                </div>

                <div className={"mb-4 " + (study ? '' : 'hidden')}>
                    <label>Fecha</label>
                    <DatePicker
                        name="createdAt"
                        disabled={true}
                        value={new Date(editedStudy.createdAt)}
                        locale={esLocale}
                    />
                </div>

                <div className="mb-4">
                    <label>Categoria{!selectedCategory.id && <span style={{ color: 'red' }}>*</span>}</label>
                    <SearchSelect
                        value={selectedCategory.id}
                        onValueChange={(value) => {
                            const category = categories.find((category) => category.id === value);
                            setSelectedCategory(category);
                            setSelectedType(null); // Reset type selection when category changes
                            setEditedStudy({ ...editedStudy, type: { category: category } });
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
                    <label>Nombre (Tipo){!selectedType && <span style={{ color: 'red' }}>*</span>}</label>
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
                        clickFileLink={isValidUrl(editedStudy.name)}
                    />
                </div>

                <label htmlFor="fileInput" className="sr-only">File Input</label>
                <input
                    id="fileInput"
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={async (e) => {
                        var file = (e.target.files?.[0]);
                        if (file) {
                            showLoading();
                            const res = await edgestore.publicFiles.upload({
                                file,
                                onProgressChange: (progress) => {
                                    showLoadingWithProgress(progress);
                                }
                            });
                            hideLoading();
                            editedStudy.name = res.url;
                            setFileUploaded(true);
                        }
                    }}
                />

                <Button onClick={async (e) => {
                    e.preventDefault();
                    openFileSelector();
                }} style={{ width: "100%" }}>
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
