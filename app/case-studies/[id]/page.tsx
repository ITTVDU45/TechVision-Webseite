import { cache } from "react";
import { permanentRedirect } from "next/navigation";
import CaseStudyTemplate from "../../components/CaseStudyTemplate";
import { caseStudies } from "../../data/caseStudies";
import type { Metadata } from "next";
import {
  fetchPublishedCaseStudyFromDb,
  mapDbCaseStudyToTemplate,
} from "@/lib/case-study-db";

export async function generateStaticParams() {
  return Object.keys(caseStudies).map((id) => ({ id }));
}

const getDbCaseStudy = cache(fetchPublishedCaseStudyFromDb);

interface CaseStudyRouteProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: CaseStudyRouteProps): Promise<Metadata> {
  const { id = "" } = await params;
  const staticData = caseStudies[id as keyof typeof caseStudies];
  if (staticData) {
    return {
      title: staticData.title,
      description: staticData.description ?? staticData.subtitle ?? undefined,
    };
  }

  const db = await getDbCaseStudy(id);
  if (db) {
    return {
      title: db.study.title,
      description: db.study.description ?? db.study.subtitle ?? undefined,
    };
  }

  return {
    title: "Case Study",
    description: undefined,
  };
}

export default async function CaseStudyByIdPage({ params }: CaseStudyRouteProps) {
  const { id = "" } = await params;

  const staticData = caseStudies[id as keyof typeof caseStudies];
  if (staticData) {
    return <CaseStudyTemplate data={staticData} />;
  }

  const db = await getDbCaseStudy(id);
  if (!db) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="text-gray-400">Case Study nicht gefunden</p>
      </div>
    );
  }

  if (db.redirectToSlug) {
    permanentRedirect(`/case-studies/${db.redirectToSlug}`);
  }

  const data = mapDbCaseStudyToTemplate(db.study);
  const othersOverride = db.others.map(mapDbCaseStudyToTemplate);

  return <CaseStudyTemplate data={data} othersOverride={othersOverride} />;
}
