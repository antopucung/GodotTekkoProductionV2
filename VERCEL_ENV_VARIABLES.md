# 🔧 VERCEL ENVIRONMENT VARIABLES - REQUIRED SETTINGS

## ⚠️ IMPORTANT: Add These to Fix Session Errors

### 1. **NEXTAUTH_SECRET** (REQUIRED - Fixes Session Error)
```
Key: NEXTAUTH_SECRET
Value: your-super-secret-key-minimum-32-characters-long-change-this
Environments: ✅ Production, ✅ Preview, ✅ Development
```

**To Generate a Secure Secret:**
```bash
openssl rand -base64 32
```
Or use any random string at least 32 characters long.

### 2. **NEXTAUTH_URL** (REQUIRED)
```
Key: NEXTAUTH_URL
Value: https://[your-vercel-domain].vercel.app
Environments: ✅ Production
```

Example: `https://godot-tekko-production-v2.vercel.app`

### 3. **NEXT_PUBLIC_USE_MOCK_DATA** (Already Set)
```
Key: NEXT_PUBLIC_USE_MOCK_DATA
Value: true
Environments: ✅ Production, ✅ Preview, ✅ Development
```

## 📝 Complete List of Variables to Add/Update:

| Variable | Value | Required | Purpose |
|----------|--------|----------|---------|
| `NEXTAUTH_SECRET` | `[generate-secure-32-char-string]` | ✅ YES | Fixes session errors |
| `NEXTAUTH_URL` | `https://your-app.vercel.app` | ✅ YES | Auth redirect URL |
| `NEXT_PUBLIC_USE_MOCK_DATA` | `true` | ✅ YES | Enables mock data |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `mock-project` | Optional | Prevents Sanity errors |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | Optional | Prevents Sanity errors |

## 🚀 Quick Copy-Paste for Vercel:

```env
NEXTAUTH_SECRET=change-this-to-your-own-secret-key-minimum-32-chars
NEXTAUTH_URL=https://your-actual-vercel-url.vercel.app
NEXT_PUBLIC_USE_MOCK_DATA=true
NEXT_PUBLIC_SANITY_PROJECT_ID=mock-project
NEXT_PUBLIC_SANITY_DATASET=production
```

## ⚡ How to Add in Vercel:

1. Go to: https://vercel.com/dashboard
2. Click your project
3. Go to **Settings** → **Environment Variables**
4. For each variable above:
   - Click "Add New"
   - Enter the Key and Value
   - Select all environments (Production, Preview, Development)
   - Click "Save"
5. **IMPORTANT**: After adding all variables, click **"Redeploy"**

## 🔍 This Will Fix:

- ✅ `[next-auth][error][CLIENT_SESSION_ERROR]` - Fixed by NEXTAUTH_SECRET
- ✅ Authentication not working - Fixed by proper NextAuth config
- ✅ Sanity configuration errors - Fixed by mock values
- ✅ Session persistence issues - Fixed by NEXTAUTH_SECRET

## 📧 Demo Accounts (After Fix):

```
User Account:
Email: demo@example.com
Password: demo123

Admin Account:
Email: admin@example.com
Password: demo123
```
