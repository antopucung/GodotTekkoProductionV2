'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
// Mock products API integration
import { useResponsive } from '@/hooks/useResponsive'
import { cn } from '@/styles/component-variants'
import { ProductCard } from '@/components/cards'

interface Product {
  _id: string
  title: string
  slug: { current: string }
  price: number
  salePrice?: number
  images?: Array<{ asset: { url: string } }>
  freebie: boolean
  featured?: boolean
  description?: string
  category?: { title: string }
  author?: {
    name: string
    image?: string
    slug?: { current: string }
  }
  stats?: {
    likes?: number
  }
}

type FilterType = 'featured' | 'trending' | 'latest'

interface ProductGridProps {
  categorySlug?: string
  title?: string
  description?: string
}

export default function ProductGrid({ categorySlug, title, description }: ProductGridProps = {}) {
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState<FilterType>('featured')
  const { isMobile } = useResponsive()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Debug logging for category filtering
        console.log('ProductGrid fetchProducts called with categorySlug:', categorySlug)

        // Build API URL with category filter
        const apiUrl = new URL('/api/products', window.location.origin)
        if (categorySlug) {
          apiUrl.searchParams.set('category', categorySlug)
        }

        console.log('Fetching from API:', apiUrl.toString())

        const response = await fetch(apiUrl.toString())
        const data = await response.json()

        if (data.success) {
          console.log('Products fetched for category', categorySlug, ':', data.products?.length || 0)
          setAllProducts(data.products || [])
        } else {
          console.error('API response error:', data.error)
          setAllProducts([])
        }
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [categorySlug])

  // Filter products based on active filter
  useEffect(() => {
    if (!allProducts.length) return

    let filtered = [...allProducts]

    switch (activeFilter) {
      case 'featured':
        // Show featured products first, then others
        filtered = allProducts.sort((a, b) => {
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return 0
        })
        break
      case 'trending':
        // Sort by likes (most liked first)
        filtered = allProducts.sort((a, b) => {
          const aLikes = a.stats?.likes || 0
          const bLikes = b.stats?.likes || 0
          return bLikes - aLikes
        })
        break
      case 'latest':
        // Already sorted by _createdAt desc in query
        filtered = allProducts
        break
    }

    setFilteredProducts(filtered)
  }, [allProducts, activeFilter])

  if (loading) {
    return (
      <section className="section-ui8 bg-ui8-background">
        <div className="container-ui8">
          {/* Filter Buttons Skeleton */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center space-x-2 bg-gray-800 rounded-full p-1">
              {['Featured', 'Trending', 'Latest'].map((_, i) => (
                <div key={i} className="h-10 w-24 bg-gray-700 rounded-full animate-pulse" />
              ))}
            </div>
          </div>

          {/* Products Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 animate-pulse">
                <div className="aspect-[4/3] bg-gradient-to-br from-purple-500 to-blue-600" />
                <div className="bg-white p-4 space-y-3">
                  <div className="flex justify-between">
                    <div className="h-5 bg-gray-200 rounded w-2/3" />
                    <div className="h-6 bg-gray-200 rounded w-16" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-gray-200 rounded-full" />
                      <div className="h-3 bg-gray-200 rounded w-20" />
                    </div>
                    <div className="h-6 bg-gray-200 rounded w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section-ui8 bg-ui8-background">
      <div className="container-ui8">
        {/* Filter Buttons - Only show on homepage (when no categorySlug) */}
        {!categorySlug && (
          <div className="flex justify-center mb-12">
            <div className="flex items-center space-x-2 bg-gray-800/50 rounded-full p-1 backdrop-blur-sm border border-gray-700">
              {[
                { key: 'featured' as FilterType, label: 'Featured' },
                { key: 'trending' as FilterType, label: 'Trending' },
                { key: 'latest' as FilterType, label: 'Latest' }
              ].map(({ key, label }) => (
                <Button
                  key={key}
                  onClick={() => setActiveFilter(key)}
                  className={cn(
                    "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
                    activeFilter === key
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-gray-300 hover:text-white hover:bg-gray-700"
                  )}
                  variant="ghost"
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Unified Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product._id}
              product={product}
              variant="homepage"
              showQuickActions={true}
              index={index}
            />
          ))}
        </div>

        {/* View More Button - Only show on homepage */}
        {!categorySlug && (
          <div className="text-center mt-16">
            <Link href="/products">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium px-8 py-3 text-sm transition-all duration-300 hover:scale-105">
                View more
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
