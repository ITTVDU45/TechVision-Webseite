import CaseStudyTemplate from '@/components/CaseStudyTemplate';
import { caseStudies } from '@/data/caseStudies';
import type { Metadata } from 'next';

type Params = { params: { id: string } };

export async function generateStaticParams() {
  return Object.keys(caseStudies).map((id) => ({ id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const data = (caseStudies as Record<string, any>)[params.id];
  return {
    title: data?.title ?? 'Case Study',
    description: data?.summary ?? undefined,
  };
}

export default function CaseStudyByIdPage({ params }: Params) {
  const data = (caseStudies as Record<string, any>)[params.id];
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Case Study nicht gefunden</p>
      </div>
    );
  }
  return <CaseStudyTemplate data={data} />;
}
