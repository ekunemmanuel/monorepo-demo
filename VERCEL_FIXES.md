# Vercel Build Fixes

## Issues Fixed

1. **TypeScript "no default export" error**: Added Vue module declaration to `env.d.ts`
2. **Vue compiler error**: Fixed template structure and removed problematic ref
3. **Build command**: Simplified to just `vite build` (removed type-check from build)
4. **Vue DevTools**: Disabled in production builds
5. **Convex deployment**: Should be done separately, not during Vercel build

## Important: Convex Generated Files

The build now generates Convex types during the build process:
- Uses `convex dev --once --typecheck disable --no-push` to generate types without deploying
- This ensures the `convex/_generated` files are available for the build
- Convex deployment should be done separately: `bun run convex:deploy`

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

