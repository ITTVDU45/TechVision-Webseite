import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import CaseStudy from '@/lib/models/CaseStudy';
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
      console.error('MongoDB connection error in case studies API:', dbError?.message);
      return NextResponse.json([]);
    }

    const session = await getServerSession(authOptions);
    const isAdmin = !!session;

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const published = searchParams.get('published');
    const pageParam = searchParams.get('page');

    const query: Record<string, unknown> = {};

    if (!isAdmin) {
      query.published = { $ne: false };
    }
    if (isAdmin && published === 'true') {
      query.published = true;
    }

    if (category) {
      query.category = category;
    }

    // Öffentlich: nur Case Studies, die für diese Seite vorgesehen sind (oder global ohne page)
    if (pageParam && !isAdmin) {
      const aliases =
        pageParam === 'home' || pageParam === 'marketing'
          ? ['home', 'marketing']
          : [pageParam];
      query.$or = [
        { page: { $exists: false } },
        { page: { $size: 0 } },
        { page: { $in: aliases } },
      ];
    }

    const caseStudies = await CaseStudy.find(query).sort({ createdAt: -1 }).lean();

    return NextResponse.json(caseStudies);
  } catch (error: any) {
    console.error('Error fetching case studies:', error);
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

    console.log('Received case study data:', JSON.stringify(body, null, 2));
    
    // Validierung der erforderlichen Felder
    if (!body.id || body.id.trim() === '') {
      return NextResponse.json({ error: 'ID ist erforderlich' }, { status: 400 });
    }
    if (!body.title || body.title.trim() === '') {
      return NextResponse.json({ error: 'Titel ist erforderlich' }, { status: 400 });
    }
    if (!body.subtitle || body.subtitle.trim() === '') {
      return NextResponse.json({ error: 'Untertitel ist erforderlich' }, { status: 400 });
    }
    if (!body.description || body.description.trim() === '') {
      return NextResponse.json({ error: 'Beschreibung ist erforderlich' }, { status: 400 });
    }
    
    // Stelle sicher, dass stats ein Array ist und alle Stats gültig sind
    if (!body.stats || !Array.isArray(body.stats)) {
      body.stats = [];
    } else {
      // Filtere ungültige Stats heraus (fehlende value oder label)
      body.stats = body.stats.filter((stat: any) => 
        stat && stat.value && stat.value.trim() !== '' && stat.label && stat.label.trim() !== ''
      );
    }
    
    // Stelle sicher, dass category ein Array ist
    if (!body.category || (Array.isArray(body.category) && body.category.length === 0)) {
      body.category = [];
    } else if (!Array.isArray(body.category)) {
      // Konvertiere String zu Array für Rückwärtskompatibilität
      body.category = body.category === '' ? [] : [body.category];
    }
    // Entferne leere Strings aus dem Array
    if (Array.isArray(body.category)) {
      body.category = body.category.filter((c: string) => c && c.trim() !== '');
    }
    
    // Stelle sicher, dass published gesetzt ist
    if (body.published === undefined || body.published === null) {
      body.published = true;
    }
    
    // Stelle sicher, dass image gesetzt ist (optional, aber mit Fallback)
    if (!body.image || body.image.trim() === '') {
      body.image = 'https://via.placeholder.com/800x400/1a1a1a/ffffff?text=Case+Study';
    }
    
    // Stelle sicher, dass page ein Array ist
    if (!body.page || (Array.isArray(body.page) && body.page.length === 0)) {
      body.page = [];
    } else if (!Array.isArray(body.page)) {
      // Konvertiere String zu Array für Rückwärtskompatibilität
      body.page = body.page === 'all' || body.page === '' ? [] : [body.page];
    }
    // Entferne 'all' aus dem Array, falls vorhanden
    if (Array.isArray(body.page)) {
      body.page = body.page.filter((p: string) => p && p !== 'all' && p !== '');
    }
    
    // Prüfe, ob die ID bereits existiert
    if (body.id) {
      const existingCaseStudy = await CaseStudy.findOne({ id: body.id });
      if (existingCaseStudy) {
        return NextResponse.json({ 
          error: 'Ein Case Study mit dieser ID existiert bereits. Bitte wählen Sie eine andere ID.' 
        }, { status: 400 });
      }
    }
    
    const caseStudy = await CaseStudy.create(body);

    return NextResponse.json(caseStudy, { status: 201 });
  } catch (error: any) {
    console.error('Error creating case study:', error);
    console.error('Error stack:', error.stack);
    console.error('Error name:', error.name);
    
    // Detaillierte Fehlermeldung zurückgeben
    let errorMessage = 'Failed to create case study';
    if (error.code === 11000) {
      errorMessage = 'Ein Case Study mit dieser ID existiert bereits. Bitte wählen Sie eine andere ID.';
    } else if (error.errors) {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message).join(', ');
      errorMessage = `Validierungsfehler: ${validationErrors}`;
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    // Gebe auch die Details zurück, aber nur in Development
    const errorResponse: any = { error: errorMessage };
    if (process.env.NODE_ENV === 'development') {
      errorResponse.details = {
        message: error.message,
        name: error.name,
        code: error.code,
        errors: error.errors,
      };
    }
    
    return NextResponse.json(errorResponse, { status: 500 });
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
    
    // Stelle sicher, dass page ein Array ist
    if (!updateData.page || (Array.isArray(updateData.page) && updateData.page.length === 0)) {
      updateData.page = [];
    } else if (!Array.isArray(updateData.page)) {
      // Konvertiere String zu Array für Rückwärtskompatibilität
      updateData.page = updateData.page === 'all' || updateData.page === '' ? [] : [updateData.page];
    }
    // Entferne 'all' aus dem Array, falls vorhanden
    if (Array.isArray(updateData.page)) {
      updateData.page = updateData.page.filter((p: string) => p && p !== 'all' && p !== '');
    }

    const shouldUnsetImageMeta =
      !String(updateData.image || "").trim() || updateData.imageMeta === null;

    const updateQuery: any = { ...updateData };
    delete updateQuery.imageMeta;

    if (
      !shouldUnsetImageMeta &&
      updateData.imageMeta &&
      typeof updateData.imageMeta === "object"
    ) {
      updateQuery.imageMeta = updateData.imageMeta;
    }

    const caseStudy = shouldUnsetImageMeta
      ? await CaseStudy.findByIdAndUpdate(
          _id,
          { $set: updateQuery, $unset: { imageMeta: 1 } },
          { new: true }
        )
      : await CaseStudy.findByIdAndUpdate(_id, updateQuery, { new: true });

    if (!caseStudy) {
      return NextResponse.json({ error: 'Case study not found' }, { status: 404 });
    }

    return NextResponse.json(caseStudy);
  } catch (error) {
    console.error('Error updating case study:', error);
    return NextResponse.json({ error: 'Failed to update case study' }, { status: 500 });
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

    await CaseStudy.findByIdAndDelete(id);

    return NextResponse.json({ message: 'Case study deleted successfully' });
  } catch (error) {
    console.error('Error deleting case study:', error);
    return NextResponse.json({ error: 'Failed to delete case study' }, { status: 500 });
  }
}
