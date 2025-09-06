import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/database'
import { Course } from '@/lib/models/Course'
import { Project } from '@/lib/models/Project'

export async function GET(request: NextRequest) {
  try {
    const healthStatus = {
      status: 'checking',
      mongodb: {
        connected: false,
        uri: process.env.MONGODB_URI ? 'configured' : 'not configured',
        error: null as string | null
      },
      data: {
        courses: 0,
        projects: 0,
        usingMockData: false
      },
      environment: {
        MONGODB_URI: process.env.MONGODB_URI ? '✅ Set' : '❌ Not set',
        NEXT_PUBLIC_USE_MOCK_DATA: process.env.NEXT_PUBLIC_USE_MOCK_DATA || 'not set',
        NODE_ENV: process.env.NODE_ENV
      },
      recommendations: [] as string[]
    }

    // Check if we should use mock data
    const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true'

    if (USE_MOCK_DATA) {
      healthStatus.data.usingMockData = true
      healthStatus.mongodb.connected = false
      healthStatus.mongodb.error = 'Using mock data mode (NEXT_PUBLIC_USE_MOCK_DATA=true)'
      healthStatus.status = 'healthy'
      healthStatus.data.courses = 6 // Mock courses count
      healthStatus.data.projects = 6 // Mock projects count

      return NextResponse.json({
        ...healthStatus,
        message: '✅ Platform is using mock data successfully'
      })
    }

    // Try to connect to MongoDB
    console.log('🔄 Attempting MongoDB connection...')
    const db = await connectToDatabase()

    if (db) {
      healthStatus.mongodb.connected = true

      // Try to count documents
      try {
        const courseCount = await Course.countDocuments()
        const projectCount = await Project.countDocuments()

        healthStatus.data.courses = courseCount
        healthStatus.data.projects = projectCount

        if (courseCount === 0 && projectCount === 0) {
          healthStatus.recommendations.push(
            '📝 Database is empty. Run: npm run seed:mongodb to populate with sample data'
          )
        }

        healthStatus.status = 'healthy'
      } catch (countError) {
        console.error('Error counting documents:', countError)
        healthStatus.mongodb.error = 'Connected but cannot query data'
        healthStatus.recommendations.push(
          '⚠️ Database connected but queries failing. Check MongoDB permissions'
        )
      }
    } else {
      healthStatus.mongodb.connected = false
      healthStatus.mongodb.error = 'Cannot connect to MongoDB'
      healthStatus.data.usingMockData = true
      healthStatus.status = 'degraded'

      healthStatus.recommendations.push(
        '💡 Set MONGODB_URI in Vercel environment variables',
        '💡 Or set NEXT_PUBLIC_USE_MOCK_DATA=true to use mock data'
      )
    }

    // Overall health summary
    const summary = healthStatus.mongodb.connected
      ? `✅ Database connected with ${healthStatus.data.courses} courses and ${healthStatus.data.projects} projects`
      : healthStatus.data.usingMockData
      ? '⚠️ Using mock data (database not connected)'
      : '❌ Database not connected and mock data not enabled'

    return NextResponse.json({
      ...healthStatus,
      summary,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Database health check error:', error)

    return NextResponse.json({
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
      mongodb: {
        connected: false,
        uri: process.env.MONGODB_URI ? 'configured' : 'not configured',
        error: 'Health check failed'
      },
      data: {
        courses: 0,
        projects: 0,
        usingMockData: true
      },
      recommendations: [
        '🔧 Check server logs for details',
        '💡 Ensure MongoDB connection string is correct',
        '💡 Set NEXT_PUBLIC_USE_MOCK_DATA=true to bypass database'
      ],
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
