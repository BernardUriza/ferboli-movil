//npx prisma db push --force-reset   
//node .\prisma\seeds\medicalReportSeed.js
const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

const statusOptions = ["Activo", "Enviando", "Pendiente", "No entregado"];

const categoriesSeed = [
  "Hematología", "Química sanguínea", "Microbiología", "Inmunología", "Parasitología",
  "Uroanálisis", "Endocrinología", "Genética", "Toxicología", "Virología",
  "Inmunohematología", "Serología", "Bioquímica clínica", "Análisis de orina",
  "Cultivo de tejidos", "Citología", "Histopatología", "Neurofisiología", "Electrofisiología",
  "Radiología", "Resonancia magnética", "Tomografía computarizada", "Ecografía", "Doppler",
  "Electrocardiografía", "Holter", "Espirometría", "Electroencefalografía", "Colonoscopía", "Endoscopía"
];

const generateRandomElement = (array) => faker.random.arrayElement(array);

const generatePatients = (count) => {
  const genderOptions = ["Hombre", "Mujer"];
  const statusPatientOptions = ["Activo", "Archivado"];

  return Array.from({ length: count }, () => ({
    name: faker.name.findName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    information: faker.lorem.sentence(),
    dateOfBirth: faker.date.past(),
    gender: generateRandomElement(genderOptions),
    status: generateRandomElement(statusPatientOptions),
  }));
};

const createCategories = async (categoriesSeed) => {
  return Promise.all(categoriesSeed.map(async (categoryName) => {
    return prisma.category.create({
      data: { name: categoryName },
    });
  }));
};

const createPatients = async (patientsData) => {
  return Promise.all(patientsData.map(async (patientInfo) => {
    return prisma.patient.create({
      data: patientInfo,
    });
  }));
};

const createStudyTypes = async (categories) => {
  return Promise.all(categories.map(async (category) => {
    const numStudyTypes = faker.datatype.number({ min: 1, max: 3 });
    const studyTypeNames = Array.from({ length: numStudyTypes }, () => faker.lorem.words(1));
    
    return Promise.all(studyTypeNames.map(async (typeName) => {
      return prisma.studyType.create({
        data: {
          name: typeName,
          category: { connect: { id: category.id } },
        },
      });
    }));
  }));
};

const generateStudies = (studyTypes) => {
  const numStudies = faker.datatype.number({ min: 1, max: 5 });

  return Array.from({ length: numStudies }, () => ({
    type: {
      connect: { id: generateRandomElement(studyTypes).id },
    },
    name: faker.lorem.words(2),
    createdAt: faker.date.past(),
  }));
};

const generateMedicalReports = (count, patients, studyTypes) => {
  return Array.from({ length: count }, () => {
    const patient = generateRandomElement(patients);
    const studies = generateStudies(studyTypes);

    return {
      name: faker.lorem.words(2),
      date: faker.date.past(),
      status: generateRandomElement(statusOptions),
      diagnosis: faker.lorem.sentence(),
      patient: { connect: { id: patient.id } },
      studies: { create: studies },
    };
  });
};


const main = async () => {
  try {
    await prisma.studyType.deleteMany();
    await prisma.patient.deleteMany();
    await prisma.category.deleteMany();

    const patientsData = generatePatients(5);
    const categories = await createCategories(categoriesSeed);
    const studyTypes = await createStudyTypes(categories);
    const patients = await createPatients(patientsData);

    const medicalReportsData = generateMedicalReports(1, patients, studyTypes);
    await prisma.medicalReport.createMany({
      data: medicalReportsData,
    });

    console.log('Seeding completed successfully.');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await prisma.$disconnect();
  }
};

main();
