import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import BlogPost from '@/lib/models/BlogPost';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ error: 'MongoDB is not configured' }, { status: 503 });
    }

    const { slug } = await params;
    await connectDB();
    const blog = await BlogPost.findOne({ 
      $or: [
        { slug: slug },
        { id: slug }
      ],
      published: { $ne: false } // Erlaube auch wenn published undefined ist
    }).lean();

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    // Stelle sicher, dass alle Felder korrekt formatiert sind
    // Normalisiere category zu Array
    let normalizedCategory: Array<{ id: string; name: string; icon: string }> = [];
    if (Array.isArray(blog.category)) {
      normalizedCategory = blog.category;
    } else if (blog.category && typeof blog.category === 'object') {
      // Altes Format: { name: string, icon: string }
      const cat = blog.category as any;
      if (cat.name && cat.icon) {
        const categoryId = cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        normalizedCategory = [{ id: categoryId, name: cat.name, icon: cat.icon }];
      }
    }
    
    const formattedBlog = {
      ...blog,
      _id: blog._id?.toString(),
      category: normalizedCategory,
      tags: Array.isArray(blog.tags) ? blog.tags : (blog.tags ? [blog.tags] : []),
      page: Array.isArray(blog.page) ? blog.page : (blog.page ? [blog.page] : []),
      image: blog.image || 'https://via.placeholder.com/800x400/1a1a1a/ffffff?text=Blog+Image',
    };

    return NextResponse.json(formattedBlog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
  }
}
