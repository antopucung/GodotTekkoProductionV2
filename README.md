# 🎮 Godot Tekko Platform - Production Ready

A production-ready digital marketplace platform for Godot game development assets, tools, and learning resources. Optimized for seamless deployment on Vercel with zero configuration errors.

## 🚀 Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/antopucung/GodotTekkoProductionV2)

## ✨ Features

- **Digital Marketplace**: Browse and purchase Godot game assets, tools, and templates
- **Learning Platform**: Comprehensive courses and tutorials for Godot development
- **Creator Dashboard**: Tools for content creators to upload and manage their assets
- **User Management**: Complete authentication system with NextAuth.js
- **Payment Processing**: Integrated Stripe payments with subscription options
- **CMS Integration**: Sanity.io for content management
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **SEO Optimized**: Built-in SEO utilities and structured data

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Database**: MongoDB Atlas
- **CMS**: Sanity.io
- **Authentication**: NextAuth.js
- **Payments**: Stripe
- **Email**: Resend
- **Deployment**: Vercel

## 📋 Prerequisites

Before deploying, ensure you have:

1. **Sanity.io account** and project setup
2. **MongoDB Atlas** database
3. **Stripe account** for payments
4. **Resend account** for emails
5. **Vercel account** for deployment

## 🔧 Environment Setup

1. **Copy the environment template**:
   ```bash
   cp .env.example .env.local
   ```

2. **Update the environment variables** with your actual values:

### Required Variables

| Variable | Description | Where to get it |
|----------|-------------|-----------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID | [Sanity Dashboard](https://sanity.io/manage) |
| `SANITY_API_READ_TOKEN` | Sanity read token | Sanity Project Settings > API |
| `MONGODB_URI` | MongoDB connection string | [MongoDB Atlas](https://cloud.mongodb.com/) |
| `NEXTAUTH_SECRET` | NextAuth secret key | Generate with `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Your app URL | `https://your-app.vercel.app` |
| `STRIPE_SECRET_KEY` | Stripe secret key | [Stripe Dashboard](https://dashboard.stripe.com/) |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret | Stripe Dashboard > Webhooks |
| `RESEND_API_KEY` | Resend API key | [Resend Dashboard](https://resend.com/) |

## 🚀 Deployment Steps

### 1. Deploy to Vercel

1. Click the "Deploy with Vercel" button above, or:
2. Connect your GitHub repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy!

### 2. Configure Webhooks

After deployment, set up Stripe webhooks:

1. Go to Stripe Dashboard > Webhooks
2. Add webhook endpoint: `https://your-app.vercel.app/api/webhooks/stripe`
3. Select events: `payment_intent.succeeded`, `invoice.payment_succeeded`
4. Copy webhook secret to `STRIPE_WEBHOOK_SECRET`

### 3. Configure Domain (Optional)

1. Add custom domain in Vercel dashboard
2. Update `NEXTAUTH_URL` environment variable
3. Update Sanity CORS settings to include your domain

## 🧪 Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/antopucung/GodotTekkoProductionV2.git
   cd GodotTekkoProductionV2
   ```

2. **Install dependencies**:
   ```bash
   bun install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your actual values
   ```

4. **Run the development server**:
   ```bash
   bun dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## 🔍 Key Production Fixes Applied

This repository includes critical fixes for production deployment:

- ✅ **Removed all Sentry dependencies** and references
- ✅ **Fixed Next.js 15 App Router compatibility** (proper async params handling)
- ✅ **Optimized next.config.js** for Vercel deployment
- ✅ **Comprehensive environment variables** configuration
- ✅ **Production-ready build configuration**
- ✅ **Proper TypeScript configuration**
- ✅ **Vercel-optimized settings**

## 📁 Project Structure

```
├── src/
│   ├── app/                    # Next.js 15 App Router pages
│   ├── components/             # React components
│   ├── lib/                    # Utility libraries
│   ├── types/                  # TypeScript type definitions
│   └── styles/                 # Global styles
├── sanity/                     # Sanity.io schemas
├── public/                     # Static assets
├── .env.example               # Environment variables template
├── next.config.js             # Next.js configuration
└── package.json               # Dependencies and scripts
```

## 🛡️ Security Considerations

- All sensitive data is stored in environment variables
- API routes include proper validation and error handling
- CORS is properly configured for Sanity integration
- Stripe webhooks include signature verification
- Authentication uses secure JWT tokens

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity.io Documentation](https://www.sanity.io/docs)
- [Stripe Integration Guide](https://stripe.com/docs/stripe-js)
- [Vercel Deployment Guide](https://vercel.com/docs)

## 🐛 Troubleshooting

### Common Issues

1. **Build fails with module errors**:
   - Ensure all environment variables are set
   - Check that MongoDB connection string is valid

2. **Stripe payments not working**:
   - Verify webhook endpoint is configured correctly
   - Check webhook secret matches environment variable

3. **Sanity content not loading**:
   - Verify project ID and API token are correct
   - Check CORS settings in Sanity dashboard

### Getting Help

- Check the [Issues](https://github.com/antopucung/GodotTekkoProductionV2/issues) page
- Review the deployment logs in Vercel dashboard
- Ensure all required environment variables are set

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Ready for production deployment!** 🚀
