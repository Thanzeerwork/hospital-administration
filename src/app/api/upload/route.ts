import { NextRequest, NextResponse } from 'next/server';
import { uploadToR2 } from '@/lib/r2';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as string) || 'uploads';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Sanitize file name and create a unique key
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const key = `${folder}/${Date.now()}-${sanitizedName}`;

    const url = await uploadToR2({
      buffer,
      key,
      contentType: file.type || 'application/octet-stream',
    });

    return NextResponse.json({
      success: true,
      url,
      key,
      size: file.size,
      name: file.name,
      contentType: file.type,
    });
  } catch (error: any) {
    console.error('Error uploading file to Cloudflare R2:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to upload to Cloudflare R2' },
      { status: 500 }
    );
  }
}

