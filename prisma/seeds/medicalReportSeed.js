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
    phone: faker.phone.phoneNumber("(##) #### #### #####"),
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

const createMedicalReports = async (medicalReportsData) => {
  return Promise.all(medicalReportsData.map(async (medicalReportInfo) => {
    return prisma.medicalReport.create({
      data: medicalReportInfo,
    });
  }));
};

const createStudies = async (studiesData) => {
  return Promise.all(studiesData.map(async (studyInfo) => {
    return prisma.study.create({
      data: studyInfo,
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

const generateStudies = (medicalReports, studyTypes) => {
  const numStudies = faker.datatype.number({ min: 1, max: 60 });
  
  return Array.from({ length: numStudies }, () => {
    const medicalReport = (generateRandomElement(medicalReports));
    return {
      type: {
        connect: { id: generateRandomElement(generateRandomElement(studyTypes)).id },
      },
      name: faker.lorem.words(2),
      createdAt: faker.date.past(),
      medicalReport: { connect: { id: medicalReport.id } },
    };
  });
};

const generateMedicalReports = (count, patients) => {
  return Array.from({ length: count }, () => {
    const patient = generateRandomElement(patients);

    return {
      name: faker.lorem.words(2),
      date: faker.date.past(),
      status: generateRandomElement(statusOptions),
      diagnosis: faker.lorem.sentence(),
      patientId: patient.id
    };
  });
};


const main = async () => {
  try {
    await prisma.study.deleteMany();
    await prisma.studyType.deleteMany();
    await prisma.category.deleteMany();
    await prisma.medicalReport.deleteMany();
    await prisma.patient.deleteMany();

    const categories = await createCategories(categoriesSeed);
    const studyTypes = await createStudyTypes(categories);
    
    const patientsData = generatePatients(5);
    const patients = await createPatients(patientsData);

    const medicalReportsData = generateMedicalReports(18, patients);
    const medicalReports = await createMedicalReports(medicalReportsData);

    const studiesData = generateStudies(medicalReports, studyTypes);
    await createStudies(studiesData);

    console.log('Seeding completed successfully.');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await prisma.$disconnect();
  }
};

main();
