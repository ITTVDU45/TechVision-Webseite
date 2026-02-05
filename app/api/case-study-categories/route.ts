import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import CaseStudyCategory from '@/lib/models/CaseStudyCategory';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(request: NextRequest) {
  const defaultCategories = [
    { id: 'beratung', name: 'Beratung', order: 0 },
    { id: 'webseiten', name: 'Webseiten', order: 1 },
    { id: 'software', name: 'Software', order: 2 },
    { id: 'onlineshop', name: 'Onlineshop', order: 3 },
    { id: 'tools-ki-agenten', name: 'Tools & KI Agenten', order: 4 },
  ];

  try {
    if (!process.env.MONGODB_URI) {
      // Fallback auf Standard-Kategorien
      return NextResponse.json(defaultCategories);
    }

    await connectDB();
    const categories = await CaseStudyCategory.find().sort({ order: 1 }).lean();
    
    // Wenn keine Kategorien in der DB sind, gib Standard-Kategorien zurück
    if (!categories || categories.length === 0) {
      return NextResponse.json(defaultCategories);
    }
    
    // Konvertiere MongoDB-Dokumente zu einfachen Objekten
    const formattedCategories = categories.map((cat: any) => ({
      id: cat.id,
      name: cat.name,
      order: cat.order || 0,
    }));
    
    return NextResponse.json(formattedCategories);
  } catch (error) {
    console.error('Error fetching case study categories:', error);
    // Fallback auf Standard-Kategorien
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

    await connectDB();
    const body = await request.json();

    if (!body.name || body.name.trim() === '') {
      return NextResponse.json({ error: 'Name ist erforderlich' }, { status: 400 });
    }

    // Generiere ID aus Name
    const id = body.id || body.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Prüfe, ob ID bereits existiert
    const existing = await CaseStudyCategory.findOne({ $or: [{ id }, { name: body.name }] });
    if (existing) {
      return NextResponse.json({ error: 'Eine Kategorie mit diesem Namen oder ID existiert bereits' }, { status: 400 });
    }

    const category = await CaseStudyCategory.create({
      id,
      name: body.name.trim(),
      order: body.order || 0,
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error: any) {
    console.error('Error creating category:', error);
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

    await connectDB();
    const body = await request.json();
    const { _id, id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    if (updateData.name && updateData.name.trim() === '') {
      return NextResponse.json({ error: 'Name ist erforderlich' }, { status: 400 });
    }

    // Prüfe, ob Name bereits von einer anderen Kategorie verwendet wird
    if (updateData.name) {
      const existing = await CaseStudyCategory.findOne({ 
        name: updateData.name.trim(),
        id: { $ne: id }
      });
      if (existing) {
        return NextResponse.json({ error: 'Eine Kategorie mit diesem Namen existiert bereits' }, { status: 400 });
      }
    }

    const category = await CaseStudyCategory.findOneAndUpdate(
      { id },
      updateData,
      { new: true, runValidators: true }
    );

    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    return NextResponse.json(category);
  } catch (error: any) {
    console.error('Error updating category:', error);
    if (error.code === 11000) {
      return NextResponse.json({ error: 'Eine Kategorie mit diesem Namen existiert bereits' }, { status: 400 });
    }
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

    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    await CaseStudyCategory.findOneAndDelete({ id });

    return NextResponse.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
  }
}
