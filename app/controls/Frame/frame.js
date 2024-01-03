"use client"
import React from "react";
import "./style.css";
import { CardEstudio } from "../CardEstudio";
import { Card } from '@tremor/react';

export const HeaderFrameClient = () => {
  return (
    <div className="frame">
      <p className="centro-de-diagn">
        <span className="text-wrapper">Centro de </span>
        <span className="text-wrapper font-bold">Diagnóstico Móvil</span>
      </p>
    </div>
  );
};
export const ContentCardsClient = ({data}) => {
  console.log("patientdata ",data)
  return (
    <Card>
      <div className="div flex flex-col gap-2">
        <div className="header flex flex-col relative w-full">
          <p className="p">
            <span className="text-wrapper font-semibold">Nombre<br /></span>
            <span className="span">Olivia3 Baker Steiner</span>
          </p>
        </div>
        <div className="header flex flex-col relative w-full">
          <p className="p">
            <span className="text-wrapper font-semibold">Fecha de realización<br /></span>
            <span className="span">22/Octubre/2023</span>
          </p>
        </div>
      </div>
      <div className="text-wrapper font-semibold my-3">Resultados</div>
      <div className="lista-de-estudios flex flex-col gap-4 relative w-full">
        <CardEstudio
          tipoEstudio="Ultrasonido"
          nombreEstudio="Doppler Carotídeo"
          fechaEstudio="Fecha. 22 Octubre 2023"
        />
        <CardEstudio
          tipoEstudio="Cardiológicos"
          nombreEstudio="Holter 24 Horas"
          fechaEstudio="Fecha. 22 Octubre 2023"
        />
      </div>
    </Card>
  );
}