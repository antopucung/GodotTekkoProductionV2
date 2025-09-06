'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import {
  Database,
  CheckCircle,
  XCircle,
  RefreshCw,
  AlertCircle,
  Cloud,
  Server,
  Zap,
  Copy,
  ExternalLink
} from 'lucide-react'
import { toast } from 'sonner'

export default function DatabaseStatusPage() {
  const [status, setStatus] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [copying, setCopying] = useState(false)

  const checkDatabaseStatus = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/health/database')
      const data = await response.json()
      setStatus(data)
    } catch (error) {
      console.error('Failed to check database status:', error)
      setStatus({ error: 'Failed to check database status' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkDatabaseStatus()
  }, [])

  const copyToClipboard = async (text: string) => {
    setCopying(true)
    try {
      await navigator.clipboard.writeText(text)
      toast.success('Copied to clipboard!')
    } catch (error) {
      toast.error('Failed to copy')
    } finally {
      setCopying(false)
    }
  }

  const getStatusIcon = (connected: boolean) => {
    return connected ? (
      <CheckCircle className="w-5 h-5 text-green-500" />
    ) : (
      <XCircle className="w-5 h-5 text-red-500" />
    )
  }

  const getStatusColor = (connected: boolean) => {
    return connected ? 'text-green-600' : 'text-red-600'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-8 text-center">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
              <h2 className="text-xl font-semibold">Checking Database Status...</h2>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Database Status</h1>
          <p className="text-gray-600">Godot Tekko Platform Database Health Check</p>
        </div>

        {/* Overall Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Connection Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>MongoDB Connection:</span>
                <div className="flex items-center gap-2">
                  {getStatusIcon(status?.mongodb?.connected)}
                  <span className={getStatusColor(status?.mongodb?.connected)}>
                    {status?.mongodb?.connected ? 'Connected' : 'Not Connected'}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span>Data Mode:</span>
                <Badge variant={status?.data?.usingMockData ? 'secondary' : 'default'}>
                  {status?.data?.usingMockData ? 'Mock Data' : 'Real Database'}
                </Badge>
              </div>

              {status?.summary && (
                <Alert className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{status.summary}</AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Data Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="w-5 h-5" />
              Data Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-100 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {status?.data?.courses || 0}
                </div>
                <div className="text-sm text-gray-600">Courses</div>
              </div>
              <div className="text-center p-4 bg-gray-100 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {status?.data?.projects || 0}
                </div>
                <div className="text-sm text-gray-600">Projects</div>
              </div>
              <div className="text-center p-4 bg-gray-100 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  10+
                </div>
                <div className="text-sm text-gray-600">Products (Mock)</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Environment Variables */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Environment Configuration
            </CardTitle>
            <CardDescription>Current environment variable settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(status?.environment || {}).map(([key, value]: [string, any]) => (
                <div key={key} className="flex items-center justify-between p-3 bg-gray-100 rounded">
                  <code className="text-sm font-mono">{key}</code>
                  <span className={value?.includes('✅') ? 'text-green-600' : 'text-gray-600'}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cloud className="w-5 h-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>Solutions to fix database connectivity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Option 1: Use Mock Data */}
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold mb-2 text-blue-900">Option 1: Use Mock Data (Immediate)</h3>
              <p className="text-sm text-blue-700 mb-3">
                Enable built-in sample data without any database setup
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <code className="bg-white px-2 py-1 rounded text-xs flex-1">
                    NEXT_PUBLIC_USE_MOCK_DATA=true
                  </code>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard('NEXT_PUBLIC_USE_MOCK_DATA=true')}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-blue-600">
                  Add this to Vercel Environment Variables and redeploy
                </p>
              </div>
            </div>

            {/* Option 2: Connect MongoDB */}
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="font-semibold mb-2 text-green-900">Option 2: Connect MongoDB Atlas</h3>
              <p className="text-sm text-green-700 mb-3">
                Use a real database for production data
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <code className="bg-white px-2 py-1 rounded text-xs flex-1 truncate">
                    MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/godot-tekko
                  </code>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard('MONGODB_URI=')}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-green-600">
                  Get your connection string from MongoDB Atlas
                </p>
                <Button size="sm" variant="link" className="p-0 h-auto" asChild>
                  <a
                    href="https://www.mongodb.com/cloud/atlas"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-700 hover:text-green-800"
                  >
                    Create Free MongoDB Atlas Account
                    <ExternalLink className="w-3 h-3 ml-1 inline" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Recommendations */}
            {status?.recommendations?.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Recommendations:</h3>
                <ul className="space-y-1">
                  {status.recommendations.map((rec: string, index: number) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-blue-500 mt-0.5">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Vercel Deployment Guide */}
        <Card>
          <CardHeader>
            <CardTitle>🚀 Vercel Deployment Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Step 1: Go to Vercel Dashboard</h3>
              <Button size="sm" variant="link" className="p-0" asChild>
                <a
                  href="https://vercel.com/dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open Vercel Dashboard
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </Button>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Step 2: Add Environment Variables</h3>
              <p className="text-sm text-gray-600 mb-2">
                Go to Settings → Environment Variables and add:
              </p>
              <div className="bg-gray-100 p-3 rounded font-mono text-sm">
                NEXT_PUBLIC_USE_MOCK_DATA=true
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Step 3: Redeploy</h3>
              <p className="text-sm text-gray-600">
                Click "Redeploy" to apply the changes
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Refresh Button */}
        <div className="text-center">
          <Button onClick={checkDatabaseStatus} size="lg">
            <RefreshCw className="w-5 h-5 mr-2" />
            Refresh Status
          </Button>
        </div>
      </div>
    </div>
  )
}
