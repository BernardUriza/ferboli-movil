"use client"
import { useState, useEffect } from 'react';
import { fetchMedicalReport } from './useCases/fetchMedicalReport'; 
import { Frame, Frame2 } from './controls/Frame/frame';
import { HiOutlineArrowRightOnRectangle } from "react-icons/hi2";
import { Card } from '@tremor/react';
import PropTypes from 'prop-types'; // If you choose to use PropTypes

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
    <div className='container px-3'>
      <Frame/>
      <div className="flex mx-3 my-3">
        <img src="/images/ferboliMovil.png" alt="Logo Image" className="mx-auto my-auto pt-6" width={105.426} height={40} />
        <p className="flex-1"></p>
        <a href='/api/auth/logout' className="text-gray-500 hover:text-blue-700 pt-2 flex items-center focus:outline-none">
          Salir
          <HiOutlineArrowRightOnRectangle className="mx-1 w-6 h-6" />
        </a>
      </div>
      <Frame2/>
      {/* Add more details based on your patient data structure */}
    </div>
  );
};

// Optional: Using PropTypes for type checking
MedicalReportDetails.propTypes = {
  medicalReportId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default MedicalReportDetails;