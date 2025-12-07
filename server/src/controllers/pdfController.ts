import { Request, Response } from 'express';
import PdfNote from '../models/PdfNote';

export const getPdfNotes = async (req: Request, res: Response) => {
  try {
    const notes = await PdfNote.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch PDF notes' });
  }
};

export const getPdfNote = async (req: Request, res: Response) => {
  try {
    const note = await PdfNote.findById(req.params.id);
    if (!note) return res.status(404).json({ error: 'PDF note not found' });
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch PDF note' });
  }
};

export const uploadPdfNote = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const pdfUrl = req.file ? `/uploads/pdfs/${req.file.filename}` : '';
    const { title, description, tags } = req.body;
    const note = new PdfNote({
      title,
      description,
      pdfUrl,
      tags: tags ? JSON.parse(tags) : [],
    });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ error: 'Failed to upload PDF note' });
  }
};
