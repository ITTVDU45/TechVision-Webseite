import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBlogCategory extends Document {
  id: string;
  name: string;
  icon: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const BlogCategorySchema = new Schema<IBlogCategory>(
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
    icon: {
      type: String,
      required: [true, 'Icon is required'],
      default: '📝',
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

const BlogCategory: Model<IBlogCategory> = 
  mongoose.models.BlogCategory || 
  mongoose.model<IBlogCategory>('BlogCategory', BlogCategorySchema);

export default BlogCategory;
