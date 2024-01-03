"use client"
import { useState, useEffect } from 'react';
import { fetchMedicalReport } from './useCases/fetchMedicalReport'; 
import { HeaderFrameClient, ContentCardsClient } from './controls/Frame/frame';
import { Watch } from 'react-loader-spinner'
import { HiOutlineArrowRightOnRectangle } from "react-icons/hi2";
import PropTypes from 'prop-types'; // If you choose to use PropTypes

const MedicalReportDetails = ({ loading, medicalReportId }) => {
  const [patientData, setPatientData] = useState(null);
  const [loadingPage, setLoading] = useState(loading);

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

  if (loadingPage) {
    return (
      <div className="fixed inset-0 bg-gray-100 bg-opacity-100 flex items-center justify-center z-50">
        <Watch
          height="80"
          width="80"
          radius="48"
          color="#4fa94d"
          ariaLabel="watch-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      </div>
    );//change by the loader
  }

  if (!patientData) {
    return <p>No data found for the patient.</p>;
  }

  return (
    <div className='container px-3'>
      <HeaderFrameClient/>
      <div className="flex mx-3 my-3">
        <img src="/images/ferboliMovil.png" alt="Logo Image" className="mx-auto my-auto pt-6" width={105.426} height={40} />
        <p className="flex-1"></p>
        <a href='/api/auth/logout' className="text-gray-500 hover:text-blue-700 pt-2 flex items-center focus:outline-none">
          Salir
          <HiOutlineArrowRightOnRectangle className="mx-1 w-6 h-6" />
        </a>
      </div>
      <ContentCardsClient/>
    </div>
  );
};

// Optional: Using PropTypes for type checking
MedicalReportDetails.propTypes = {
  medicalReportId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default MedicalReportDetails;