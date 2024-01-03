import React from "react";
import { Card } from '@tremor/react';
import { DocumentTextIcon } from '@heroicons/react/outline';

export const CardEstudio = (props) => {
  return (
    <Card>
      <div className="div-2 flex gap-2 items-center relative w-full">
        <div className="div-3 flex flex-col flex-1 gap-2 justify-center relative">
          <div className="text-wrapper-3 text-tremor-content-DEFAULT text-sm leading-5">
            {props.tipoEstudio}
          </div>
          <div className="text-wrapper-4 text-tremor-content-strong text-base leading-6">
            {props.nombreEstudio}
          </div>
          <div className="text-wrapper-5 text-tremor-content-DEFAULT text-xs leading-5">
            {props.fechaEstudio}
          </div>
        </div>
        <div className="div-4 inline-flex flex-col gap-2 items-center relative">
          <div className="bg-green-100 text-green-500 items-center justify-center rounded-full p-2 mx-auto" style={{width: "35px"}}>
              <DocumentTextIcon className="w-5 h-5" />
            </div>
          <div className="text-wrapper-6 text-green-500 font-semibold text-xs leading-6">
            {props.verDocumento}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CardEstudio;
