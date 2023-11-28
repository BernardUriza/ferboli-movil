const jwt = require('jsonwebtoken');

class Patient {
  constructor({ id, name, email, phone, information, dateOfBirth, gender, status }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.information = information;
    this.dateOfBirth = dateOfBirth;
    this.gender = gender;
    this.status = status;
  }

  generateToken() {
    if (!this.id) {
      throw new Error('patientId is required for token generation');
    }

    const token = jwt.sign({ patientId: this.id }, 'tu_secreto_secreto', {
      expiresIn: '15d',
    });

    // Agregar el token a la URL de la aplicación
    const url = `${process.env.NEXT_PUBLIC_APP_URL}/token/${token}`;

    debugger
    return { token, url };
  }
}

module.exports = Patient;
