// useCases/fetchMedicalReports.js
import MedicalReport from '../entities/MedicalReport';

export async function fetchMedicalReports() {
  try {
    const response = await fetch('/api/medicalReports');
    if (response.ok) {
      const data = await response.json();
      return data.map((report) =>
        new MedicalReport(report.id, report.name, report.date, report.status)
      );
    } else {
      throw new Error('Error fetching medical reports');
    }
  } catch (error) {
    throw new Error('Error fetching medical reports: ' + error.message);
  }
}
