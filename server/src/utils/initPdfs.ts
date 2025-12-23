import fs from 'fs';
import path from 'path';
import PdfNote from '../models/PdfNote';

export const initializeExistingPdfs = async (uploadsPath: string): Promise<void> => {
  try {
    console.log('Scanning uploads folder for existing PDFs...');

    // Ensure the uploads directory exists
    if (!fs.existsSync(uploadsPath)) {
      console.log('Uploads directory does not exist, creating it...');
      fs.mkdirSync(uploadsPath, { recursive: true });
      return;
    }

    // Read all files in the uploads directory
    const files = fs.readdirSync(uploadsPath);
    const pdfFiles = files.filter(file => file.toLowerCase().endsWith('.pdf'));

    if (pdfFiles.length === 0) {
      console.log('No existing PDFs found in uploads folder');
      return;
    }

    console.log(`Found ${pdfFiles.length} PDF file(s) in uploads folder`);

    // Check each PDF file
    for (const filename of pdfFiles) {
      const pdfUrl = `/uploads/pdfs/${filename}`;

      // Check if this PDF already exists in the database
      const existingNote = await PdfNote.findOne({ pdfUrl });

      if (!existingNote) {
        // Extract a title from the filename (remove timestamp prefix if present and .pdf extension)
        let title = filename.replace(/^\d+-/, '').replace(/\.pdf$/i, '');

        // Create a new PdfNote entry
        const newNote = new PdfNote({
          title,
          description: 'Auto-imported from uploads folder',
          pdfUrl,
          tags: ['auto-imported'],
        });

        await newNote.save();
        console.log(`✓ Registered new PDF: ${title}`);
      } else {
        console.log(`- PDF already registered: ${filename}`);
      }
    }

    console.log('PDF initialization complete');
  } catch (error) {
    console.error('Error initializing PDFs:', error);
  }
};
