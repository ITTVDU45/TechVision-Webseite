import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICaseStudyCategory extends Document {
  id: string;
  name: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const CaseStudyCategorySchema = new Schema<ICaseStudyCategory>(
  {
    id: {
      type: String,
      required: [true, 'ID is required'],
      unique: true,
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      unique: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const CaseStudyCategory: Model<ICaseStudyCategory> = 
  mongoose.models.CaseStudyCategory || 
  mongoose.model<ICaseStudyCategory>('CaseStudyCategory', CaseStudyCategorySchema);

export default CaseStudyCategory;
