import { useState, useEffect } from 'react';
import { fetchMedicalReport } from './useCases/fetchMedicalReport'; 

const MedicalReportDetails = ({ medicalReportId }) => {
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const medicalReport = await fetchMedicalReport(medicalReportId);
        setPatientData(medicalReport);
      } catch (error) {
        console.error('Error fetching medical report data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (medicalReportId) {
      fetchPatientData();
    }
  }, [medicalReportId]);

  if (loading) {
    return <p>Loading patient data...</p>;
  }

  if (!patientData) {
    return <p>No data found for the patient.</p>;
  }

  return (
    <div>
      <h2>Patient Details</h2>
      <p>Name: {patientData.name}</p>
      <p>Email: {patientData.email}</p>
      <p>Phone: {patientData.phone}</p>
      {/* Add more details based on your patient data structure */}
    </div>
  );
};

export default MedicalReportDetails;
