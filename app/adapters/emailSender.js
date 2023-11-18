// adapters/emailSender.js

//const nodemailer = require('nodemailer');

const sendEmail = (to, subject, text) => {/*
  const transporter = nodemailer.createTransport({
     Configuración del servicio de correo 
  });

  const mailOptions = {
    from: 'tu_correo_electronico',
    to: to,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo:', error);
    } else {
      console.log('Correo enviado:', info.response);
    }
  });*/
};

module.exports = sendEmail;
