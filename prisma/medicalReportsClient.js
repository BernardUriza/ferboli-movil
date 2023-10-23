import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Obtener todos los reportes médicos con los joins de los pacientes y categorías
export async function getAllMedicalReports() {
  return prisma.medicalReport.findMany({
    include: {
      patient: true,
      category: true
    },
  });
}

// Crear un nuevo reporte médico
export async function createMedicalReport(data) {
  return prisma.medicalReport.create({
    data: {
      ...data,
      createdAt: new Date() // Agrega la fecha de creación automáticamente
    },
  });
}

// Obtener un reporte médico por su ID
export async function getMedicalReportById(id) {
  return prisma.medicalReport.findUnique({
    where: {
      id,
    },
    include: {
      patient: true,
      category: true
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
    include: {
      patient: true,
      category: true
    },
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
