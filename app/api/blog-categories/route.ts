import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import BlogCategory from '@/lib/models/BlogCategory';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(request: NextRequest) {
  const defaultCategories = [
    { id: 'ki', name: 'KI', icon: '🤖', order: 0 },
    { id: 'software', name: 'Software', icon: '💻', order: 1 },
    { id: 'webentwicklung', name: 'Webentwicklung', icon: '🌐', order: 2 },
    { id: 'automatisierung', name: 'Automatisierung', icon: '⚙️', order: 3 },
    { id: 'cybersecurity', name: 'Cybersecurity', icon: '🔒', order: 4 },
  ];

  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json(defaultCategories);
    }

    try {
      await connectDB();
    } catch (dbError: any) {
      console.error('MongoDB connection error in blog categories API:', dbError?.message);
      return NextResponse.json(defaultCategories);
    }

    const categories = await BlogCategory.find().sort({ order: 1 }).lean();
    
    if (!categories || categories.length === 0) {
      return NextResponse.json(defaultCategories);
    }
    
    const formattedCategories = categories.map((cat: any) => ({
      id: cat.id,
      name: cat.name,
      icon: cat.icon || '📝',
      order: cat.order || 0,
    }));
    
    return NextResponse.json(formattedCategories);
  } catch (error) {
    console.error('Error fetching blog categories:', error);
    return NextResponse.json(defaultCategories);
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ error: 'MongoDB is not configured' }, { status: 503 });
    }

    try {
      await connectDB();
    } catch (dbError: any) {
      console.error('MongoDB connection error:', dbError?.message);
      return NextResponse.json({ error: 'MongoDB connection failed' }, { status: 503 });
    }

    const body = await request.json();

    if (!body.name || body.name.trim() === '') {
      return NextResponse.json({ error: 'Name ist erforderlich' }, { status: 400 });
    }

    const id = body.id || body.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const existing = await BlogCategory.findOne({ $or: [{ id }, { name: body.name }] });
    if (existing) {
      return NextResponse.json({ error: 'Eine Kategorie mit diesem Namen oder ID existiert bereits' }, { status: 400 });
    }

    const category = await BlogCategory.create({
      id,
      name: body.name.trim(),
      icon: body.icon || '📝',
      order: body.order || 0,
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error: any) {
    console.error('Error creating blog category:', error);
    if (error.code === 11000) {
      return NextResponse.json({ error: 'Eine Kategorie mit diesem Namen existiert bereits' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ error: 'MongoDB is not configured' }, { status: 503 });
    }

    try {
      await connectDB();
    } catch (dbError: any) {
      console.error('MongoDB connection error:', dbError?.message);
      return NextResponse.json({ error: 'MongoDB connection failed' }, { status: 503 });
    }

    const body = await request.json();
    const { _id, ...updateData } = body;

    const category = await BlogCategory.findByIdAndUpdate(_id, updateData, { new: true });

    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    return NextResponse.json(category);
  } catch (error: any) {
    console.error('Error updating blog category:', error);
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ error: 'MongoDB is not configured' }, { status: 503 });
    }

    try {
      await connectDB();
    } catch (dbError: any) {
      console.error('MongoDB connection error:', dbError?.message);
      return NextResponse.json({ error: 'MongoDB connection failed' }, { status: 503 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const _id = searchParams.get('_id');

    if (!id && !_id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const query = _id ? { _id } : { id };
    const category = await BlogCategory.findOneAndDelete(query);

    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Category deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting blog category:', error);
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
  }
}
