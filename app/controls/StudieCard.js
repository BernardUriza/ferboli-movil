// StudieCard.js
import React from 'react';
import { format } from 'date-fns';
import { DocumentAddIcon, DocumentTextIcon } from '@heroicons/react/outline';
// Add this function outside of the StudieCard component

const StudieCard = ({ clickFileLink, studieData, newCard, empty, openNewStudyForm }) => {
  if (newCard) {
    return (
      <div className="rounded-lg p-4 shadow-md mb-3 mr-3" style={{ height: '110px' }} key={999999999999}>
        <p className="text-lg font-semibold flex items-center justify-center h-full">
          <a href={clickFileLink} onClick={openNewStudyForm} rel="noopener noreferrer" className='text-green-500 flex' >
            <div className="bg-green-100 items-center justify-center rounded-full p-2 mr-2">
              <DocumentAddIcon className="w-6 h-6" />
            </div>
            <div className='p-2'>Agregar Estudio</div>
          </a>
        </p>
      </div>
    );
  }
  if (empty) {
    return (
      <div className="rounded-lg p-4 shadow-md mb-3 mr-3" style={{ height: '110px' }}>
        <p className="text-sm flex items-center justify-center h-full">
          <a href={clickFileLink} target='_blank' onClick={openNewStudyForm} rel="noopener noreferrer" className='text-green-500 flex' >
            <div className="bg-green-100 h-10 items-center justify-center rounded-full p-2 mt-2 mr-2">
              <DocumentAddIcon className="w-6 h-6" />
            </div>
            <div className='p-2'>
              <div className='font-bold'>Resultados de estudio</div>
              <div>{empty}</div>              
            </div>
          </a>
        </p>
      </div>
    );
  }

  var {  type, createdAt } = studieData;
  var { category, name } = type;

  // Formatea la fecha
  const formattedDate = format(new Date(createdAt), 'dd MMMM yyyy');

  return (
    <div className="bg-white rounded-lg p-4 shadow-md mb-3 mr-3" key={studieData.id} style={{ height: '110px' }}>
      <div className="flex justify-between items-center mb-2">
        <div>
          <div style={{ height: '40px' }}>
            <p className="text-gray-600 text-sm">{category.name}</p>
          </div>
          <p className="text-lg font-bold">{name}</p>
          <p className="text-gray-600 text-sm">Fecha: {formattedDate}</p>
        </div>
          <a href={"/"} onClick={(e)=>{            
              e.preventDefault();
              clickFileLink(studieData);
          }} rel="noopener noreferrer" className="text-green-500 text-sm">
            <div className="bg-green-100 items-center justify-center rounded-full p-2 mx-auto" style={{width: "40px"}}>
              <DocumentTextIcon className="w-6 h-6" />
            </div>
            Ver documento
          </a>
      </div>
    </div>
  );
};

export default StudieCard;
