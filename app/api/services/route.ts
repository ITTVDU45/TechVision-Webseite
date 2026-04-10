import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Service from '@/lib/models/Service';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

function getMongoUri(): string | undefined {
  return process.env.MONGODB_URI?.trim() || process.env.MongoDB_URI?.trim();
}

export async function GET(request: NextRequest) {
  try {
    if (!getMongoUri()) {
      return NextResponse.json([]);
    }

    try {
      await connectDB();
    } catch (dbError: any) {
      console.error('MongoDB connection error in services API:', dbError?.message);
      return NextResponse.json([]);
    }

    const session = await getServerSession(authOptions);
    const isAdmin = !!session;

    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page');
    const published = searchParams.get('published');
    /** Admin: nur exakt diese page, ohne marketing-Mix (z. B. Startseiten-Karussell-Verwaltung) */
    const exactPage = searchParams.get('exactPage') === '1' || searchParams.get('exactPage') === 'true';

    const query: Record<string, unknown> = {};

    if (!isAdmin) {
      query.published = { $ne: false };
    }
    if (isAdmin && published === 'true') {
      query.published = true;
    }

    if (page) {
      if (exactPage && isAdmin) {
        query.page = page;
      } else if (page === 'home' || page === 'marketing') {
        query.page = { $in: ['home', 'marketing'] };
      } else {
        query.page = page;
      }
    }

    const services = await Service.find(query).sort({ order: 1, createdAt: -1 }).lean();

    return NextResponse.json(services);
  } catch (error: any) {
    console.error('Error fetching services:', error);
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

    if (!getMongoUri()) {
      return NextResponse.json({ error: 'MongoDB is not configured. Please set MONGODB_URI in .env.local' }, { status: 503 });
    }

    await connectDB();
    const body = await request.json();
    const service = await Service.create(body);

    return NextResponse.json(service.toObject(), { status: 201 });
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!getMongoUri()) {
      return NextResponse.json({ error: 'MongoDB is not configured. Please set MONGODB_URI in .env.local' }, { status: 503 });
    }

    await connectDB();
    const body = await request.json();
    const { _id, ...raw } = body;

    const shouldUnsetImageMeta =
      !String(raw.image || "").trim() || raw.imageMeta === null;

    const updateQuery: Record<string, unknown> = { ...raw };
    delete updateQuery.imageMeta;

    if (
      !shouldUnsetImageMeta &&
      raw.imageMeta &&
      typeof raw.imageMeta === "object"
    ) {
      (updateQuery as { imageMeta?: unknown }).imageMeta = raw.imageMeta;
    }

    const service = shouldUnsetImageMeta
      ? await Service.findByIdAndUpdate(
          _id,
          { $set: updateQuery, $unset: { imageMeta: 1 } },
          { new: true }
        )
      : await Service.findByIdAndUpdate(_id, updateQuery, { new: true });

    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    return NextResponse.json(service);
  } catch (error) {
    console.error('Error updating service:', error);
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!getMongoUri()) {
      return NextResponse.json({ error: 'MongoDB is not configured. Please set MONGODB_URI in .env.local' }, { status: 503 });
    }

    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    await Service.findByIdAndDelete(id);

    return NextResponse.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
  }
}
