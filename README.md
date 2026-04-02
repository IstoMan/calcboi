# Calcboi

A calculator app built with [Expo](https://docs.expo.dev/) and [React Native](https://reactnative.dev/). It uses a custom expression pipeline for input and evaluation, with a dark UI styled via [NativeWind](https://www.nativewind.dev/) (Tailwind for React Native).

## Requirements

- [Bun](https://bun.sh/) (package manager and script runner for this repo)
- For running on devices/simulators: Xcode (iOS), Android Studio / SDK (Android), or Expo Go

## Setup

```bash
bun install
```

## Scripts

| Command | Description |
| --- | --- |
| `bun run start` | Start the Expo dev server |
| `bun run ios` | Open in iOS simulator |
| `bun run android` | Open on Android emulator/device |
| `bun run web` | Run in the browser |
| `bun run lint` | ESLint + Prettier check |
| `bun run format` | Auto-fix lint and format |
| `bun run typecheck` | TypeScript (`tsc --noEmit`) |
| `bun run test` | Jest tests |

## Project layout

- `App.tsx` — Root layout, fonts, safe area, display + numpad
- `components/` — `Display`, `Numpad`, `Action`
- `lib/calculator.ts` — Calculator state machine and key handling
- `lib/expression.ts` — Expression building and evaluation
- `lib/useCalculator.ts` — React hook wiring the reducer to the UI

## Stack

- Expo SDK 54 · React Native 0.81 · React 19
- NativeWind v4 · Tailwind CSS
- `react-native-safe-area-context` · `react-native-reanimated` · `expo-font` (Geist, Inter)
