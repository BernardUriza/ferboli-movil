// entities/Patient.js
const jwt = require('jsonwebtoken');

export default class Patient {
  constructor(id, name, email, phone, information, dateOfBirth, gender, status) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.information = information;
    this.dateOfBirth = dateOfBirth;
    this.gender = gender;
    this.status = status;
  }

  static generateToken(patientId) {
    return jwt.sign({ patientId }, 'tu_secreto_secreto', {
      expiresIn: '15d',
    });
  }
} 