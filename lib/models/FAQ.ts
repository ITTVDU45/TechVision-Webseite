import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IFAQ extends Document {
  question: string;
  answer: string;
  page?: string; // z.B. 'home', 'ki-transformation', 'software-development', etc.
  category?: string; // z.B. 'ki-transformation', 'ki-beratung', 'softwareentwicklung', etc.
  order?: number;
  createdAt: Date;
  updatedAt: Date;
}

const FAQSchema = new Schema<IFAQ>(
  {
    question: {
      type: String,
      required: [true, 'Question is required'],
    },
    answer: {
      type: String,
      required: [true, 'Answer is required'],
    },
    page: {
      type: String,
      default: 'home',
    },
    order: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const FAQ: Model<IFAQ> = mongoose.models.FAQ || mongoose.model<IFAQ>('FAQ', FAQSchema);

export default FAQ;
