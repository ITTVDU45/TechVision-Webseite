import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPageContent extends Document {
  page: string; // z.B. 'home', 'ki-transformation', etc.
  section: string; // z.B. 'hero', 'benefits', etc.
  title?: string;
  subtitle?: string;
  description?: string;
  content?: Record<string, any>; // Flexible JSON für verschiedene Inhalte
  createdAt: Date;
  updatedAt: Date;
}

const PageContentSchema = new Schema<IPageContent>(
  {
    page: {
      type: String,
      required: [true, 'Page is required'],
    },
    section: {
      type: String,
      required: [true, 'Section is required'],
    },
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
    description: {
      type: String,
    },
    content: {
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
);

PageContentSchema.index({ page: 1, section: 1 }, { unique: true });

const PageContent: Model<IPageContent> = mongoose.models.PageContent || mongoose.model<IPageContent>('PageContent', PageContentSchema);

export default PageContent;
