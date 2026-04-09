import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Testimonial from '@/lib/models/Testimonial';
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
      console.error('MongoDB connection error in testimonials API:', dbError?.message);
      return NextResponse.json([]);
    }

    const session = await getServerSession(authOptions);
    const isAdmin = !!session;

    const { searchParams } = new URL(request.url);
    const pageParam = searchParams.get('page');
    const published = searchParams.get('published');

    const query: Record<string, unknown> = {};

    if (!isAdmin) {
      query.published = { $ne: false };
    }
    if (isAdmin && published === 'true') {
      query.published = true;
    }

    if (pageParam) {
      if (!isAdmin) {
        const aliases =
          pageParam === 'home' || pageParam === 'marketing'
            ? ['home', 'marketing']
            : [pageParam];
        query.$or = [
          { page: { $exists: false } },
          { page: null },
          { page: '' },
          { page: { $in: aliases } },
        ];
      } else {
        if (pageParam === 'home' || pageParam === 'marketing') {
          query.page = { $in: ['home', 'marketing'] };
        } else {
          query.page = pageParam;
        }
      }
    }

    const testimonials = await Testimonial.find(query).sort({ order: 1, createdAt: -1 }).lean();

    return NextResponse.json(testimonials);
  } catch (error: any) {
    console.error('Error fetching testimonials:', error);
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
    if (body.imageMeta === null) delete body.imageMeta;
    const testimonial = await Testimonial.create(body);

    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
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
    const { _id, ...updateData } = body;

    const shouldUnsetImageMeta =
      !String(updateData.image || "").trim() || updateData.imageMeta === null;

    const payload: Record<string, unknown> = { ...updateData };
    delete payload.imageMeta;

    if (
      !shouldUnsetImageMeta &&
      updateData.imageMeta &&
      typeof updateData.imageMeta === "object"
    ) {
      payload.imageMeta = updateData.imageMeta;
    }

    const testimonial = shouldUnsetImageMeta
      ? await Testimonial.findByIdAndUpdate(
          _id,
          { $set: payload, $unset: { imageMeta: 1 } },
          { new: true }
        )
      : await Testimonial.findByIdAndUpdate(_id, payload, { new: true });

    if (!testimonial) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }

    return NextResponse.json(testimonial);
  } catch (error) {
    console.error('Error updating testimonial:', error);
    return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 });
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

    await Testimonial.findByIdAndDelete(id);

    return NextResponse.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 });
  }
}
