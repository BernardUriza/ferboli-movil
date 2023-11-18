const Patient = require('../entities/Patient');
const sendEmail = require('../adapters/emailSender');

const sendTokenByEmail = (patientData) => {
  const patient = new Patient(patientData);
  const token = Patient.generateToken(patient.id);
  /* Lógica para enviar el correo electrónico con el token */
  const subject = 'Token para acceder a informes médicos';
  const text = `Este es su token para acceder a sus informes médicos: ${token}`;
  const to = patient.email;

  sendEmail(to, subject, text);

  console.log('Token enviado por correo electrónico:', token);
};

module.exports = sendTokenByEmail;
