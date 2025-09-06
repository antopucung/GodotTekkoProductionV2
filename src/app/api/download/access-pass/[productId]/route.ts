import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { SimplifiedLicenseManager } from '@/lib/simplified-license-manager'
import { client } from '@/lib/sanity'
import {
  generateSecureDownloadUrl,
  getProductFiles
} from '@/lib/file-delivery'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    // Authentication check
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Extract product ID from params
    const { productId } = await params
    if (!productId) {
      return NextResponse.json({ error: 'Product ID required' }, { status: 400 })
    }

    const userId = session.user.id

    // Check if user has active access pass using simplified manager
    const accessCheck = await SimplifiedLicenseManager.checkAccess(userId)
    const accessPassResult = await SimplifiedLicenseManager.manageAccessPass('get', { userId })

    if (!accessCheck.hasAccess || accessCheck.method !== 'access_pass') {
      return NextResponse.json({
        error: 'Active access pass required',
        hasAccessPass: false,
        canDownload: false,
        message: 'You need an active access pass to download this product. Please purchase an access pass to get unlimited downloads.'
      }, { status: 403 })
    }

    const accessPass = (accessPassResult && typeof accessPassResult !== 'boolean') ? accessPassResult : null

    // Get product information from Sanity
    const productQuery = `*[_type == "product" && _id == $productId][0] {
      _id,
      title,
      slug,
      price,
      salePrice,
      description,
      freebie,
      featured,
      "images": images[] {
        asset-> {
          url
        }
      },
      "categories": categories[]-> {
        name,
        slug
      },
      "author": author-> {
        name,
        slug
      },
      stats {
        likes,
        downloads
      },
      fileTypes,
      _createdAt
    }`

    const product = await client.fetch(productQuery, { productId })

    if (!product) {
      return NextResponse.json({
        error: 'Product not found',
        canDownload: false
      }, { status: 404 })
    }

    // Check if product is eligible for access pass download (non-freebie products)
    if (product.freebie === true) {
      return NextResponse.json({
        error: 'This is a free product and does not require an access pass',
        canDownload: false,
        message: 'Free products can be downloaded without an access pass using the regular download endpoint.'
      }, { status: 400 })
    }

    // Get product files info
    const productFiles = await getProductFiles(productId)
    if (!productFiles.files || productFiles.files.length === 0) {
      return NextResponse.json({
        error: 'No files available for download',
        canDownload: false
      }, { status: 404 })
    }

    // Generate secure download URL for access pass users
    const licenseId = accessPass?._id || `access-pass-${userId}`
    const secureUrl = await generateSecureDownloadUrl(userId, productId, licenseId)

    // Create or update license record for tracking purposes
    try {
      await SimplifiedLicenseManager.createLicense({
        userId,
        productId,
        orderId: `access-pass-${accessPass?._id || 'unlimited'}`,
        licenseType: 'access_pass',
        metadata: {
          accessPassId: accessPass?._id,
          accessPassType: accessPass?.passType,
          downloadMethod: 'access_pass'
        }
      })
    } catch (licenseError) {
      // License creation is for tracking - don't fail the download
      console.warn('Could not create license record for access pass download:', licenseError)
    }

    // Update access pass usage statistics
    if (accessPass) {
      try {
        await SimplifiedLicenseManager.manageAccessPass('update', {
          userId,
          updates: {
            'usage.totalDownloads': (accessPass.usage?.totalDownloads || 0) + 1,
            'usage.lastDownloadAt': new Date().toISOString()
          }
        })
      } catch (updateError) {
        console.warn('Could not update access pass statistics:', updateError)
      }
    }

    return NextResponse.json({
      canDownload: true,
      downloadUrl: secureUrl.url,
      expiresIn: secureUrl.expiresIn,
      files: productFiles.files,
      product: {
        id: product._id,
        title: product.title,
        author: product.author?.name,
        categories: product.categories?.map((cat: any) => cat.name) || []
      },
      accessPass: {
        type: accessPass?.passType,
        isActive: accessCheck.hasAccess,
        benefits: {
          unlimitedDownloads: true,
          commercialLicense: true,
          premiumFeatures: accessPass?.passType === 'yearly' || accessPass?.passType === 'lifetime'
        }
      },
      message: 'Download URL generated successfully via access pass'
    })

  } catch (error) {
    console.error('Error generating access pass download URL:', error)
    return NextResponse.json(
      {
        error: 'Failed to generate download URL',
        canDownload: false,
        message: 'An internal error occurred. Please try again or contact support.'
      },
      { status: 500 }
    )
  }
}

// Handle POST for access pass download analytics (optional)
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { productId } = await params
    const { action } = await request.json()

    // Only track download completion for analytics
    if (action === 'download_completed') {
      const userId = session.user.id

      // Check access pass
      const accessCheck = await SimplifiedLicenseManager.checkAccess(userId)
      if (!accessCheck.hasAccess || accessCheck.method !== 'access_pass') {
        return NextResponse.json({ error: 'Access pass required' }, { status: 403 })
      }

      // Log download completion
      console.log(`Access pass download completed: User ${userId}, Product ${productId}`)

      return NextResponse.json({
        success: true,
        message: 'Download completion recorded'
      })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })

  } catch (error) {
    console.error('Error handling access pass download analytics:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}
