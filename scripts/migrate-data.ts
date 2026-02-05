/**
 * Migration Script: Importiert statische Daten in MongoDB
 * 
 * Usage: npx tsx scripts/migrate-data.ts
 */

import connectDB from '../lib/mongodb';
import FAQ from '../lib/models/FAQ';
import BlogPost from '../lib/models/BlogPost';
import CaseStudy from '../lib/models/CaseStudy';
import { blogPosts } from '../app/data/blogPosts';
import { categorizedCases, allCaseStudies } from '../app/data/caseStudies';
import { faqs } from '../app/data/faqs';

async function migrateData() {
  try {
    console.log('Connecting to MongoDB...');
    await connectDB();
    console.log('Connected!');

    // Migrate FAQs
    console.log('\nMigrating FAQs...');
    const faqCount = await FAQ.countDocuments();
    if (faqCount === 0) {
      const faqsToInsert = faqs.map((faq, index) => ({
        question: faq.question,
        answer: faq.answer,
        page: (faq as any).page || 'home',
        order: index,
      }));
      await FAQ.insertMany(faqsToInsert);
      console.log(`✓ Imported ${faqsToInsert.length} FAQs`);
    } else {
      console.log(`⚠ FAQs already exist (${faqCount} entries). Skipping...`);
    }

    // Migrate Blog Posts
    console.log('\nMigrating Blog Posts...');
    const blogCount = await BlogPost.countDocuments();
    if (blogCount === 0) {
      const blogsToInsert = blogPosts.map((post) => ({
        id: post.id,
        title: post.title,
        subtitle: post.subtitle,
        description: post.description,
        image: post.image,
        date: post.date,
        readTime: post.readTime,
        category: post.category,
        published: true,
      }));
      await BlogPost.insertMany(blogsToInsert);
      console.log(`✓ Imported ${blogsToInsert.length} blog posts`);
    } else {
      console.log(`⚠ Blog posts already exist (${blogCount} entries). Skipping...`);
    }

    // Migrate Case Studies
    console.log('\nMigrating Case Studies...');
    const caseStudyCount = await CaseStudy.countDocuments();
    if (caseStudyCount === 0) {
      const caseStudiesToInsert = allCaseStudies.map((cs) => {
        const category = Object.keys(categorizedCases).find((cat) =>
          categorizedCases[cat as keyof typeof categorizedCases].some((c) => c.id === cs.id)
        );
        return {
          id: cs.id,
          title: cs.title,
          subtitle: cs.subtitle,
          description: cs.description,
          image: cs.image,
          stats: cs.stats,
          category: category || '',
          published: true,
        };
      });
      await CaseStudy.insertMany(caseStudiesToInsert);
      console.log(`✓ Imported ${caseStudiesToInsert.length} case studies`);
    } else {
      console.log(`⚠ Case studies already exist (${caseStudyCount} entries). Skipping...`);
    }

    console.log('\n✅ Migration completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrateData();
