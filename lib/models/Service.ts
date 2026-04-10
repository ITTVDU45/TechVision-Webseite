import mongoose, { Schema, Document, Model } from 'mongoose';
import { storedImageMetaSchema } from '@/lib/models/storedImageMetaSchema';
import type { StoredImageMeta } from '@/lib/stored-image';

export interface IService extends Document {
  name: string;
  icon: string;
  /** Kartenbild (URL, z. B. /images/… oder MinIO) */
  image?: string;
  imageMeta?: StoredImageMeta;
  description?: string;
  /** Platzierung im CMS: Karussell auf der Startseite = "home" */
  page: string;
  category?: string;
  /** Ziel für „Mehr dazu“ (z. B. /ki-transformation) */
  link?: string;
  /** Tailwind-Gradient-Klassen für die Karte */
  gradient?: string;
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
      default: '💼',
    },
    image: {
      type: String,
      default: '',
    },
    imageMeta: {
      type: storedImageMetaSchema,
    },
    description: {
      type: String,
    },
    page: {
      type: String,
      required: [true, 'Page is required'],
    },
    link: {
      type: String,
    },
    gradient: {
      type: String,
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
