import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICaseStat {
  value: string;
  label: string;
}

export interface ICaseStudy extends Document {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  stats: ICaseStat[];
  category?: string[];
  page?: string[];
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CaseStatSchema = new Schema<ICaseStat>({
  value: { type: String, required: true },
  label: { type: String, required: true },
}, { _id: false });

const CaseStudySchema = new Schema<ICaseStudy>(
  {
    id: {
      type: String,
      required: [true, 'ID is required'],
      unique: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    subtitle: {
      type: String,
      required: [true, 'Subtitle is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    image: {
      type: String,
      default: '',
    },
    stats: {
      type: [CaseStatSchema],
      default: [],
    },
    category: {
      type: [String],
      default: [],
    },
    page: {
      type: [String],
      default: [],
    },
    published: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const CaseStudy: Model<ICaseStudy> = mongoose.models.CaseStudy || mongoose.model<ICaseStudy>('CaseStudy', CaseStudySchema);

export default CaseStudy;
