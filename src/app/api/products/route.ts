import { NextRequest, NextResponse } from 'next/server'

// Mock product data matching the Sanity structure
const mockProducts = [
  {
    _id: '1',
    title: 'Dashboard UI Kit',
    slug: { current: 'dashboard-ui-kit' },
    price: 49,
    salePrice: 29,
    images: [
      { asset: { url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop' } }
    ],
    freebie: false,
    featured: true,
    description: 'Complete dashboard UI kit with 50+ components',
    category: {
      title: 'UI Kits',
      slug: { current: 'ui-kits' }
    },
    author: {
      name: 'Design Studio',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
      slug: { current: 'design-studio' }
    },
    stats: {
      likes: 234,
      rating: 4.8,
      reviewsCount: 89
    }
  },
  {
    _id: '2',
    title: 'Mobile App Templates',
    slug: { current: 'mobile-app-templates' },
    price: 0,
    images: [
      { asset: { url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop' } }
    ],
    freebie: true,
    featured: true,
    description: 'Beautiful mobile app templates for iOS and Android',
    category: {
      title: 'Mobile',
      slug: { current: 'mobile' }
    },
    author: {
      name: 'UI Designer',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b587?w=150&h=150&fit=crop',
      slug: { current: 'ui-designer' }
    },
    stats: {
      likes: 567,
      rating: 4.9,
      reviewsCount: 234
    }
  },
  {
    _id: '3',
    title: 'E-commerce Website Kit',
    slug: { current: 'ecommerce-website-kit' },
    price: 89,
    salePrice: 59,
    images: [
      { asset: { url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop' } }
    ],
    freebie: false,
    featured: false,
    description: 'Complete e-commerce solution with shopping cart',
    category: {
      title: 'Web Templates',
      slug: { current: 'web-templates' }
    },
    author: {
      name: 'Web Studio',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
      slug: { current: 'web-studio' }
    },
    stats: {
      likes: 423,
      rating: 4.7,
      reviewsCount: 156
    }
  },
  {
    _id: '4',
    title: 'Icon Set Collection',
    slug: { current: 'icon-set-collection' },
    price: 0,
    images: [
      { asset: { url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop' } }
    ],
    freebie: true,
    featured: true,
    description: '500+ premium icons for your projects',
    category: {
      title: 'Icons',
      slug: { current: 'icons' }
    },
    author: {
      name: 'Icon Designer',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
      slug: { current: 'icon-designer' }
    },
    stats: {
      likes: 890,
      rating: 4.6,
      reviewsCount: 345
    }
  },
  {
    _id: '5',
    title: 'Landing Page Template',
    slug: { current: 'landing-page-template' },
    price: 39,
    images: [
      { asset: { url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop' } }
    ],
    freebie: false,
    featured: false,
    description: 'Modern landing page template with animations',
    category: {
      title: 'Web Templates',
      slug: { current: 'web-templates' }
    },
    author: {
      name: 'Creative Agency',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
      slug: { current: 'creative-agency' }
    },
    stats: {
      likes: 312,
      rating: 4.5,
      reviewsCount: 78
    }
  },
  {
    _id: '6',
    title: 'Social Media Kit',
    slug: { current: 'social-media-kit' },
    price: 25,
    images: [
      { asset: { url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop' } }
    ],
    freebie: false,
    featured: true,
    description: 'Complete social media templates and graphics',
    category: {
      title: 'Graphics',
      slug: { current: 'graphics' }
    },
    author: {
      name: 'Social Designer',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b587?w=150&h=150&fit=crop',
      slug: { current: 'social-designer' }
    },
    stats: {
      likes: 678,
      rating: 4.8,
      reviewsCount: 234
    }
  },
  {
    _id: '7',
    title: 'Admin Dashboard',
    slug: { current: 'admin-dashboard' },
    price: 79,
    salePrice: 49,
    images: [
      { asset: { url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop' } }
    ],
    freebie: false,
    featured: false,
    description: 'Professional admin dashboard with charts',
    category: {
      title: 'UI Kits',
      slug: { current: 'ui-kits' }
    },
    author: {
      name: 'Dashboard Pro',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
      slug: { current: 'dashboard-pro' }
    },
    stats: {
      likes: 445,
      rating: 4.7,
      reviewsCount: 167
    }
  },
  {
    _id: '8',
    title: 'Mobile UI Components',
    slug: { current: 'mobile-ui-components' },
    price: 0,
    images: [
      { asset: { url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop' } }
    ],
    freebie: true,
    featured: false,
    description: 'Essential mobile UI components library',
    category: {
      title: 'Mobile',
      slug: { current: 'mobile' }
    },
    author: {
      name: 'Mobile Expert',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
      slug: { current: 'mobile-expert' }
    },
    stats: {
      likes: 723,
      rating: 4.6,
      reviewsCount: 289
    }
  },
  {
    _id: '9',
    title: 'Presentation Template',
    slug: { current: 'presentation-template' },
    price: 35,
    images: [
      { asset: { url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop' } }
    ],
    freebie: false,
    featured: true,
    description: 'Modern presentation template with 50+ slides',
    category: {
      title: 'Presentations',
      slug: { current: 'presentations' }
    },
    author: {
      name: 'Slide Master',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
      slug: { current: 'slide-master' }
    },
    stats: {
      likes: 356,
      rating: 4.9,
      reviewsCount: 123
    }
  },
  {
    _id: '10',
    title: 'Wireframe Kit',
    slug: { current: 'wireframe-kit' },
    price: 0,
    images: [
      { asset: { url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop' } }
    ],
    freebie: true,
    featured: false,
    description: 'Complete wireframe kit for prototyping',
    category: {
      title: 'UI Kits',
      slug: { current: 'ui-kits' }
    },
    author: {
      name: 'UX Designer',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b587?w=150&h=150&fit=crop',
      slug: { current: 'ux-designer' }
    },
    stats: {
      likes: 512,
      rating: 4.4,
      reviewsCount: 198
    }
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const categorySlug = searchParams.get('category')
    const limit = parseInt(searchParams.get('limit') || '24')

    console.log('🛍️ Products API called with category:', categorySlug)

    let products = [...mockProducts]

    // Filter by category if specified
    if (categorySlug) {
      products = products.filter(product =>
        product.category.slug.current === categorySlug
      )
      console.log(`📦 Filtered to ${products.length} products for category: ${categorySlug}`)
    }

    // Limit results
    products = products.slice(0, limit)

    console.log(`✅ Returning ${products.length} products`)

    return NextResponse.json({
      success: true,
      products,
      total: products.length,
      categories: [
        { title: 'UI Kits', slug: { current: 'ui-kits' } },
        { title: 'Mobile', slug: { current: 'mobile' } },
        { title: 'Web Templates', slug: { current: 'web-templates' } },
        { title: 'Icons', slug: { current: 'icons' } },
        { title: 'Graphics', slug: { current: 'graphics' } },
        { title: 'Presentations', slug: { current: 'presentations' } }
      ]
    })
  } catch (error) {
    console.error('Products API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
