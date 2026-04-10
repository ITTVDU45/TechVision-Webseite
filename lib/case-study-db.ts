import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import CaseStudy from "@/lib/models/CaseStudy";
import type { StoredImageMeta } from "@/lib/stored-image";

function getMongoUri(): string | undefined {
  return process.env.MONGODB_URI?.trim() || process.env.MongoDB_URI?.trim();
}

/** 24-stellige Hex-String — typische MongoDB ObjectId (ohne lose isValid-False-Positives). */
function isProbableObjectId(param: string): boolean {
  return /^[a-f\d]{24}$/i.test(param);
}

export interface CaseStudyDbLean {
  _id: mongoose.Types.ObjectId;
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageMeta?: StoredImageMeta | null;
}

export async function fetchPublishedCaseStudyFromDb(param: string): Promise<{
  study: CaseStudyDbLean;
  others: CaseStudyDbLean[];
  redirectToSlug?: string;
} | null> {
  if (!getMongoUri()) return null;

  try {
    await connectDB();
  } catch {
    return null;
  }

  const published = { published: { $ne: false } as const };

  let study = await CaseStudy.findOne({ id: param, ...published }).lean();
  let matchedByObjectId = false;

  if (!study && isProbableObjectId(param)) {
    try {
      const oid = new mongoose.Types.ObjectId(param);
      study = await CaseStudy.findOne({
        _id: oid,
        ...published,
      }).lean();
      matchedByObjectId = Boolean(study);
    } catch {
      study = null;
    }
  }

  if (!study) return null;

  const redirectToSlug =
    matchedByObjectId && study.id !== param ? study.id : undefined;

  const others = await CaseStudy.find({
    _id: { $ne: study._id },
    ...published,
  })
    .sort({ createdAt: -1 })
    .limit(12)
    .lean();

  return {
    study: study as CaseStudyDbLean,
    others: others as CaseStudyDbLean[],
    redirectToSlug,
  };
}

export function mapDbCaseStudyToTemplate(cs: CaseStudyDbLean): {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
} {
  return {
    id: cs.id,
    title: cs.title,
    subtitle: cs.subtitle,
    description: cs.description,
    image: cs.image || cs.imageMeta?.url || "",
  };
}
