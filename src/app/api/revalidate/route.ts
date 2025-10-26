import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

/**
 * On-demand revalidation endpoint for Hygraph webhooks
 *
 * Usage:
 * 1. Set REVALIDATE_SECRET environment variable in Vercel
 * 2. Configure Hygraph webhook to POST to: https://your-domain.vercel.app/api/revalidate
 * 3. Add custom header in Hygraph webhook: X-Revalidate-Secret: YOUR_SECRET
 * 4. When content is published/updated in Hygraph, this endpoint will be called
 * 5. The home page will be revalidated and regenerated with fresh data
 */
export async function POST(request: NextRequest) {
  // Get secret from custom header (more secure than query params)
  const secret = request.headers.get('x-revalidate-secret');

  // Validate secret token
  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json(
      { message: 'Invalid or missing authentication token' },
      { status: 401 },
    );
  }

  try {
    // Revalidate the home page
    revalidatePath('/');

    return NextResponse.json(
      {
        revalidated: true,
        message: 'Successfully revalidated home page',
        timestamp: new Date().toISOString(),
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Error revalidating',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}

// Optional: Handle GET requests for testing
export async function GET() {
  return NextResponse.json(
    {
      message: 'This endpoint only accepts POST requests from Hygraph webhooks',
      usage:
        'POST /api/revalidate with header: X-Revalidate-Secret: YOUR_SECRET',
    },
    { status: 405 },
  );
}
