import MedicalReport from "../entities/MedicalReport";

export function saveMedicalReports(editedReport) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('/api/medicalReports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedReport),
      });

      if (response.ok) {
        const responseData = await response.json();
        // The request was successful; you can perform additional actions if necessary
        console.log('Medical report saved successfully.');
        const savedReport = new MedicalReport(responseData);
        resolve({ success: true, data: savedReport });
      } else {
        // The request was not successful; handle the error
        console.error('Error saving the medical report.');
        resolve({ success: false });
      }
    } catch (error) {
      console.error('Error saving the medical report: ' + error.message);
      reject(error);
    }
  });
}
