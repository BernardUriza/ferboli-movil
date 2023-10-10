// pages/api/medicalReports.js

import { getAllMedicalReports } from '../../prisma/client';

export default async (req, res) => {
  if (req.method === 'GET') {
    try {
      const medicalReports = await getAllMedicalReports();
      res.status(200).json(medicalReports);
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ error: 'Error fetching medical reports' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
