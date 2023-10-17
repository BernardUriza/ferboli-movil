import React from 'react';
import { Button } from "@tremor/react";

const Pagination = ({
  pageNumber,
  setPageNumber,
  totalPageCount,
}) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPageCount; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers.map((number) => (
      <button
        key={number}
        onClick={() => setPageNumber(number)}
        className={`mx-1 px-3 py-1 ${number === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-blue-500 hover:text-white'}`}
      >
        {number}
      </button>
    ));
  };

  return (
    <div className="flex justify-between border-t border-solid border-t-1 border-t-gray-300 p-3">
      <Button
        onClick={() => setPageNumber(Math.max(pageNumber - 1, 1))}
        disabled={pageNumber === 1}
        className="ml-2"
        variant="secondary"
        color='gray'
      >
        Anterior
      </Button>
      <div>
        {renderPageNumbers()}
      </div>
      <Button
        onClick={() => setPageNumber(Math.min(pageNumber + 1, totalPageCount))}
        disabled={pageNumber === totalPageCount}
        className="mr-2"
        variant="secondary"
        color='gray'
      >
        Siguiente
      </Button>
    </div>
  );
};

export default Pagination;
