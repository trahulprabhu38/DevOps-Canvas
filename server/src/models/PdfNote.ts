import mongoose, { Schema, Document } from 'mongoose';

export interface IPdfNote extends Document {
  title: string;
  description?: string;
  pdfUrl: string;
  tags: string[];
}

const PdfNoteSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  pdfUrl: { type: String, required: true },
  tags: [String],
}, { timestamps: true });

export default mongoose.model<IPdfNote>('PdfNote', PdfNoteSchema);
