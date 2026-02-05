import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPricingPlan extends Document {
  name: string;
  originalPrice: string;
  currentPrice: string;
  features: string[];
  isPopular?: boolean;
  page: string; // z.B. 'webhosting'
  order?: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PricingPlanSchema = new Schema<IPricingPlan>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    originalPrice: {
      type: String,
      required: [true, 'Original price is required'],
    },
    currentPrice: {
      type: String,
      required: [true, 'Current price is required'],
    },
    features: {
      type: [String],
      default: [],
    },
    isPopular: {
      type: Boolean,
      default: false,
    },
    page: {
      type: String,
      required: [true, 'Page is required'],
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

const PricingPlan: Model<IPricingPlan> = mongoose.models.PricingPlan || mongoose.model<IPricingPlan>('PricingPlan', PricingPlanSchema);

export default PricingPlan;
