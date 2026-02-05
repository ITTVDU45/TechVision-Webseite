import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import PricingPlan from '@/lib/models/PricingPlan';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // Demo-Modus: Leeres Array zurückgeben, wenn MongoDB nicht konfiguriert ist
    if (!process.env.MONGODB_URI) {
      return NextResponse.json([]);
    }

    try {
      await connectDB();
    } catch (dbError: any) {
      console.error('MongoDB connection error in pricing API:', dbError?.message);
      // Bei Verbindungsfehlern leeres Array zurückgeben statt Fehler
      return NextResponse.json([]);
    }

    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page');
    const published = searchParams.get('published');

    const query: any = {};
    if (page) query.page = page;
    if (published === 'true') query.published = true;

    const plans = await PricingPlan.find(query).sort({ order: 1, createdAt: -1 });

    return NextResponse.json(plans);
  } catch (error: any) {
    console.error('Error fetching pricing plans:', error);
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

    await connectDB();
    const body = await request.json();
    const plan = await PricingPlan.create(body);

    return NextResponse.json(plan, { status: 201 });
  } catch (error) {
    console.error('Error creating pricing plan:', error);
    return NextResponse.json({ error: 'Failed to create pricing plan' }, { status: 500 });
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
    const { _id, ...updateData } = body;

    const plan = await PricingPlan.findByIdAndUpdate(_id, updateData, { new: true });

    if (!plan) {
      return NextResponse.json({ error: 'Pricing plan not found' }, { status: 404 });
    }

    return NextResponse.json(plan);
  } catch (error) {
    console.error('Error updating pricing plan:', error);
    return NextResponse.json({ error: 'Failed to update pricing plan' }, { status: 500 });
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

    await PricingPlan.findByIdAndDelete(id);

    return NextResponse.json({ message: 'Pricing plan deleted successfully' });
  } catch (error) {
    console.error('Error deleting pricing plan:', error);
    return NextResponse.json({ error: 'Failed to delete pricing plan' }, { status: 500 });
  }
}
