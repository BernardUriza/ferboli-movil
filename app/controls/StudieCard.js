// StudieCard.js
import React from 'react';
import { DocumentTextIcon } from '@heroicons/react/outline';

const StudieCard = ({ category, studyName, date, fileLink }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md mb-3 mr-3">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h3 className="text-lg font-semibold mb-1">{category}</h3>
          <p className="text-gray-600 text-sm">{studyName}</p>
        </div>
        <div className="text-blue-500 text-sm">
          <a href={fileLink} target="_blank" rel="noopener noreferrer">
            <DocumentTextIcon className="w-6 h-6" />
          </a>
        </div>
      </div>
      <p className="text-gray-600 text-sm mb-2">Fecha: {date}</p>
      <a href={fileLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm">
        Ver documento
      </a>
    </div>
  );
};

export default StudieCard;