// pages/api/mergePdfs.js
import { PDFDocument } from 'pdf-lib';
import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { pdfUrls } = req.body; // Array de URLs de los PDFs a concatenar
      const mergedPdf = await PDFDocument.create();

      for (const pdfUrl of pdfUrls) {
        const existingPdfBytes = await fetch(pdfUrl).then((res) => res.arrayBuffer());
        const existingPdf = await PDFDocument.load(existingPdfBytes);
        const copiedPages = await mergedPdf.copyPages(existingPdf, existingPdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      res.setHeader('Content-Type', 'application/pdf');
      res.send(Buffer.from(mergedPdfBytes));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
