import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // Demo-Modus: Leere Liste zurückgeben
    if (!process.env.MONGODB_URI) {
      return NextResponse.json([]);
    }

    try {
      const connectDB = (await import('@/lib/mongodb')).default;
      await connectDB();
    } catch (dbError: any) {
      console.error('MongoDB connection error in FAQs API:', dbError?.message);
      // Bei Verbindungsfehlern leeres Array zurückgeben statt Fehler
      return NextResponse.json([]);
    }

    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page');

    const FAQ = (await import('@/lib/models/FAQ')).default;
    const query = page ? { page } : {};
    const faqs = await FAQ.find(query).sort({ order: 1, createdAt: -1 });

    return NextResponse.json(faqs);
  } catch (error: any) {
    console.error('Error fetching FAQs:', error);
    // Immer ein Array zurückgeben, auch bei Fehlern
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ error: 'MongoDB is not configured. Please set MONGODB_URI in .env.local' }, { status: 503 });
    }

    const connectDB = (await import('@/lib/mongodb')).default;
    await connectDB();
    const FAQ = (await import('@/lib/models/FAQ')).default;
    const body = await request.json();
    const faq = await FAQ.create(body);

    return NextResponse.json(faq, { status: 201 });
  } catch (error) {
    console.error('Error creating FAQ:', error);
    return NextResponse.json({ error: 'Failed to create FAQ' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ error: 'MongoDB is not configured. Please set MONGODB_URI in .env.local' }, { status: 503 });
    }

    const connectDB = (await import('@/lib/mongodb')).default;
    await connectDB();
    const FAQ = (await import('@/lib/models/FAQ')).default;
    const body = await request.json();
    const { _id, ...updateData } = body;

    const faq = await FAQ.findByIdAndUpdate(_id, updateData, { new: true });

    if (!faq) {
      return NextResponse.json({ error: 'FAQ not found' }, { status: 404 });
    }

    return NextResponse.json(faq);
  } catch (error) {
    console.error('Error updating FAQ:', error);
    return NextResponse.json({ error: 'Failed to update FAQ' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ error: 'MongoDB is not configured. Please set MONGODB_URI in .env.local' }, { status: 503 });
    }

    const connectDB = (await import('@/lib/mongodb')).default;
    await connectDB();
    const FAQ = (await import('@/lib/models/FAQ')).default;
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    await FAQ.findByIdAndDelete(id);

    return NextResponse.json({ message: 'FAQ deleted successfully' });
  } catch (error) {
    console.error('Error deleting FAQ:', error);
    return NextResponse.json({ error: 'Failed to delete FAQ' }, { status: 500 });
  }
}
