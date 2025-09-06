# 🗄️ Database Setup for Vercel Deployment

## 📊 Current Database Status

Your platform is configured to work with **THREE data options**:

1. **MongoDB Atlas** (Cloud Database) - Recommended for production
2. **Mock Data** (Built-in) - Works immediately without setup
3. **Local MongoDB** - For development only

---

## 🚀 OPTION 1: Use Mock Data (Immediate Solution)

**This is the fastest way to get your platform working on Vercel!**

### Setup Steps:
1. **Go to Vercel Dashboard** → Your Project → Settings → Environment Variables
2. **Add this variable:**
   ```
   NEXT_PUBLIC_USE_MOCK_DATA = true
   ```
3. **Redeploy** your application

### What You Get:
- ✅ **6 Sample Courses** - Complete with lessons and instructors
- ✅ **6 Sample Projects** - Game development showcases
- ✅ **10 Sample Products** - UI kits, templates, icons, graphics
- ✅ **Immediate Functionality** - No database setup required
- ✅ **Perfect for Testing** - See how your platform works

---

## 🌐 OPTION 2: MongoDB Atlas (Free Cloud Database)

**Best for production - Free tier available!**

### Step 1: Create MongoDB Atlas Account
1. **Go to** [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. **Sign up** for free account
3. **Create a new cluster** (Free M0 tier is fine)
4. **Choose region** closest to your Vercel deployment

### Step 2: Configure Database Access
1. **Database Access** → Add New Database User
   - Username: `godot_user`
   - Password: `[generate secure password]`
   - Privileges: Read and write to any database

2. **Network Access** → Add IP Address
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Or add Vercel's IP ranges for better security

### Step 3: Get Connection String
1. **Click "Connect"** on your cluster
2. **Choose "Connect your application"**
3. **Copy the connection string:**
   ```
   mongodb+srv://godot_user:<password>@cluster0.xxxxx.mongodb.net/godot-tekko?retryWrites=true&w=majority
   ```
4. **Replace `<password>`** with your actual password

### Step 4: Add to Vercel
1. **Go to Vercel Dashboard** → Your Project → Settings → Environment Variables
2. **Add these variables:**
   ```
   MONGODB_URI = [your connection string from step 3]
   NEXT_PUBLIC_USE_MOCK_DATA = false
   ```
3. **Redeploy** your application

### Step 5: Populate Database (Optional)
Run this command locally to seed your database:
```bash
# First, set your MongoDB URI locally
export MONGODB_URI="your_connection_string_here"

# Then run the seed script
npm run seed:mongodb
```

---

## 🔍 Database Health Check

### Check Your Database Status:
Visit this URL after deployment:
```
https://your-app.vercel.app/api/health/database
```

### What You'll See:
```json
{
  "status": "healthy",
  "mongodb": {
    "connected": true,
    "uri": "configured"
  },
  "data": {
    "courses": 6,
    "projects": 6,
    "usingMockData": false
  },
  "summary": "✅ Database connected with 6 courses and 6 projects"
}
```

---

## 🎯 Current Vercel Environment Variables

You currently have these set in Vercel:
```
MONGODB_URI = mongodb+srv://sandboxacademia_db_user:LAqTAxI2F1BY7Yxw@cluster0.6u3i7du.mongodb.net/godot-tekko?retryWrites=true&w=majority&appName=Cluster0
NEXTAUTH_SECRET = godot-tekko-production-secret-key-2024
NEXTAUTH_URL = [your vercel URL]
```

### To Use Your Existing MongoDB:
1. **Keep MONGODB_URI** as is
2. **Add:** `NEXT_PUBLIC_USE_MOCK_DATA = false`
3. **Redeploy**

### To Use Mock Data Instead:
1. **Add:** `NEXT_PUBLIC_USE_MOCK_DATA = true`
2. **Redeploy**

---

## 📦 What Data Is Available?

### Mock Data (Built-in):
- **Products:** UI kits, templates, icons, graphics
- **Courses:** Game development, 3D modeling, UI/UX
- **Projects:** Game showcases and case studies
- **Authors:** Sample creators and studios

### MongoDB Data (When Connected):
- **Courses Collection:** Educational content
- **Projects Collection:** Game project showcases
- **UserProgress Collection:** Learning progress tracking
- **Products:** Still use mock data via API

---

## 🚨 Troubleshooting

### "Database not connected" Error:
1. **Check MONGODB_URI** is set correctly in Vercel
2. **Verify connection string** includes password
3. **Check MongoDB Atlas** network access allows Vercel
4. **Set `NEXT_PUBLIC_USE_MOCK_DATA=true`** as fallback

### "No data showing" Issue:
1. **Run health check:** `/api/health/database`
2. **Check console logs** in Vercel Functions tab
3. **Verify environment variables** are set
4. **Use mock data** as temporary solution

### Quick Fix - Use Mock Data:
```
NEXT_PUBLIC_USE_MOCK_DATA = true
```
This bypasses all database issues immediately!

---

## 🎯 Recommended Setup for You

**For Immediate Results:**
1. Set `NEXT_PUBLIC_USE_MOCK_DATA = true` in Vercel
2. Redeploy
3. Your platform works immediately with sample data!

**For Production (Later):**
1. Set up MongoDB Atlas (free)
2. Update MONGODB_URI
3. Set `NEXT_PUBLIC_USE_MOCK_DATA = false`
4. Populate with real data

---

## 📞 Support

- **MongoDB Atlas Docs:** [docs.mongodb.com](https://docs.mongodb.com)
- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **Your Health Check:** `/api/health/database`

---

**💡 TIP:** Start with mock data to get your platform running, then migrate to MongoDB when ready!
