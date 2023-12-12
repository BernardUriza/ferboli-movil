import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllMedicalReports() {
  return prisma.medicalReport.findMany({
    include: {
      patient: true,
      studies: {
        include: {
          type:  {
            include: {
              category: true
            }
          }
        }
      }
    },
    orderBy: {
      patient: {
        name: 'asc',
      },
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
      studies: true
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
      studies: true
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
