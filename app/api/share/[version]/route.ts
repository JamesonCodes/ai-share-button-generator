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
        'Cache-Control': 'public, max-age=300, stale-while-revalidate=86400',
        'Access-Control-Allow-Origin': '*',
        'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; connect-src 'self' https://chat.openai.com https://www.perplexity.ai https://www.google.com; frame-ancestors 'none'; base-uri 'self'",
      },
    });
  } catch (error) {
    console.error('Error serving share script:', error);
    return new NextResponse('Script not found', { status: 404 });
  }
}
