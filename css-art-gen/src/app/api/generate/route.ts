/**
 * API Route: /api/generate
 *
 * Handles artwork generation with:
 * - Counter increment
 * - Rate limiting
 * - Input validation
 * - Security checks
 */

import { NextRequest, NextResponse } from 'next/server';
import { incrementCounter, checkRateLimit, getCounter } from '@/lib/counter-cloud';
import { validatePrompt } from '@/lib/security';

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'unknown';

    // Rate limiting check
    const withinRateLimit = await checkRateLimit(ip);
    if (!withinRateLimit) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded',
          message: 'Maximum 10 generations per hour. Please try again later.',
          retryAfter: 3600, // seconds
        },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { fingerprint, promptHash, prompt } = body;

    // Validate inputs
    if (!fingerprint || !promptHash || !prompt) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate prompt (anti-spam, anti-abuse)
    const validation = validatePrompt(prompt);
    if (!validation.valid) {
      return NextResponse.json(
        {
          error: 'Invalid prompt',
          message: validation.reason,
        },
        { status: 400 }
      );
    }

    // Increment counter and register generation
    const generationNumber = await incrementCounter(
      fingerprint,
      promptHash,
      ip
    );

    // Return success with generation number
    return NextResponse.json({
      success: true,
      generationNumber,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Generation API error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: 'Failed to process generation request',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const counter = await getCounter();
    return NextResponse.json({
      totalGenerated: counter.totalGenerated,
      lastGeneration: counter.lastGeneration,
      startedAt: counter.startedAt,
    });
  } catch (error) {
    console.error('Counter API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch counter' },
      { status: 500 }
    );
  }
}
