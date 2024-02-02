"use client";
import React from "react";
import "./style.css";
import { CardEstudio } from "../CardEstudio";
import { Button, Card } from '@tremor/react';
import { formatDateHandler } from "../../providers/formatDateHandler";

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

export const ContentCardsClient = ({ data }) => {
  // Destructuring patient and studies information from data
  const { patient, studies } = data;

  return (
    <Card>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <div className="header flex flex-col relative w-full">
            <p className="p">
              <span className="text-wrapper font-semibold">Nombre<br /></span>
              <span className="span">{patient.name}</span>
            </p>
          </div>
          <div className="header flex flex-col relative w-full">
            <p className="p">
              <span className="text-wrapper font-semibold">Fecha de realización<br /></span>
              <span className="span">{formatDateHandler(data.date)}</span>
            </p>
          </div>
        </div>
        <div className="flex justify-end">
          <Button style={{height: 50}}>Descargar todo</Button>
        </div>
      </div>
      <div className="text-wrapper font-semibold my-3">Resultados</div>
      <div className="lista-de-estudios flex flex-col gap-4 relative w-full">
        {studies.map(study => (
          <CardEstudio
            key={study.id}
            tipoEstudio={study.type.category.name}
            nombreEstudio={study.type.name}
            url={study.name}
            fechaEstudio={`Fecha. ${formatDateHandler(study.createdAt, { separator: ' ' })}`}
          />
        ))}
      </div>
    </Card>
  );
};
