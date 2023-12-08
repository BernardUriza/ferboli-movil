import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import MedicalReportDetails from '../../app/MedicalReportDetails';

const TokenPage = () => {
  const router = useRouter();
  const { token } = router.query;
  const [decodedToken, setDecodedToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const decodeToken = async () => {
      try {
        const decoded = jwt.verify(token, 'tu_secreto_secreto');
        setDecodedToken(decoded);
      } catch (error) {
        console.error('Error decodificando el token:', error);
        // Manejar el error, por ejemplo, redirigir a una página de error
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      decodeToken();
    }
  }, [token]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <MedicalReportDetails medicalReportId={decodedToken.medicalReportId} />
  );
};

export default TokenPage;
