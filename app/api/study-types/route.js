import {
    getAllStudyTypes,
    createStudyType,
    updateStudyType,
    getStudyTypeById,
  } from '../../prisma/studyTypesClient';
  
  export default async (req, res) => {
    if (req.method === 'GET') {
      try {
        const studyTypes = await getAllStudyTypes();
        res.status(200).json(studyTypes);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching study types' });
      }
    } else if (req.method === 'POST') {
      try {
        const { id, name, description, categoryId } = req.body;
  
        // Validación de los campos
        if (!id || !name || !description || !categoryId) {
          return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }
  
        // Verificar si el tipo de estudio ya existe por su ID
        const existingStudyType = await getStudyTypeById(id);
  
        if (existingStudyType) {
          // Si el tipo de estudio existe, actualízalo
          const updatedStudyType = await updateStudyType(id, { name, description, categoryId });
          res.status(200).json(updatedStudyType);
        } else {
          // Si el tipo de estudio no existe, créalo como un nuevo tipo de estudio
          const newStudyType = await createStudyType({ id, name, description, categoryId });
          res.status(201).json(newStudyType);
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error saving study type ' + error });
      }
    } else {
      res.status(405).json({ error: 'Método no permitido' });
    }
  };
  