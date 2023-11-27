const jwt = require('jsonwebtoken');

class Patient {
  constructor({id, name, email, phone, information, dateOfBirth, gender, status}) {
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

    return jwt.sign({ patientId: this.patientId }, 'tu_secreto_secreto', {
      expiresIn: '15d',
    });
  }
}

module.exports = Patient;