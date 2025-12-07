# Vercel Deployment Setup for web-admin

## Quick Setup Steps

1. **Go to Vercel Dashboard** → Add New Project → Import your GitHub repo

2. **Configure Project Settings:**
   - **Project Name**: `web-admin`
   - **Root Directory**: `apps/web-admin` ⚠️ **IMPORTANT: Set this in Project Settings**
   - **Framework Preset**: Vite
   - **Build Command**: `bun run build` (or `npm run build` if Bun not available)
   - **Output Directory**: `dist`
   - **Install Command**: `cd ../.. && bun install` (or `cd ../.. && npm install`)

3. **Add Environment Variable:**
   - Name: `VITE_CONVEX_URL`
   - Value: Your Convex deployment URL

4. **Deploy!**

## Note on Bun Support

If Vercel doesn't support Bun, use npm instead:
- **Install Command**: `cd ../.. && npm install`
- **Build Command**: `npm run build`

Vercel will automatically detect and use npm if Bun is not available.

