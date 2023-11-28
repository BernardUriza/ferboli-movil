import React from "react";

export const CardEstudio = (props) => {
  return (
    <div className="card-estudios bg-tremor-background border border-tremor-border rounded-tremor-borderradius-tremor-default shadow-tremor-card p-6 flex flex-col gap-2 justify-center w-full">
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
          <div className="heroicons-outline-wrapper bg-ecfdf3 rounded-full inline-flex items-center gap-1.5 p-2 relative">
            {/* Your HeroiconsOutline component or icon goes here */}
          </div>
          <div className="text-wrapper-6 text-green-500 font-semibold text-xs leading-6">
            {props.verDocumento}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardEstudio;
