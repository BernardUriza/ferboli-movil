const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const studiesData = [
    { name: "Study 1", date: "2023-09-25T08:00:00Z", status: "Completed", patientName: "John Doe", diagnosis: "Some diagnosis for Study 1" },
    { name: "Study 2", date: "2023-09-24T14:30:00Z", status: "In Progress", patientName: "Alice Smith", diagnosis: "Some diagnosis for Study 2" },
    { name: "Study 3", date: "2023-09-23T10:15:00Z", status: "Pending", patientName: "Bob Johnson", diagnosis: "Some diagnosis for Study 3" },
    { name: "Study 4", date: "2023-09-22T16:45:00Z", status: "Completed", patientName: "Eve Brown", diagnosis: "Some diagnosis for Study 4" },
    { name: "Study 5", date: "2023-09-21T09:20:00Z", status: "In Progress", patientName: "Grace Wilson", diagnosis: "Some diagnosis for Study 5" },
  ];
  

async function main() {
  for (const studyData of studiesData) {
    await prisma.medicalReport.create({
      data: studyData,
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
