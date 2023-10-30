import React from 'react';

const StudieCard = ({ category, dateCreated, fileLink }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md mb-4">
      <h3 className="text-lg font-semibold mb-2">{category}</h3>
      <p className="text-gray-600 text-sm mb-2">Date Created: {dateCreated}</p>
      <a href={fileLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm">
        View File
      </a>
    </div>
  );
};

export default StudieCard;
