# Mobile Customer App

React Native mobile app for customers, built with Expo and Convex.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) or Expo Go app on your device
- [Bun](https://bun.sh/) (for package management)

## Setup

1. Install dependencies:
   ```bash
   bun install
   ```

2. Set up Convex:
   - Make sure Convex is running from the root directory:
     ```bash
     # From monorepo root
     bun run convex:dev
     ```

3. Create a `.env` file in this directory with your Convex deployment URL:
   ```env
   EXPO_PUBLIC_CONVEX_URL=your-convex-deployment-url
   ```

## Running the App

### Development

```bash
# Start the Expo development server
bun start

# Or run on specific platform
bun run ios      # iOS (requires macOS)
bun run android  # Android
bun run web      # Web browser
```

### Using Expo Go

1. Install Expo Go on your device:
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Start the development server:
   ```bash
   bun start
   ```

3. Scan the QR code with:
   - **iOS**: Camera app
   - **Android**: Expo Go app

## Features

- ✅ View all todos
- ✅ Add new todos
- ✅ Toggle todo completion
- ✅ Edit todos inline
- ✅ Delete todos
- ✅ Real-time updates via Convex

## Convex Integration

This app uses the shared Convex backend from the root `convex/` directory. All queries and mutations are imported from:

```typescript
import { api } from '../../convex/_generated/api'
```

## Project Structure

```
mobile-customer/
├── App.tsx          # Main app component with Convex setup
├── app.json         # Expo configuration
├── package.json     # Dependencies
└── .env             # Environment variables (create this)
```

## Building for Production

### iOS

```bash
# Install EAS CLI
npm install -g eas-cli

# Configure EAS
eas build:configure

# Build for iOS
eas build --platform ios
```

### Android

```bash
# Build for Android
eas build --platform android
```

## Troubleshooting

### Convex Connection Issues

- Verify your `.env` file has the correct `EXPO_PUBLIC_CONVEX_URL`
- Make sure Convex dev server is running from the root directory
- Check that the Convex deployment URL is correct

### Expo Issues

- Clear cache: `expo start -c`
- Reset Metro bundler: `expo start --clear`

