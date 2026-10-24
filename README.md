# platform-ui-svelte

Shared Svelte 5 UI for apps built on [`platform-go`](https://github.com/primandproper/platform-go), published as
`@primandproper/platform-ui`. The SwiftUI counterpart is
[`platform-ui-swift`](https://github.com/primandproper/platform-ui-swift).

It sits beside the other tiers: `primitives-*` is how to do a thing, `platform-go` is what a product has,
`platform-client-*` is how to talk to it with zero markup, and **this is what it looks like**.

## Entry points

- **`@primandproper/platform-ui`**: atoms (`Button`, `Heading`, `Input`, `Label`, `Link`, `NumberInput`, `Select`,
  `Switch`, `Text`), layout (`Alert`, `Card`, `PageContainer`) and molecules (`Autocomplete`, `FormField`). Needs only
  `svelte`.
- **`@primandproper/platform-ui/screens`**: whole screens. Today that is `LoginForm`, which posts to a SvelteKit form
  action, so this entry also needs `@sveltejs/kit` (an optional peer dependency for that reason).

The components read their tokens (`--color-primary`, `--space-md`, `--radius-sm`, …) from custom properties the app
defines. Seeded from DDB's `frontend/packages/ui`; see
[platform-ui-swift#3](https://github.com/primandproper/platform-ui-swift/issues/3) for where it is headed.

## Development

```sh
make install
make format lint test
make build
```

`pnpm exec vite dev` serves `src/routes`, a gallery of every component that is not part of the package.
