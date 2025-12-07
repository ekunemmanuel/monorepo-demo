# web-admin

Admin dashboard for managing todos and system data.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) 
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
bun install
```

### Convex Setup

1. Make sure Convex is running from the root directory:
   ```sh
   # From monorepo root
   bun run convex:dev
   ```

2. Create a `.env` file in this directory with your Convex deployment URL:
   ```env
   VITE_CONVEX_URL=your-convex-deployment-url
   ```

3. The Convex client is already configured in `src/main.ts` using the `convexVue` plugin, following the [official Convex Vue documentation](https://docs.convex.dev/quickstart/vue).

### Compile and Hot-Reload for Development

```sh
bun dev
```

The app will run on http://localhost:3002

### Type-Check, Compile and Minify for Production

```sh
bun run build
```

## Using Convex in Components

Following the [official Convex Vue documentation](https://docs.convex.dev/quickstart/vue):

```vue
<script setup lang="ts">
import { useConvexQuery, useConvexMutation } from 'convex-vue'
import { api } from '../../../convex/_generated/api'

// Use queries
const { data, isPending } = useConvexQuery(api.todos.getTodos)

// Use mutations
const deleteTodo = useConvexMutation(api.todos.deleteTodo)
</script>
```

## Features

- Admin dashboard with statistics
- View all todos in a table format
- Toggle todo completion
- Delete todos
- Real-time updates via Convex
