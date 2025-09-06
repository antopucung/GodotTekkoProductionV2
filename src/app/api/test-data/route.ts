import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true'

  // Test data response
  const testData = {
    status: 'ok',
    dataMode: USE_MOCK_DATA ? 'MOCK DATA' : 'REAL DATABASE',
    environment: {
      NEXT_PUBLIC_USE_MOCK_DATA: process.env.NEXT_PUBLIC_USE_MOCK_DATA || 'not set',
      MONGODB_URI: process.env.MONGODB_URI ? 'configured' : 'not configured',
      NODE_ENV: process.env.NODE_ENV
    },
    mockData: {
      products: 10,
      courses: 6,
      projects: 6,
      message: USE_MOCK_DATA ? '✅ Using mock data - no database required!' : '⚠️ Attempting to use real database'
    },
    instructions: USE_MOCK_DATA
      ? 'Your platform is using mock data. All features work without database!'
      : 'Set NEXT_PUBLIC_USE_MOCK_DATA=true in Vercel to use mock data'
  }

  return NextResponse.json(testData, { status: 200 })
}
