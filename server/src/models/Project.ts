import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  name: string;
  description: string;
  detailedDescription: string;
  githubUrl?: string;
  demoUrl?: string;
  mediumUrl?: string;
  imageUrl: string;
  tags: string[];
  features: string[];
  techStack: string[];
  challenges: string[];
  outcomes: string[];
}

const ProjectSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  detailedDescription: { type: String, required: true },
  githubUrl: String,
  demoUrl: String,
  mediumUrl: String,
  imageUrl: { type: String, required: true },
  tags: [String],
  features: [String],
  techStack: [String],
  challenges: [String],
  outcomes: [String],
}, { timestamps: true });

export default mongoose.model<IProject>('Project', ProjectSchema); 