# Deployment Guide

This guide explains how to deploy the web apps separately on Vercel.

## Prerequisites

1. A Vercel account (sign up at https://vercel.com)
2. Your GitHub repository connected to Vercel
3. Your Convex deployment URL

## Deploying Each Web App

### Option 1: Using Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com/dashboard
   - Click "Add New Project"
   - Import your GitHub repository

2. **Deploy web-customer:**
   - **Project Name**: `web-customer` (or your preferred name)
   - **Root Directory**: `apps/web-customer`
   - **Framework Preset**: Vite
   - **Build Command**: `bun run build` (or `npm run build` if using npm)
   - **Output Directory**: `dist`
   - **Install Command**: `cd ../.. && bun install` (or `cd ../.. && npm install`)
   - **Environment Variables**:
     - `VITE_CONVEX_URL`: Your Convex deployment URL

3. **Deploy web-admin:**
   - Click "Add New Project" again
   - **Project Name**: `web-admin`
   - **Root Directory**: `apps/web-admin`
   - **Framework Preset**: Vite
   - **Build Command**: `bun run build`
   - **Output Directory**: `dist`
   - **Install Command**: `cd ../.. && bun install`
   - **Environment Variables**:
     - `VITE_CONVEX_URL`: Your Convex deployment URL

4. **Deploy web-beauticians** (when created):
   - Same process as above with `apps/web-beauticians` as root directory

### Option 2: Using Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy web-customer:**
   ```bash
   cd apps/web-customer
   vercel
   # Follow the prompts:
   # - Set root directory: apps/web-customer
   # - Override build command: bun run build (or npm run build)
   # - Add environment variable: VITE_CONVEX_URL
   ```

3. **Deploy web-admin:**
   ```bash
   cd apps/web-admin
   vercel
   ```

### Option 3: Using vercel.json (Current Setup)

The `vercel.json` files are already created in each app directory. However, Vercel might need additional configuration through the dashboard for monorepo support.

## Important Configuration

### Build Settings for Each Project:

- **Root Directory**: `apps/web-customer` (or `apps/web-admin`)
- **Build Command**: `bun run build` (or `npm run build`)
- **Output Directory**: `dist`
- **Install Command**: `cd ../.. && bun install` (installs from monorepo root)

### Environment Variables:

Add these in Vercel Dashboard → Project Settings → Environment Variables:

- `VITE_CONVEX_URL`: Your Convex deployment URL (same for all apps)

## Custom Domains

After deployment, you can add custom domains for each app:

1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS as instructed by Vercel

Example domains:
- `customer.yourdomain.com` → web-customer
- `beauticians.yourdomain.com` → web-beauticians (when created)
- `admin.yourdomain.com` → web-admin

## Troubleshooting

### Build Fails

- Make sure `Root Directory` is set correctly in Vercel project settings
- Verify `Install Command` runs from monorepo root
- Check that Bun is available (or use npm/pnpm)

### Environment Variables Not Working

- Ensure variables are prefixed with `VITE_` for Vite apps
- Redeploy after adding environment variables
- Check variable names match exactly (case-sensitive)

### Monorepo Dependencies

If Vercel doesn't detect dependencies correctly:
- Use `Install Command`: `cd ../.. && bun install`
- Or use npm: `cd ../.. && npm install`

## Notes

- Each app deploys independently
- They all share the same Convex backend
- Updates to one app don't affect others
- Each app gets its own Vercel URL

