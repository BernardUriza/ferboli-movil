export default class MedicalReport {
  constructor(id, name, date, status, diagnosis, patient) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.status = status;
    this.diagnosis = diagnosis;
    this.patient = patient;
  }
}