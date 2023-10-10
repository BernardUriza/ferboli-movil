// api/medicalReports.js (o donde quieras organizar tus funciones)

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Obtener todos los reportes médicos
export async function getAllMedicalReports() {
  return prisma.medicalReport.findMany();
}

// Crear un nuevo reporte médico
export async function createMedicalReport(data) {
  return prisma.medicalReport.create({
    data,
  });
}

// Obtener un reporte médico por su ID
export async function getMedicalReportById(id) {
  return prisma.medicalReport.findUnique({
    where: {
      id,
    },
  });
}

// Actualizar un reporte médico por su ID
export async function updateMedicalReport(id, data) {
  return prisma.medicalReport.update({
    where: {
      id,
    },
    data,
  });
}

// Eliminar un reporte médico por su ID
export async function deleteMedicalReport(id) {
  return prisma.medicalReport.delete({
    where: {
      id,
    },
  });
}
