// pages/api/medicalReports/[[medicalReport]].js
import {
  getAllMedicalReports,
  createMedicalReport,
  updateMedicalReport,
  getMedicalReportById,
} from '../../../prisma/medicalReportsClient';

export default async (req, res) => {
  const { method, query } = req;
  const { medicalReport } = query;

  if (method === 'GET') {
    try {
      if (medicalReport && medicalReport.length > 0) {
        // If an ID is provided, fetch the specific medical report
        const reportId = parseInt(medicalReport[0]);
        const report = await getMedicalReportById(reportId);

        if (report) {
          return res.status(200).json(report);
        } else {
          return res.status(404).json({ error: 'Medical report not found' });
        }
      } else {
        // If no ID is provided, fetch all medical reports
        const medicalReports = await getAllMedicalReports();
        return res.status(200).json(medicalReports);
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error fetching medical reports' });
    }
  } else if (method === 'POST') {
    try {
      const { id, name, date, status } = req.body;

      // Validación de los campos
      if (!id || !name || !date || !status) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
      }

      // Debes realizar más validaciones según tus necesidades. Por ejemplo, validar el formato de la fecha o el valor del estado.

      // Verificar si el informe ya existe por su ID
      const existingReport = await getMedicalReportById(id);

      if (existingReport) {
        // Si el informe existe, actualízalo
        const updatedReport = await updateMedicalReport(id, {
          name,
          date,
          status,
          categoryId: category.id, // categoryId en lugar del objeto completo category
        });
        res.status(200).json(updatedReport);
      } else {
        // Si el informe no existe, créalo como un nuevo informe
        const newReport = await createMedicalReport({
          id,
          name,
          date,
          status
        });
        res.status(201).json(newReport);
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error saving medical report ' + error });
    }
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
};
