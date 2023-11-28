const MedicalReport = require('../entities/MedicalReport');
import { sendEmail } from "../lib/mailer";

const sendTokenByEmail = (report) => {
  const medicalReport = new MedicalReport(report);
  const { token, url } = medicalReport.generateToken(); // Call the method on the instance
  /* Lógica para enviar el correo electrónico con el token */
  const subject = 'Token para acceder a informes médicos';
  const text = `Este es su URL para acceder a sus informes médicos: ${url}`;
  const to = medicalReport.patient.email;

  sendEmail({to, subject, text});

  console.log('Token enviado por correo electrónico:', token);
};

module.exports = sendTokenByEmail;
