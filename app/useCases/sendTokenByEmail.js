const Patient = require('../entities/Patient');
import { sendEmail } from "../lib/mailer";

const sendTokenByEmail = (patientData) => {
  const patient = new Patient(patientData);
  const token = patient.generateToken(); // Call the method on the instance
  /* Lógica para enviar el correo electrónico con el token */
  const subject = 'Token para acceder a informes médicos';
  const text = `Este es su token para acceder a sus informes médicos: ${token}`;
  const to = patient.email;
  
  sendEmail({to, subject, text});

  console.log('Token enviado por correo electrónico:', token);
};

module.exports = sendTokenByEmail;
