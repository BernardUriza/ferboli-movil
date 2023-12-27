import { NextResponse } from 'next/server';
import {
  getAllMedicalReports,
  createMedicalReport,
  updateMedicalReport,
  getMedicalReportById,
  deleteMedicalReport
} from '../../../../prisma/medicalReportsClient';

// Manejador para el método GET
export async function GET(req, context) {
  const { query } = req;
  const { medicalReport } = context;

  if (query) {
    if (medicalReport && medicalReport.length > 0) {
      const reportId = parseInt(medicalReport[0]);
      const report = await getMedicalReportById(reportId);
      return report
        ? NextResponse.json(report, { status: 200 })
        : NextResponse.json({ error: 'Medical report not found' }, { status: 404 });
    }
  }

  const medicalReports = await getAllMedicalReports();
  return NextResponse.json(medicalReports, { status: 200 });
}

// Manejador para el método POST
export const POST = async (req) => {
  const { id, name, date, status, expirationDate, patient, studies } = req.body;

  if (!date || !status || !patient) {
    return NextResponse.json({ error: 'Date, status, and patient are required fields' }, { status: 400 });
  }

  let existingReport = parseInt(id) > 0 ? await getMedicalReportById(id) : false;

  if (existingReport) {
    const updatedReport = await updateMedicalReport(id, {
      name,
      date,
      status,
      expirationDate: expirationDate !== null ? expirationDate : existingReport.expirationDate
    });
    return NextResponse.json(updatedReport, { status: 200 });
  } else {
    const newReport = await createMedicalReport({
      name,
      date,
      status,
      diagnosis: 'Default Diagnosis',
      patient: {
        create: patient
      },
      studies: {
        create: studies.map((study) => ({
          name: "",
          studyTypeId: study.type.id,
          createdAt: study.createdAt,
          // add other properties as needed
        }))
      }
    });
    return NextResponse.json(newReport, { status: 201 });
  }
};

// Manejador para el método DELETE
export const DELETE = async (req) => {
  const { query } = req;
  const { medicalReport } = query;

  if (!medicalReport || medicalReport.length === 0) {
    return NextResponse.json({ error: 'ID is required for deletion' }, { status: 400 });
  }

  const reportIdToDelete = parseInt(medicalReport[0]);
  const result = await deleteMedicalReport(reportIdToDelete);
  return NextResponse.json(result, { status: 201 });
};
