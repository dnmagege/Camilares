import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    ok: true,
    status: 'healthy',
    service: 'camilares-public',
    backend: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'configured' : 'optional-not-configured',
    timestamp: new Date().toISOString(),
  })
}
