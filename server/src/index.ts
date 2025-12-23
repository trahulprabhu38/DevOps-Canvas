import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import projectRoutes from './routes/projects';
import path from 'path';
import pdfNotesRoutes from './routes/pdfNotes';
import { initializeExistingPdfs } from './utils/initPdfs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const UPLOADS_PATH = process.env.UPLOADS_PATH || path.join(__dirname, '../uploads/pdfs');

// Configure CORS to allow all origins
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json());

app.use('/uploads/pdfs', express.static(UPLOADS_PATH));
app.use('/api/projects', projectRoutes);
app.use('/api/pdf-notes', pdfNotesRoutes);

const mongo_uri = process.env.MONGODB_URI;
mongoose.connect(mongo_uri as string)
  .then(async () => {
    console.log('Connected to MongoDB');

    // Initialize existing PDFs from uploads folder
    await initializeExistingPdfs(UPLOADS_PATH);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  }); 