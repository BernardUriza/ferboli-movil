import { getAllMedicalReports, createMedicalReport, updateMedicalReport, getMedicalReportById } from '../../prisma/medicalReportsClient';

export default async (req, res) => {
  if (req.method === 'GET') {
    try {
      const medicalReports = await getAllMedicalReports();
      res.status(200).json(medicalReports);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching medical reports' });
    }
  } else if (req.method === 'POST') {
    try {
      const { id, name, date, status, category } = req.body;

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
          categoryId: category.id // categoryId en lugar del objeto completo category
        });
        res.status(200).json(updatedReport);
      } else {
        // Si el informe no existe, créalo como un nuevo informe
        const newReport = await createMedicalReport({ id, name, date, status, categoryId: category.id }); // categoryId en lugar del objeto completo category
        res.status(201).json(newReport);
      }

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error saving medical report ' + error });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
};
