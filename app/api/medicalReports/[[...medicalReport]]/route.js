import {
  getAllMedicalReports,
  createMedicalReport,
  updateMedicalReport,
  getMedicalReportById,
  deleteMedicalReport
} from '../../../../prisma/medicalReportsClient';

// Manejador para el método GET
export const GET = async (req, res) => {
  const { query } = req;
  const { medicalReport } = query;

  if (medicalReport && medicalReport.length > 0) {
    const reportId = parseInt(medicalReport[0]);
    const report = await getMedicalReportById(reportId);
    return report
      ? res.status(200).json(report)
      : res.status(404).json({ error: 'Medical report not found' });
  } else {
    const medicalReports = await getAllMedicalReports();
    return res.status(200).json(medicalReports);
  }
};

// Manejador para el método POST
export const POST = async (req, res) => {
  const { id, name, date, status, expirationDate, patient, studies } = req.body;

  if (!date || !status || !patient) {
    return res.status(400).json({ error: 'Date, status, and patient are required fields' });
  }

  let existingReport = parseInt(id) > 0 ? await getMedicalReportById(id) : false;

  if (existingReport) {
    const updatedReport = await updateMedicalReport(id, {
      name,
      date,
      status,
      expirationDate: expirationDate !== null ? expirationDate : existingReport.expirationDate
    });
    return res.status(200).json(updatedReport);
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
    return res.status(201).json(newReport);
  }
};

// Manejador para el método DELETE
export const DELETE = async (req, res) => {
  const { query } = req;
  const { medicalReport } = query;

  if (!medicalReport || medicalReport.length === 0) {
    return res.status(400).json({ error: 'ID is required for deletion' });
  }

  const reportIdToDelete = parseInt(medicalReport[0]);
  const result = await deleteMedicalReport(reportIdToDelete);
  return res.status(201).json(result);
};
