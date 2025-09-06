import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compare, hash } from 'bcryptjs'

// Mock user database
const mockUsers = [
  {
    _id: 'user-1',
    name: 'Demo User',
    email: 'demo@example.com',
    password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewKyNiGhSu6aQDSC', // password: demo123
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    role: 'user' as const,
    verified: true,
    provider: 'credentials' as const
  },
  {
    _id: 'admin-1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewKyNiGhSu6aQDSC', // password: demo123
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    role: 'admin' as const,
    verified: true,
    provider: 'credentials' as const
  }
]

// Mock auth options for when database is not available
export const mockAuthOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'mock-google-id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'mock-google-secret',
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || 'mock-github-id',
      clientSecret: process.env.GITHUB_SECRET || 'mock-github-secret',
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Find user in mock database
        const user = mockUsers.find(u => u.email === credentials.email)

        if (!user || !user.password) {
          return null
        }

        // For demo purposes, accept 'demo123' as password for all mock users
        const isPasswordValid = credentials.password === 'demo123' ||
                               await compare(credentials.password, user.password)

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user._id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // For OAuth providers, create a mock user session
      if (account?.provider === 'google' || account?.provider === 'github') {
        return true
      }
      return true
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
        session.user.image = token.image as string
        session.user.role = token.role as string
        session.user.verified = true
        session.user.emailVerified = new Date().toISOString()
      }
      return session
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.image = user.image
        token.role = (user as any).role || 'user'
      }

      // For OAuth providers
      if (account?.provider === 'google' || account?.provider === 'github') {
        token.id = account.providerAccountId
        token.role = 'user'
      }

      return token
    }
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/welcome'
  },
  secret: process.env.NEXTAUTH_SECRET || 'development-secret-key-change-in-production',
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: process.env.NODE_ENV === 'development'
}

// Mock user functions
export async function getMockUserByEmail(email: string) {
  return mockUsers.find(u => u.email === email) || null
}

export async function getMockUserById(id: string) {
  return mockUsers.find(u => u._id === id) || null
}

export async function createMockUser(userData: any) {
  const hashedPassword = await hash(userData.password, 12)
  const newUser = {
    _id: `user-${Date.now()}`,
    name: userData.name,
    email: userData.email,
    password: hashedPassword,
    image: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=random`,
    role: userData.role || 'user' as const,
    verified: false,
    provider: 'credentials' as const
  }
  mockUsers.push(newUser)
  return newUser
}

// Export info about demo accounts
export const DEMO_ACCOUNTS = [
  {
    email: 'demo@example.com',
    password: 'demo123',
    role: 'User',
    description: 'Regular user account for browsing and purchasing'
  },
  {
    email: 'admin@example.com',
    password: 'demo123',
    role: 'Admin',
    description: 'Admin account with full platform access'
  }
]
