//npx prisma db push --force-reset   
//node .\prisma\seeds\medicalReportSeed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { faker } = require('@faker-js/faker');
const statusOptions = ["Activo", "Enviando", "Pendiente", "No entregado"];

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

async function main() {
  await prisma.patient.deleteMany();
  const patientData = generatePatients(5); // Genera 5 pacientes aleatorios
  for (const patientInfo of patientData) {
    const patient = await prisma.patient.create({
      data: patientInfo,
    });

    // Generar informes médicos para cada paciente
    const numMedicalReports = faker.random.number({ min: 1, max: 5 }); // Genera entre 1 y 5 informes médicos por paciente
    for (let i = 0; i < numMedicalReports; i++) {
      await prisma.medicalReport.create({
        data: {
          name: `Estudio ${i + 1}`,
          date: faker.date.past(), // Fecha aleatoria en el pasado
          status: faker.random.arrayElement(statusOptions),
          diagnosis: faker.lorem.sentence(),
          patient: {
            connect: { id: patient.id }, // Establece la relación con el paciente recién creado
          },
        },
      });
    }
  }
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
