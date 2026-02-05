import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import BlogPost from '@/lib/models/BlogPost';
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
      console.error('MongoDB connection error in blogs API:', dbError?.message);
      // Bei Verbindungsfehlern leeres Array zurückgeben statt Fehler
      return NextResponse.json([]);
    }

    const { searchParams } = new URL(request.url);
    const published = searchParams.get('published');

    const query = published === 'true' ? { published: true } : {};
    
    let blogs;
    try {
      blogs = await BlogPost.find(query).sort({ date: -1 }).lean();
    } catch (queryError: any) {
      console.error('Error querying blogs from MongoDB:', queryError?.message);
      // Bei Query-Fehlern (z.B. SSL-Fehler) leeres Array zurückgeben
      return NextResponse.json([]);
    }

    // Stelle sicher, dass tags und page korrekt zurückgegeben werden
    const blogsWithDefaults = blogs.map((blog: any) => {
      return {
        ...blog,
        _id: blog._id?.toString(),
        tags: Array.isArray(blog.tags) ? blog.tags : (blog.tags ? [blog.tags] : []),
        page: Array.isArray(blog.page) ? blog.page : (blog.page ? [blog.page] : []),
        category: Array.isArray(blog.category) ? blog.category : (blog.category ? [blog.category] : []),
      };
    });

    return NextResponse.json(blogsWithDefaults);
  } catch (error: any) {
    console.error('Error fetching blogs:', error);
    // Immer ein Array zurückgeben, auch bei Fehlern
    // Das Frontend kann dann mit einem leeren Array arbeiten
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

    // Stelle sicher, dass alle erforderlichen Felder vorhanden sind
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
    // Bild ist optional - wenn nicht vorhanden, verwende Platzhalter
    if (!body.image || body.image.trim() === '') {
      body.image = 'https://via.placeholder.com/800x400/1a1a1a/ffffff?text=Blog+Image';
    }
    if (!body.date || body.date.trim() === '') {
      return NextResponse.json({ error: 'Datum ist erforderlich' }, { status: 400 });
    }
    if (!body.readTime || body.readTime.trim() === '') {
      return NextResponse.json({ error: 'Lesezeit ist erforderlich' }, { status: 400 });
    }
    // Stelle sicher, dass category ein Array ist
    if (!body.category || (Array.isArray(body.category) && body.category.length === 0)) {
      return NextResponse.json({ error: 'Mindestens eine Kategorie ist erforderlich' }, { status: 400 });
    }
    
    // Konvertiere alte String/Objekt-Format zu Array
    if (!Array.isArray(body.category)) {
      // Altes Format: { name: string, icon: string } -> Array konvertieren
      if (body.category.name && body.category.icon) {
        // Generiere ID aus Name
        const categoryId = body.category.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
        body.category = [{
          id: categoryId,
          name: body.category.name,
          icon: body.category.icon,
        }];
      } else {
        return NextResponse.json({ error: 'Kategorie mit Name und Icon ist erforderlich' }, { status: 400 });
      }
    }
    
    // Validiere alle Kategorien im Array
    for (const cat of body.category) {
      if (!cat.id || !cat.name || !cat.icon) {
        return NextResponse.json({ error: 'Jede Kategorie muss id, name und icon haben' }, { status: 400 });
      }
    }

    // Stelle sicher, dass slug gesetzt ist, wenn nicht vorhanden
    if (!body.slug && body.id) {
      body.slug = body.id;
    }

    // Stelle sicher, dass tags ein Array ist
    if (!body.tags || !Array.isArray(body.tags)) {
      body.tags = [];
    }

    // Stelle sicher, dass content gesetzt ist
    if (body.content === undefined || body.content === null) {
      body.content = '';
    }

    // Stelle sicher, dass published gesetzt ist
    if (body.published === undefined || body.published === null) {
      body.published = true;
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

    console.log('Blog data before save:', JSON.stringify(body, null, 2));

    // Prüfe, ob die ID bereits existiert
    if (body.id) {
      const existingBlog = await BlogPost.findOne({ id: body.id });
      if (existingBlog) {
        return NextResponse.json({
          error: 'Ein Blog mit dieser ID existiert bereits. Bitte wählen Sie eine andere ID.'
        }, { status: 400 });
      }
    }

    // Erstelle den Blog - stelle sicher, dass alle Felder korrekt formatiert sind
    const blogData: any = {
      id: body.id,
      slug: body.slug || body.id,
      title: body.title,
      subtitle: body.subtitle,
      description: body.description,
      content: body.content || '',
      image: body.image,
      date: body.date,
      readTime: body.readTime,
      tags: Array.isArray(body.tags) ? body.tags : [],
      published: body.published !== undefined ? body.published : true,
    };

    // Stelle sicher, dass category ein Array von Objekten ist (als Plain Objects)
    if (Array.isArray(body.category) && body.category.length > 0) {
      blogData.category = body.category.map((cat: any) => {
        // Erstelle Plain Object (kein Mongoose Document)
        return {
          id: String(cat.id || ''),
          name: String(cat.name || ''),
          icon: String(cat.icon || '📝'),
        };
      });
    } else {
      return NextResponse.json({ error: 'Mindestens eine Kategorie ist erforderlich' }, { status: 400 });
    }

    // Stelle sicher, dass page ein Array von Strings ist
    if (Array.isArray(body.page) && body.page.length > 0) {
      blogData.page = body.page
        .filter((p: any) => p && typeof p === 'string' && p !== 'all' && p !== '')
        .map((p: string) => String(p));
    } else {
      blogData.page = [];
    }

    // Verwende new BlogPost() statt create(), um mehr Kontrolle zu haben
    const blog = new BlogPost(blogData);
    await blog.save();

    return NextResponse.json(blog, { status: 201 });
  } catch (error: any) {
    console.error('Error creating blog:', error);
    console.error('Error stack:', error.stack);
    console.error('Error name:', error.name);

    // Detaillierte Fehlermeldung zurückgeben
    let errorMessage = 'Failed to create blog';
    if (error.code === 11000) {
      errorMessage = 'Ein Blog mit dieser ID existiert bereits. Bitte wählen Sie eine andere ID.';
    } else if (error.errors) {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message).join(', ');
      errorMessage = `Validierungsfehler: ${validationErrors}`;
    } else if (error.message) {
      errorMessage = error.message;
    }

    // Gebe auch die Details zurück, aber nur in Development
    const errorResponse: any = { error: errorMessage };
    if (process.env.NODE_ENV === 'development') {
      errorResponse.details = error instanceof Error ? {
        message: error.message,
        stack: error.stack,
        name: error.name
      } : error;
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

    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ error: 'MongoDB is not configured. Please set MONGODB_URI in .env.local' }, { status: 503 });
    }

    await connectDB();
    const body = await request.json();
    const { _id, ...updateData } = body;

    // Stelle sicher, dass slug gesetzt ist, wenn nicht vorhanden
    if (!updateData.slug && updateData.id) {
      updateData.slug = updateData.id;
    }

    // Stelle sicher, dass tags ein Array ist
    if (!updateData.tags || !Array.isArray(updateData.tags)) {
      updateData.tags = [];
    }

    // Stelle sicher, dass content gesetzt ist, wenn nicht vorhanden
    if (updateData.content === undefined || updateData.content === null) {
      updateData.content = '';
    }

    // Stelle sicher, dass tags ein Array ist
    if (!updateData.tags || !Array.isArray(updateData.tags)) {
      updateData.tags = [];
    }

    // Stelle sicher, dass category ein Array ist
    if (updateData.category) {
      if (!Array.isArray(updateData.category)) {
        // Altes Format konvertieren
        if (updateData.category.name && updateData.category.icon) {
          const categoryId = updateData.category.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
          updateData.category = [{
            id: categoryId,
            name: updateData.category.name,
            icon: updateData.category.icon,
          }];
        } else {
          // Wenn category gesetzt ist, aber nicht im erwarteten Format, setze auf leeres Array
          updateData.category = [];
        }
      }
      // Validiere alle Kategorien im Array
      if (Array.isArray(updateData.category)) {
        for (const cat of updateData.category) {
          if (!cat || !cat.id || !cat.name || !cat.icon) {
            return NextResponse.json({ error: 'Jede Kategorie muss id, name und icon haben' }, { status: 400 });
          }
        }
      }
    }
    
    // Stelle sicher, dass page ein Array ist
    if (updateData.page !== undefined) {
      if (!Array.isArray(updateData.page)) {
        updateData.page = updateData.page === 'all' || updateData.page === '' || updateData.page === null ? [] : [updateData.page];
      }
      if (Array.isArray(updateData.page)) {
        updateData.page = updateData.page.filter((p: string) => p && p !== 'all' && p !== '');
      }
    }

    // Erstelle explizites Update-Objekt
    const updateQuery: any = {
      id: updateData.id,
      slug: updateData.slug || updateData.id,
      title: updateData.title,
      subtitle: updateData.subtitle,
      description: updateData.description,
      content: updateData.content || '',
      image: updateData.image,
      date: updateData.date,
      readTime: updateData.readTime,
      category: updateData.category,
      tags: updateData.tags || [],
      published: updateData.published !== undefined ? updateData.published : true,
    };

    // Stelle sicher, dass page ein Array ist
    updateQuery.page = Array.isArray(updateData.page) ? updateData.page : [];

    // Prüfe, ob die ID bereits von einem anderen Blog verwendet wird
    if (updateData.id) {
      const existingBlog = await BlogPost.findOne({ id: updateData.id, _id: { $ne: _id } });
      if (existingBlog) {
        return NextResponse.json({
          error: 'Ein Blog mit dieser ID existiert bereits. Bitte wählen Sie eine andere ID.'
        }, { status: 400 });
      }
    }

    const blog = await BlogPost.findByIdAndUpdate(_id, updateQuery, { new: true, runValidators: true });

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error: any) {
    console.error('Error updating blog:', error);

    // Detaillierte Fehlermeldung zurückgeben
    let errorMessage = 'Failed to update blog';
    if (error.code === 11000) {
      errorMessage = 'Ein Blog mit dieser ID existiert bereits. Bitte wählen Sie eine andere ID.';
    } else if (error.errors) {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message).join(', ');
      errorMessage = `Validierungsfehler: ${validationErrors}`;
    } else if (error.message) {
      errorMessage = error.message;
    }

    const errorDetails = error instanceof Error ? {
      message: error.message,
      stack: error.stack,
      name: error.name
    } : error;

    return NextResponse.json({ error: errorMessage, details: errorDetails }, { status: 500 });
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

    await BlogPost.findByIdAndDelete(id);

    return NextResponse.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
  }
}
