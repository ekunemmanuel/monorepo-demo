# EAS (Expo Application Services) Setup

This mobile app is configured with EAS for building and submitting to app stores.

## Project Configuration

- **Project ID**: `bf39bf98-5778-4ee3-bf92-2941fcb149d8`
- **Owner**: `painite-studio`
- **Slug**: `mobile-customer`

## Prerequisites

1. EAS CLI installed: `bun install -g eas-cli`
2. Expo account (sign up at https://expo.dev)
3. Logged in: `eas login`

## Building Apps

### Development Build

For testing with development client:
```bash
eas build --profile development --platform android
# or
eas build --profile development --platform ios
```

### Preview Build (Internal Testing)

Build APK/IPA for internal testing:
```bash
eas build --profile preview --platform android
# or
eas build --profile preview --platform ios
```

### Production Build

Build for app store submission:
```bash
# Android
bun run build:android

# iOS
bun run build:ios

# Both platforms
bun run build:all
```

## Submitting to App Stores

### Android (Google Play)

```bash
bun run submit:android
```

### iOS (App Store)

```bash
bun run submit:ios
```

## Environment Variables

Make sure to set environment variables in EAS:

```bash
eas secret:create --scope project --name EXPO_PUBLIC_CONVEX_URL --value your-convex-url
```

Or set them in the EAS dashboard:
1. Go to https://expo.dev
2. Select your project
3. Go to Settings → Secrets
4. Add `EXPO_PUBLIC_CONVEX_URL`

## Build Profiles

The `eas.json` file defines three build profiles:

1. **development**: For development builds with Expo Go
2. **preview**: For internal testing (APK/IPA files)
3. **production**: For app store submission

## Notes

- Builds are done in the cloud by Expo
- You can monitor builds at https://expo.dev
- First build may take longer (15-30 minutes)
- Subsequent builds are faster due to caching

