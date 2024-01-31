const MedicalReport = require('../entities/MedicalReport');
import { sendEmail } from '../lib/mailer';
import { format } from 'date-fns';

export default async function sendTokenByEmail(report) {
    try {
        const medicalReport = new MedicalReport(report);
        const url = medicalReport.generateToken(); 
        const subject = 'Token para acceder a informes médicos';
        const to = medicalReport.patient.email;
        const nombreDeUsuario = medicalReport.patient.name;
        
        let fecha = '';
        if (medicalReport.date instanceof Date && !isNaN(medicalReport.date)) {
            fecha = format(medicalReport.date, 'dd/MMMMM/yyyy');
        } else {
            // Handle invalid or undefined date here
            console.error('Invalid or undefined date:', medicalReport.date);
        }
        
        await sendEmail({ to, subject, url, nombreDeUsuario, fecha });

        return medicalReport;
    } catch (error) {
        console.error('Error sending token by email:', error);
        throw error;
    }
};
