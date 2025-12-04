import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ version: string }> }
) {
  const { version } = await params;
  try {
    // Read the compiled share.js file from public directory
    const filePath = join(process.cwd(), 'public', 'share.js');
    const scriptContent = await readFile(filePath, 'utf-8');

    return new NextResponse(scriptContent, {
      headers: {
        'Content-Type': 'application/javascript',
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Error serving share script:', error);
    return new NextResponse('Script not found', { status: 404 });
  }
}

