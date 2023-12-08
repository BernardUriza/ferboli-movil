// pages/api/studies/[[study]].js
import { getAllStudies, createStudy, updateStudy, getStudyById } from '../../../prisma/studiesClient';

export default async (req, res) => {
  const { method, query } = req;
  const { study } = query;

  if (method === 'GET') {
    try {
      if (study && study.length > 0) {
        // If an ID is provided, fetch the specific study
        const studyId = parseInt(study[0]);
        const studyData = await getStudyById(studyId);

        if (studyData) {
          return res.status(200).json(studyData);
        } else {
          return res.status(404).json({ error: 'Study not found' });
        }
      } else {
        // If no ID is provided, fetch all studies
        const studies = await getAllStudies();
        return res.status(200).json(studies);
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error fetching studies' });
    }
  } else if (method === 'POST') {
    try {
      const { id, name, date, status, category } = req.body;

      // Validation of the fields
      if (!id || !name || !date || !status) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      // You may perform additional validations according to your needs, e.g., validate the date format or the value of the status.

      // Check if the study already exists by its ID
      const existingStudy = await getStudyById(id);

      if (existingStudy) {
        // If the study exists, update it
        const updatedStudy = await updateStudy(id, {
          name,
          date,
          status,
          categoryId: category.id, // categoryId instead of the complete category object
        });
        res.status(200).json(updatedStudy);
      } else {
        // If the study does not exist, create it as a new study
        const newStudy = await createStudy({
          id,
          name,
          date,
          status,
          categoryId: category.id, // categoryId instead of the complete category object
        });
        res.status(201).json(newStudy);
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error saving study ' + error });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
};
