import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import PageContent from '@/lib/models/PageContent';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(request: NextRequest) {
  try {
    // Demo-Modus: Leeres Array zurückgeben, wenn MongoDB nicht konfiguriert ist
    if (!process.env.MONGODB_URI) {
      const { searchParams } = new URL(request.url);
      const page = searchParams.get('page');
      const section = searchParams.get('section');
      
      // Wenn spezifische page/section angefragt wird, null zurückgeben
      if (page && section) {
        return NextResponse.json(null);
      }
      // Sonst leeres Array
      return NextResponse.json([]);
    }

    await connectDB();
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page');
    const section = searchParams.get('section');

    if (page && section) {
      const content = await PageContent.findOne({ page, section });
      return NextResponse.json(content);
    } else if (page) {
      const contents = await PageContent.find({ page });
      return NextResponse.json(contents);
    } else {
      const contents = await PageContent.find();
      return NextResponse.json(contents);
    }
  } catch (error) {
    console.error('Error fetching page content:', error);
    // Im Demo-Modus leeres Array zurückgeben statt Fehler
    if (!process.env.MONGODB_URI) {
      return NextResponse.json([]);
    }
    return NextResponse.json({ error: 'Failed to fetch page content' }, { status: 500 });
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

    await connectDB();
    const body = await request.json();
    const content = await PageContent.create(body);

    return NextResponse.json(content, { status: 201 });
  } catch (error) {
    console.error('Error creating page content:', error);
    return NextResponse.json({ error: 'Failed to create page content' }, { status: 500 });
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

    await connectDB();
    const body = await request.json();
    const { _id, page, section, ...updateData } = body;

    const content = await PageContent.findOneAndUpdate(
      { page, section },
      updateData,
      { new: true, upsert: true }
    );

    return NextResponse.json(content);
  } catch (error) {
    console.error('Error updating page content:', error);
    return NextResponse.json({ error: 'Failed to update page content' }, { status: 500 });
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

    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    await PageContent.findByIdAndDelete(id);

    return NextResponse.json({ message: 'Page content deleted successfully' });
  } catch (error) {
    console.error('Error deleting page content:', error);
    return NextResponse.json({ error: 'Failed to delete page content' }, { status: 500 });
  }
}
