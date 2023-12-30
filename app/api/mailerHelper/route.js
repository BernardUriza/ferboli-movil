import { NextResponse } from 'next/server';
import { mailOptions, transporter } from '../../config/nodemailer';

const generateEmailContent = (subject, text) => {
  return {
    text: 'stringData',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background: #ffffff;
            }
            .container {
              max-width: 500px;
              margin: 0 auto;
              padding: 15px;
              border: 1px dashed #ccc;
            }
            .header {
              text-align: center;
              font-size: 24px;
              color: #2a2a2a;
              margin-bottom: 20px;
            }
            .content {
              font-size: 16px;
              color: #2a2a2a;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              ${subject}
            </div>
            <div class="content">
              ${text}
            </div>
          </div>
        </body>
      </html>
    `,
  };
};

export async function POST(req) {
  const body = await req.json();
  const { to, subject, text } = body;

  // Input validation
  if (!to || !subject || !text) {
    return NextResponse.json({ message: 'Missing required fields ' + to }, { status: 400 });
  }

  mailOptions.to = to;
  try {
    await transporter.sendMail({
      ...mailOptions,
      ...generateEmailContent(subject, text),
      subject: subject,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
}
