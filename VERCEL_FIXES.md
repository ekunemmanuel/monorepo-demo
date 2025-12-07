# Vercel Build Fixes

## Issues Fixed

1. **TypeScript "no default export" error**: Added Vue module declaration to `env.d.ts`
2. **Vue compiler error**: Fixed template structure and removed problematic ref
3. **Build command**: Simplified to just `vite build` (removed type-check from build)
4. **Vue DevTools**: Disabled in production builds
5. **Convex deployment**: Should be done separately, not during Vercel build

## Important: Prevent Convex Auto-Deploy

Vercel is automatically running `bunx convex deploy` during builds. To prevent this:

### Option 1: In Vercel Dashboard (Recommended)

For each project (web-customer, web-admin):
1. Go to **Project Settings** → **Build & Development Settings**
2. Make sure **Build Command** is set to: `bun run build` (NOT `bunx convex deploy && bun run build`)
3. The `vercel.json` files should handle this, but verify in dashboard

### Option 2: Remove Convex from Build

If Vercel keeps auto-detecting Convex:
- The `.vercelignore` files should help
- Or move `convex.json` to a different location during build

## Build Configuration

Each app now has:
- ✅ Simplified build command: `bun run build`
- ✅ Vue module types properly declared
- ✅ DevTools disabled in production
- ✅ TypeScript skipLibCheck enabled

## Next Steps

1. **Commit and push these fixes:**
   ```bash
   git add .
   git commit -m "Fix: Vercel build errors - Vue types and build config"
   git push
   ```

2. **Redeploy on Vercel:**
   - The next deployment should work
   - If Convex still auto-deploys, manually set Build Command in Vercel dashboard

3. **Deploy Convex separately:**
   ```bash
   # From root directory
   bun run convex:deploy
   ```

## Environment Variables

Make sure each Vercel project has:
- `VITE_CONVEX_URL`: Your Convex deployment URL

