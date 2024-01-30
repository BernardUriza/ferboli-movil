import { NextResponse } from 'next/server';
import { mailOptions, transporter } from '../../config/nodemailer';
const path = require('path');
const fs = require('fs').promises;

const readHtmlFile = async (filePath) => {
  try {
      const content = await fs.readFile(filePath, 'utf8');
      return content;
  } catch (error) {
      console.error('Error reading HTML file:', error);
      throw error;
  }
};

// Función para generar el contenido del correo
const generateEmailContent = async (subject, text, htmlFilePath) => {
  const htmlContent = await readHtmlFile(htmlFilePath);
  return {
      subject,
      text,
      html: htmlContent.replace("[Nombre del Usuario]","pamcho"),
  };
};


export async function POST(req) {
  const body = await req.json();
  const { to, subject, text } = body;

  // Input validation
  if (!to || !subject || !text) {
    return NextResponse.json({ message: 'Missing required fields ' + to }, { status: 400 });
  }

  const htmlFilePath = path.join(__dirname, 'template.html');
  const emailContent = await generateEmailContent(subject, text, htmlFilePath);

  mailOptions.to = to;
  try {
    await transporter.sendMail({
      ...mailOptions,
      ...emailContent,
      subject: subject,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
}
