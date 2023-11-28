const jwt = require('jsonwebtoken');

class MedicalReport {
  constructor({id, name, date, status, diagnosis, patient, studies}) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.status = status;
    this.diagnosis = diagnosis;
    this.patient = patient;
    this.studies = studies;
  }

  generateToken() {
    if (!this.patient.id) {
      throw new Error('patientId is required for token generation');
    }

    const token = jwt.sign({ medicalReportId: this.id }, 'tu_secreto_secreto', {
      expiresIn: '15d',
    });

    // Agregar el token a la URL de la aplicación
    const url = `${process.env.NEXT_PUBLIC_APP_URL}/token/${token}`;

    return { token, url };
  }

}
module.exports = MedicalReport;