import { getAllPatients, createPatient, updatePatient, getPatientById } from '../../prisma/patientsClient';

export default async (req, res) => {
  if (req.method === 'GET') {
    try {
      const patients = await getAllPatients();
      res.status(200).json(patients);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching patients' });
    }
  } else if (req.method === 'POST') {
    try {
      const { id, name, email, phone } = req.body;

      // Validación de los campos
      if (!id || !name || !email || !phone) {
        return res.status(400).json({ error: 'Falta uno de los campos son obligatorios' });
      }

      // Debes realizar más validaciones según tus necesidades. Por ejemplo, validar la longitud del nombre o el formato del ID.

      // Verificar si el paciente ya existe por su ID
      const existingPatient = await getPatientById(id);

      if (existingPatient) {
        // Si el paciente existe, actualízalo
        const updatedPatient = await updatePatient(id, { name, email, phone });
        res.status(200).json(updatedPatient);
      } else {
        // Si el paciente no existe, créalo como un nuevo paciente
        const newPatient = await createPatient({ id, name, email, phone });
        res.status(201).json(newPatient);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error saving patient ' + error });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
};
