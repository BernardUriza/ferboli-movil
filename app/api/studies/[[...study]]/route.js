import { NextResponse } from 'next/server'; // Import NextResponse
import {
  getAllStudies,
  createStudy,
  updateStudy,
  getStudyById
} from '../../../../prisma/studiesClient';

export async function GET(req, context) {
  const { method, query } = req;
  const { study } = query;
  try {
    if (study && study.length > 0) {
      // If an ID is provided, fetch the specific study
      const studyId = parseInt(study[0]);
      const studyData = await getStudyById(studyId);

      if (studyData) {
        return NextResponse.json(studyData, { status: 200 });
      } else {
        return NextResponse.json({ error: 'Study not found' }, { status: 404 });
      }
    } else {
      // If no ID is provided, fetch all studies
      const studies = await getAllStudies();
      return NextResponse.json(studies, { status: 200 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error fetching studies' }, { status: 500 });
  }
}
export async function POST(req, context) {
  try {
    const body = await req.json();
    const { id, medicalReportId, name, type } = body;

    // Validation of the fields
    if (!medicalReportId || !type || !name)  {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // You may perform additional validations according to your needs, e.g., validate the date format or the value of the status.

    // Check if the study already exists by its ID
    const existingStudy = id === "" ? false : await getStudyById(id);

    if (existingStudy) {
      // If the study exists, update it
      const updatedStudy = await updateStudy(id, {
        name,
        studyTypeId: type.id
      });
      return NextResponse.json(updatedStudy, { status: 200 });
    } else {
      // If the study does not exist, create it as a new study
      const newStudy = await createStudy({
        medicalReportId,
        name,
        studyTypeId: type.id, // categoryId instead of the complete category object
      });
      return NextResponse.json(newStudy, { status: 201 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error saving study ' + error }, { status: 500 });
  }
}