# Monorepo Demo

A Bun monorepo skeleton for multiple web and mobile applications, all using Convex as the shared backend-as-a-service.

## Project Structure

```
monorepo-demo/
├── apps/                   # Applications will be added here
├── convex/                 # Shared Convex backend
│   └── schema.js          # Database schema
├── package.json            # Root workspace configuration
├── bunfig.toml            # Bun configuration
└── convex.json            # Convex configuration
```

## Planned Applications

### Web Apps (Vue.js)
- `web-customer` - Customer web application
- `web-beauticians` - Beauticians web application
- `web-admin` - Admin web application

### Mobile Apps (React Native/Expo)
- `mobile-customer` - Customer mobile application
- `mobile-beauticians` - Beauticians mobile application
- `mobile-admin` - Admin mobile application

## Prerequisites

- [Bun](https://bun.sh/) installed (v1.0.0 or higher)
- [Node.js](https://nodejs.org/) (for Expo/React Native)
- [Convex CLI](https://docs.convex.dev/quickstart/install-convex) (`npm install -g convex`)

## Getting Started

### 1. Install Dependencies

From the root directory, install all dependencies:

```bash
bun install
```

### 2. Set Up Convex

Convex is shared across all apps and located in the root `convex/` directory.

```bash
# From the root directory, initialize Convex
bun run convex:dev

# Or use npx directly
npx convex dev
```

## Scripts

### Root Level Scripts

- `bun run convex:dev` - Start Convex development server
- `bun run convex:deploy` - Deploy Convex backend
- `bun run dev` - Run all apps in development mode (once apps are added)
- `bun run build` - Build all apps (once apps are added)

## Notes

- **Convex is shared** - All apps will use the same Convex backend located in the root `convex/` directory
- Apps will be added one at a time to the `apps/` directory
- Each app will import Convex from the root: `import { api } from "../../convex/_generated/api"`

## Next Steps

1. Set up Convex: `bun run convex:dev`
2. Add applications one by one to the `apps/` directory
3. Each app will share the same Convex backend
