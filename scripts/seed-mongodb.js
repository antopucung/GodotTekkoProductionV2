#!/usr/bin/env node

/**
 * MongoDB Seed Script
 * Populates MongoDB with initial data from mock data
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });
dotenv.config({ path: path.join(__dirname, '..', '.env.production') });

// MongoDB URI - prioritize the one from environment
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/godot-tekko';

// Mock data for products (UI8 marketplace style)
const mockProducts = [
  {
    title: 'Dashboard UI Kit',
    slug: 'dashboard-ui-kit',
    description: 'Complete dashboard UI kit with 50+ components for building modern admin panels',
    price: 49,
    salePrice: 29,
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
    category: 'UI Kits',
    tags: ['dashboard', 'admin', 'ui-kit', 'components'],
    featured: true,
    freebie: false,
    author: {
      name: 'Design Studio',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop'
    },
    stats: {
      downloads: 1234,
      likes: 567,
      rating: 4.8,
      reviews: 89
    },
    files: ['Dashboard-UI-Kit.zip'],
    fileSize: '12.5 MB',
    compatibleWith: ['Figma', 'Sketch', 'Adobe XD'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20')
  },
  {
    title: 'Mobile App Templates',
    slug: 'mobile-app-templates',
    description: 'Beautiful mobile app templates for iOS and Android with 30+ screens',
    price: 0,
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
    category: 'Mobile',
    tags: ['mobile', 'ios', 'android', 'templates'],
    featured: true,
    freebie: true,
    author: {
      name: 'UI Designer',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b587?w=150&h=150&fit=crop'
    },
    stats: {
      downloads: 5678,
      likes: 890,
      rating: 4.9,
      reviews: 234
    },
    files: ['Mobile-Templates.sketch'],
    fileSize: '8.2 MB',
    compatibleWith: ['Sketch', 'Figma'],
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-18')
  },
  {
    title: 'E-commerce Website Kit',
    slug: 'ecommerce-website-kit',
    description: 'Complete e-commerce solution with shopping cart, checkout, and product pages',
    price: 89,
    salePrice: 59,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    category: 'Web Templates',
    tags: ['ecommerce', 'website', 'shopping', 'template'],
    featured: false,
    freebie: false,
    author: {
      name: 'Web Studio',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop'
    },
    stats: {
      downloads: 2345,
      likes: 432,
      rating: 4.7,
      reviews: 156
    },
    files: ['Ecommerce-Kit.zip'],
    fileSize: '24.8 MB',
    compatibleWith: ['HTML', 'React', 'Vue'],
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-19')
  },
  {
    title: 'Icon Set Collection',
    slug: 'icon-set-collection',
    description: '500+ premium icons for your projects in multiple formats',
    price: 0,
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
    category: 'Icons',
    tags: ['icons', 'graphics', 'svg', 'collection'],
    featured: true,
    freebie: true,
    author: {
      name: 'Icon Designer',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop'
    },
    stats: {
      downloads: 8901,
      likes: 1234,
      rating: 4.6,
      reviews: 345
    },
    files: ['Icons-Collection.zip'],
    fileSize: '3.4 MB',
    compatibleWith: ['SVG', 'PNG', 'Figma'],
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-22')
  },
  {
    title: 'Landing Page Template',
    slug: 'landing-page-template',
    description: 'Modern landing page template with animations and responsive design',
    price: 39,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    category: 'Web Templates',
    tags: ['landing', 'page', 'website', 'template'],
    featured: false,
    freebie: false,
    author: {
      name: 'Creative Agency',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop'
    },
    stats: {
      downloads: 1567,
      likes: 234,
      rating: 4.5,
      reviews: 78
    },
    files: ['Landing-Page.html', 'assets.zip'],
    fileSize: '5.6 MB',
    compatibleWith: ['HTML', 'CSS', 'JavaScript'],
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-21')
  },
  {
    title: 'Social Media Kit',
    slug: 'social-media-kit',
    description: 'Complete social media templates and graphics for all platforms',
    price: 25,
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
    category: 'Graphics',
    tags: ['social', 'media', 'templates', 'graphics'],
    featured: true,
    freebie: false,
    author: {
      name: 'Social Designer',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b587?w=150&h=150&fit=crop'
    },
    stats: {
      downloads: 3456,
      likes: 678,
      rating: 4.8,
      reviews: 234
    },
    files: ['Social-Media-Kit.zip'],
    fileSize: '15.7 MB',
    compatibleWith: ['Photoshop', 'Canva', 'Figma'],
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-23')
  }
];

// Mock courses data
const mockCourses = [
  {
    title: 'Complete Game Development with Godot',
    description: 'Learn to create 2D and 3D games from scratch using the Godot engine',
    thumbnail: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=400&h=225&fit=crop',
    instructor: {
      name: 'Alex Johnson',
      bio: 'Game developer with 8+ years of experience'
    },
    duration: '12 hours',
    difficulty: 'Beginner',
    category: 'Game Development',
    rating: 4.8,
    enrolled: 1247,
    price: 0,
    featured: true,
    published: true,
    lessons: [
      {
        title: 'Introduction to Godot',
        description: 'Setting up your development environment',
        duration: '15 minutes',
        order: 1,
        free: true
      },
      {
        title: 'Creating Your First Scene',
        description: 'Understanding nodes and scenes in Godot',
        duration: '25 minutes',
        order: 2,
        free: true
      }
    ]
  },
  {
    title: '3D Character Modeling in Blender',
    description: 'Master the art of creating game-ready characters with professional techniques',
    thumbnail: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=400&h=225&fit=crop',
    instructor: {
      name: 'Maria Rodriguez',
      bio: '3D artist specializing in character design'
    },
    duration: '8 hours',
    difficulty: 'Intermediate',
    category: '3D Modeling',
    rating: 4.9,
    enrolled: 892,
    price: 49,
    featured: false,
    published: true,
    lessons: [
      {
        title: 'Blender Interface for Character Modeling',
        description: 'Navigate Blender efficiently for character work',
        duration: '20 minutes',
        order: 1,
        free: true
      }
    ]
  },
  {
    title: 'UI/UX Design for Games',
    description: 'Create intuitive and engaging user interfaces for modern games',
    thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=225&fit=crop',
    instructor: {
      name: 'David Kim',
      bio: 'UI/UX designer with focus on game interfaces'
    },
    duration: '6 hours',
    difficulty: 'Beginner',
    category: 'UI/UX Design',
    rating: 4.7,
    enrolled: 634,
    price: 0,
    featured: true,
    published: true,
    lessons: [
      {
        title: 'Game UI Design Principles',
        description: 'Understanding player psychology and interface design',
        duration: '30 minutes',
        order: 1,
        free: true
      }
    ]
  }
];

// Mock projects data for Play Station
const mockProjects = [
  {
    title: 'Cyber Runners',
    slug: 'cyber-runners',
    description: 'A cyberpunk racing game built with Godot 4',
    year: 2024,
    status: 'released',
    poster: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=1200&fit=crop',
    studio: 'Neon Games',
    platforms: ['PC', 'Steam', 'Console'],
    genre: ['Racing', 'Cyberpunk'],
    tech: ['Godot 4', 'C#', 'Blender'],
    featured: true,
    approved: true,
    submittedBy: 'admin',
    stats: {
      views: 15600,
      likes: 342,
      downloads: 1250
    }
  },
  {
    title: 'Medieval Legends',
    slug: 'medieval-legends',
    description: 'Open-world RPG development insights',
    year: 2024,
    status: 'released',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=1200&fit=crop',
    studio: 'Forge Studios',
    platforms: ['PC', 'PlayStation', 'Xbox'],
    genre: ['RPG', 'Open World'],
    tech: ['Unity', 'C#', 'Maya'],
    featured: true,
    approved: true,
    submittedBy: 'admin',
    stats: {
      views: 28900,
      likes: 567,
      downloads: 2100
    }
  },
  {
    title: 'Quantum Puzzle',
    slug: 'quantum-puzzle',
    description: 'Innovative puzzle mechanics using quantum physics concepts',
    year: 2023,
    status: 'released',
    poster: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&h=1200&fit=crop',
    studio: 'Mind Bender Games',
    platforms: ['PC', 'Mobile'],
    genre: ['Puzzle', 'Sci-Fi'],
    tech: ['Godot 3.5', 'GDScript'],
    featured: false,
    approved: true,
    submittedBy: 'user',
    stats: {
      views: 12400,
      likes: 289,
      downloads: 890
    }
  }
];

async function seedDatabase() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    console.log('URI:', MONGODB_URI);

    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connected to MongoDB');

    // Import models (CommonJS style)
    const Course = require('../src/lib/models/Course').Course ||
                   require('../src/lib/models/Course').default;
    const Project = require('../src/lib/models/Project').Project ||
                    require('../src/lib/models/Project').default;

    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log('🧹 Clearing existing data...');
    await Course.deleteMany({});
    await Project.deleteMany({});

    // Seed courses
    console.log('📚 Seeding courses...');
    for (const courseData of mockCourses) {
      const course = new Course(courseData);
      await course.save();
      console.log(`  ✅ Created course: ${courseData.title}`);
    }

    // Seed projects
    console.log('🎮 Seeding projects...');
    for (const projectData of mockProjects) {
      const project = new Project(projectData);
      await project.save();
      console.log(`  ✅ Created project: ${projectData.title}`);
    }

    // Note about products
    console.log('\n📦 Note: Product data is handled by mock API endpoints');
    console.log('   Products will be available through /api/products endpoint');

    console.log('\n🎉 Database seeding completed successfully!');
    console.log(`✅ ${mockCourses.length} courses created`);
    console.log(`✅ ${mockProjects.length} projects created`);
    console.log(`✅ ${mockProducts.length} products available via API`);

    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seeding
seedDatabase();
