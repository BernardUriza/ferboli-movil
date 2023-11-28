// pages/token/[token].js
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';

const TokenPage = () => {
  const router = useRouter();
  const { token } = router.query;

  // Decodificar el token
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'tu_secreto_secreto');
  } catch (error) {
    console.error('Error decodificando el token:', error);
    // Manejar el error, por ejemplo, redirigir a una página de error
  }

  return (
    <div>
      <h1>Token Page</h1>
      <p>Token: {token}</p>
      {decodedToken && (
        <div>
          <p>Contenido decodificado:</p>
          <pre>{JSON.stringify(decodedToken, null, 2)}</pre>
          <p>patientId: {decodedToken.patientId}</p>
        </div>
      )}
    </div>
  );
};

export default TokenPage;
