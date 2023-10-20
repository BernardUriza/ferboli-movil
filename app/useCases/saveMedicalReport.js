export async function saveMedicalReports(editedReport) {
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
          // La solicitud fue exitosa, puedes realizar acciones adicionales si es necesario
          console.log('Informe médico guardado exitosamente.');
          resolve({ success: true });
        } else {
          // La solicitud no fue exitosa, maneja el error
          console.error('Error al guardar el informe médico.');
          resolve({ success: false });
        }
      } catch (error) {
        console.error('Error al guardar el informe médico: ' + error.message);
        reject(error);
      }
    });
  }
  