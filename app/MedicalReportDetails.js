import { useState, useEffect } from 'react';
import { fetchMedicalReport } from './useCases/fetchMedicalReport'; 
import { Frame } from './controls/Frame/frame';
import { HiOutlineArrowRightOnRectangle } from "react-icons/hi2";

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
      <link rel="stylesheet" href="/_next/static/css/app/layout.css?v=1701147868856" data-precedence="next_static/css/app/layout.css"></link>
      <Frame></Frame>
      <div className="flex mx-3">
        <img src="/images/ferboliMovil.png" alt="Logo Image" className="mx-auto my-auto pt-3" width={105.426} height={40} />
        <p className="flex-1"></p>
        <a href='/api/auth/logout' className="text-gray-500 hover:text-blue-700 flex items-center focus:outline-none">
          Salir
          <HiOutlineArrowRightOnRectangle className="mx-1 w-6 h-6" />
        </a>
      </div>
      <h2>Patient Details</h2>
      <p>Name: {patientData.name}</p>
      <p>Email: {patientData.email}</p>
      <p>Phone: {patientData.phone}</p>
      {/* Add more details based on your patient data structure */}
    </div>
  );
};

export default MedicalReportDetails;
