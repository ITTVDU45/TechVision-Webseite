import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IService extends Document {
  name: string;
  icon: string;
  description?: string;
  page: string; // z.B. 'tools', 'web-development', 'it-infrastructure', etc.
  category?: string;
  order?: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    icon: {
      type: String,
      required: [true, 'Icon is required'],
    },
    description: {
      type: String,
    },
    page: {
      type: String,
      required: [true, 'Page is required'],
    },
    category: {
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

const Service: Model<IService> = mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);

export default Service;
