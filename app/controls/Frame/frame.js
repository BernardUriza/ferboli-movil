import React from "react";
import "./style.css";
import { CardEstudio } from "../CardEstudio";

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
        <CardEstudio
          tipoEstudio="Ultrasonido"
          nombreEstudio="Doppler Carotídeo"
          fechaEstudio="Fecha. 22 Octubre 2023"
          iconoEstudio="heroicons-outline-document-text"
          verDocumento="Ver documento"
        />
        <CardEstudio
          tipoEstudio="Cardiológicos"
          nombreEstudio="Holter 24 Horas"
          fechaEstudio="Fecha. 22 Octubre 2023"
          iconoEstudio="heroicons-outline-document-text"
          verDocumento="Ver documento"
        />
        {/* Add more CardEstudio components as needed */}
      </div>
    </div>
  );
}