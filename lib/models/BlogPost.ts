import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBlogPost extends Document {
  id: string;
  slug?: string; // URL-freundlicher Identifier
  title: string;
  subtitle: string;
  description: string;
  content?: string; // Vollständiger Artikel-Content
  image: string;
  date: string;
  readTime: string;
  category: Array<{
    id: string;
    name: string;
    icon: string;
  }>;
  tags?: string[]; // Array von Tags
  page?: string[]; // Zuordnung zu Seiten (z.B. ['ki-transformation', 'webhosting'])
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema = new Schema<IBlogPost>(
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
    date: {
      type: String,
      required: [true, 'Date is required'],
    },
    readTime: {
      type: String,
      required: [true, 'Read time is required'],
    },
    category: {
      type: [{
        id: { type: String, required: true },
        name: { type: String, required: true },
        icon: { type: String, required: true },
      }],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },
    content: {
      type: String,
      default: '',
    },
    slug: {
      type: String,
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

// Lösche das Modell aus dem Cache, falls es existiert, damit Schema-Änderungen übernommen werden
if (mongoose.models.BlogPost) {
  delete mongoose.models.BlogPost;
}

const BlogPost: Model<IBlogPost> = mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);

export default BlogPost;
