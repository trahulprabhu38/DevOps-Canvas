import express from 'express';
import multer, { StorageEngine } from 'multer';
import path from 'path';
import * as pdfController from '../controllers/pdfController';

const router = express.Router();

const UPLOADS_PATH = process.env.UPLOADS_PATH || path.join(__dirname, '../../uploads/pdfs');

const storage: StorageEngine = multer.diskStorage({
  destination: (req: express.Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    cb(null, UPLOADS_PATH);
  },
  filename: (req: express.Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

router.get('/', pdfController.getPdfNotes);
router.get('/:id', pdfController.getPdfNote);
router.post('/upload', upload.single('pdf'), pdfController.uploadPdfNote);

export default router;
