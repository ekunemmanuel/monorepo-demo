# Mobile Beauticians App

React Native mobile app for beauticians, built with Expo and Convex.

## Setup

1. Install dependencies:
   ```bash
   bun install
   ```

2. Create a `.env` file with your Convex deployment URL:
   ```env
   EXPO_PUBLIC_CONVEX_URL=your-convex-deployment-url
   ```

## Running the App

```bash
bun start
# Or
bun run ios      # iOS (requires macOS)
bun run android  # Android
bun run web      # Web browser
```

## Features

- View all todos with statistics
- Add new todos
- Toggle todo completion
- Delete todos
- Real-time updates via Convex

