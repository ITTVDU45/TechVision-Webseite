import CaseStudyTemplate from '../../components/CaseStudyTemplate';
import { caseStudies } from '../../data/caseStudies';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return Object.keys(caseStudies).map((id) => ({ id }));
}

export async function generateMetadata(props: any): Promise<Metadata> {
  const { params } = await props;
  const data = caseStudies[(params?.id ?? '') as keyof typeof caseStudies];
  return {
    title: data?.title ?? 'Case Study',
    description: data?.summary ?? undefined,
  };
}

export default async function CaseStudyByIdPage(props: any) {
  const { params } = await props;
  const data = caseStudies[(params?.id ?? '') as keyof typeof caseStudies];
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Case Study nicht gefunden</p>
      </div>
    );
  }
  return <CaseStudyTemplate data={data} />;
}
