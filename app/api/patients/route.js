import { NextResponse } from 'next/server';
import {
  getAllPatients,
  createPatient,
  updatePatient,
  getPatientById
} from '../../../prisma/patientsClient';

export async function GET(req) {
  try {
    const patients = await getAllPatients();
    return NextResponse.json(patients, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error fetching patients' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { id, name, email, phone } = body;

    // Validation of fields
    if (!id || !name || !email || !phone) {
      return NextResponse.json({ error: 'Falta uno de los campos son obligatorios' }, { status: 400 });
    }

    // Verify if the patient already exists by their ID
    const existingPatient = await getPatientById(id);

    if (existingPatient) {
      // If the patient exists, update them
      const updatedPatient = await updatePatient(id, { name, email, phone });
      return NextResponse.json(updatedPatient, { status: 200 });
    } else {
      // If the patient does not exist, create them as a new patient
      const newPatient = await createPatient({ id, name, email, phone });
      return NextResponse.json(newPatient, { status: 201 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error saving patient ' + error }, { status: 500 });
  }
}
