import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import projectRoutes from './routes/projects';
import path from 'path';
import pdfNotesRoutes from './routes/pdfNotes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/uploads/pdfs', express.static(path.join(__dirname, '../uploads/pdfs')));
app.use('/api/projects', projectRoutes);
app.use('/api/pdf-notes', pdfNotesRoutes);

mongoose.connect(process.env.MONGODB_URI as string)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  }); 