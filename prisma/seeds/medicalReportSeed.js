//npx prisma db push --force-reset   
//node .\prisma\seeds\medicalReportSeed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { faker } = require('@faker-js/faker');
const statusOptions = ["Activo", "Enviando", "Pendiente", "No entregado"];
const categoriesSeed = [
  { "name": "Hematología" },
  { "name": "Química sanguínea" },
  { "name": "Microbiología" },
  { "name": "Inmunología" },
  { "name": "Parasitología" },
  { "name": "Uroanálisis" },
  { "name": "Endocrinología" },
  { "name": "Genética" },
  { "name": "Toxicología" },
  { "name": "Virología" },
  { "name": "Inmunohematología" },
  { "name": "Serología" },
  { "name": "Bioquímica clínica" },
  { "name": "Análisis de orina" },
  { "name": "Cultivo de tejidos" },
  { "name": "Citología" },
  { "name": "Histopatología" },
  { "name": "Neurofisiología" },
  { "name": "Electrofisiología" },
  { "name": "Radiología" },
  { "name": "Resonancia magnética" },
  { "name": "Tomografía computarizada" },
  { "name": "Ecografía" },
  { "name": "Doppler" },
  { "name": "Electrocardiografía" },
  { "name": "Holter" },
  { "name": "Espirometría" },
  { "name": "Electroencefalografía" },
  { "name": "Colonoscopía" },
  { "name": "Endoscopía" }
];

// Generar datos aleatorios para pacientes
const generatePatients = (count) => {
  const patients = [];
  const genderOptions = ["Hombre", "Mujer"];
  const statusPatientOptions = ["Activo", "Archivado"];

  for (let i = 0; i < count; i++) {
    const patient = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
      information: faker.lorem.sentence(),
      dateOfBirth: faker.date.past(), // Fecha de nacimiento aleatoria en el pasado
      gender: faker.random.arrayElement(genderOptions),
      status: faker.random.arrayElement(statusPatientOptions),
    };

    patients.push(patient);
  }

  return patients;
};

// Generar datos aleatorios para informes médicos
const generateMedicalReports = (count, patients, categories) => {
  const medicalReports = [];

  for (let i = 0; i < count; i++) {
    const patient = faker.random.arrayElement(patients);

    // Define the studies for each medical report
    const studies = generateStudies(categories); // Implement the generateStudies function

    const medicalReport = {
      name: faker.lorem.words(2),
      date: faker.date.past(),
      status: faker.random.arrayElement(statusOptions),
      diagnosis: faker.lorem.sentence(),
      patient: {
        connect: { id: patient.id },
      },
      studies: {
        create: studies,
      },
    };

    medicalReports.push(medicalReport);
  }

  return medicalReports;
};

// Generate random studies for each medical report
const generateStudies = (categories) => {
  const numStudies = faker.datatype.number({ min: 1, max: 5 }); // Random number of studies (1 to 5)
  const studies = [];

  for (let i = 0; i < numStudies; i++) {
    const category = faker.random.arrayElement(categories);
    const study = {
      // Define study properties (e.g., name, result, date, etc.)
      // You can use faker to generate random values for the study properties
      category: {
        connect: { id: category.id },
      },
      createdAt: faker.date.past(),
    };

    studies.push(study);
  }

  return studies;
};

async function main() {
  await prisma.patient.deleteMany();
  await prisma.category.deleteMany();

  const patientData = generatePatients(5); // Genera 5 pacientes aleatorios
  for (const patientInfo of patientData) {
    const patient = await prisma.patient.create({
      data: patientInfo,
    });
  }

  for (const categoryInfo of categoriesSeed) { // Cambio de 'categories' a 'categoriesSeed'
    await prisma.category.create({
      data: categoryInfo,
    });
  }

  const patients = await prisma.patient.findMany();
  const categories = await prisma.category.findMany();

  const medicalReportsData = generateMedicalReports(20, patients, categories); // Genera 20 informes médicos aleatorios
  for (const reportInfo of medicalReportsData) {
    await prisma.medicalReport.create({
      data: reportInfo,
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
