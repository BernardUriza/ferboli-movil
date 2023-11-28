import React from "react";
import "./style.css";

export const Frame = () => {
  return (
    <div className="frame">
      <p className="centro-de-diagn">
        <span className="text-wrapper">Centro de </span>
        <span className="text-wrapper font-bold">Diagnóstico Móvil</span>
      </p>
    </div>
  );
};
export const Frame2 = () => {
  return (
    <div className="frame p-6 bg-tremor-background border border-tremor-border rounded-lg flex flex-col gap-4 relative">
      <div className="div flex flex-col gap-2">
        <div className="header flex flex-col relative w-full">
          <p className="p text-tremor-content-emphasis font-bold text-base leading-7">
            <span className="text-wrapper font-semibold">Nombre<br /></span>
            <span className="span text-tremor-content-strong text-base leading-7">Olivia Baker Steiner</span>
          </p>
        </div>
        <div className="header flex flex-col relative w-full">
          <p className="p text-tremor-content-emphasis font-bold text-base leading-7">
            <span className="text-wrapper font-semibold">Fecha de realización<br /></span>
            <span className="span text-tremor-content-DEFAULT text-base leading-7">22/Octubre/2023</span>
          </p>
        </div>
      </div>
      <div className="text-wrapper-2 text-tremor-content-emphasis font-bold text-base leading-7">Resultados</div>
      <div className="lista-de-estudios flex flex-col gap-4 relative w-full">
        <div className="card-estudios bg-tremor-background border border-tremor-border rounded-tremor-borderradius-tremor-default shadow-tremor-card p-6 flex flex-col gap-2 justify-center w-full">
          <div className="div-2 flex gap-2 items-center relative w-full">
            <div className="div-3 flex flex-col flex-1 gap-2 justify-center relative">
              <div className="text-wrapper-3 text-tremor-content-DEFAULT text-sm leading-5">
                Ultrasonido
              </div>
              <div className="text-wrapper-4 text-tremor-content-strong text-base leading-6">
                Doppler Carotídeo
              </div>
              <div className="text-wrapper-5 text-tremor-content-DEFAULT text-xs leading-5">
                Fecha. 22 Octubre 2023
              </div>
            </div>
            <div className="div-4 inline-flex flex-col gap-2 items-center relative">
              <div className="heroicons-outline-wrapper bg-ecfdf3 rounded-full inline-flex items-center gap-1.5 p-2 relative">
              </div>
              <div className="text-wrapper-6 text-green-500 font-semibold text-xs leading-6">
                Ver documento
              </div>
            </div>
          </div>
        </div>
        <div className="card-estudios bg-tremor-background border border-tremor-border rounded-tremor-borderradius-tremor-default shadow-tremor-card p-6 flex flex-col gap-2 justify-center w-full">
          <div className="div-2 flex gap-2 items-center relative w-full">
            <div className="div-3 flex flex-col flex-1 gap-2 justify-center relative">
              <div className="text-wrapper-3 text-tremor-content-DEFAULT text-sm leading-5">
                Cardiológicos
              </div>
              <div className="text-wrapper-4 text-tremor-content-strong text-base leading-6">
                Holter 24 Horas
              </div>
              <div className="text-wrapper-5 text-tremor-content-DEFAULT text-xs leading-5">
                Fecha. 22 Octubre 2023
              </div>
            </div>
            <div className="div-4 inline-flex flex-col gap-2 items-center relative">
              <div className="heroicons-outline-wrapper bg-ecfdf3 rounded-full inline-flex items-center gap-1.5 p-2 relative">
              </div>
              <div className="text-wrapper-6 text-green-500 font-semibold text-xs leading-6">
                Ver documento
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
