// useCases/fetchPatients.js
import Patient from '../entities/Patient';

export async function fetchPatients() {
    try {
        const response = await fetch('/api/patients'); // Adjust the API endpoint URL
        if (response.ok) {
            const data = await response.json();
            return data.map((patient) =>
                new Patient(
                    patient.id,
                    patient.name,
                    patient.email,
                    patient.phone,
                    patient.information,
                    new Date(patient.dateOfBirth),
                    patient.gender,
                    patient.status
                )
            );
        } else {
            throw new Error('Error fetching patients');
        }
    } catch (error) {
        throw new Error('Error fetching patients: ' + error.message);
    }
}
