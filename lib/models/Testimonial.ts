import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITestimonial extends Document {
  name: string;
  company: string;
  quote: string;
  image?: string;
  page?: string; // Optional: für seiten-spezifische Testimonials
  order?: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    company: {
      type: String,
      required: [true, 'Company is required'],
    },
    quote: {
      type: String,
      required: [true, 'Quote is required'],
    },
    image: {
      type: String,
    },
    page: {
      type: String,
    },
    order: {
      type: Number,
      default: 0,
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

const Testimonial: Model<ITestimonial> = mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);

export default Testimonial;
