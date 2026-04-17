/**
 * GET /api/download/[filename]
 *
 * Streams a lead-magnet file from /public/downloads — but only if the
 * filename matches a known entry in lib/lead-magnets. Unknown filenames
 * return 404 so this can't be used to probe /public.
 */

import { NextResponse } from 'next/server';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { ALL_LEAD_MAGNET_FILENAMES } from '@/lib/lead-magnets';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const CONTENT_TYPES: Record<string, string> = {
  '.pdf': 'application/pdf',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  '.xls': 'application/vnd.ms-excel',
  '.zip': 'application/zip',
  '.csv': 'text/csv',
  '.txt': 'text/plain',
};

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params;

  // Whitelist: must match a known lead magnet.
  if (!ALL_LEAD_MAGNET_FILENAMES.includes(filename)) {
    return new NextResponse('Not found', { status: 404 });
  }

  const safeName = path.basename(filename);
  const filePath = path.join(process.cwd(), 'public', 'downloads', safeName);

  try {
    const data = await fs.readFile(filePath);
    const ext = path.extname(safeName).toLowerCase();
    const contentType = CONTENT_TYPES[ext] || 'application/octet-stream';

    return new NextResponse(new Uint8Array(data), {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${safeName}"`,
        'Cache-Control': 'private, max-age=0, must-revalidate',
        'Content-Length': String(data.length),
      },
    });
  } catch (err) {
    console.error('[download/:filename] read error:', err);
    return new NextResponse('File not available', { status: 404 });
  }
}
