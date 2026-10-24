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

Seeded from DDB's `frontend/packages/ui`; see
[platform-ui-swift#3](https://github.com/primandproper/platform-ui-swift/issues/3) for where it is headed.

## Customizing

One library, apps that look nothing alike. Importing either entry point loads the default theme, so a component renders
correctly with no CSS from the app at all. From there an app has two levers, and neither needs `:global` or
`!important`.

**Tokens.** Every value the components read is a custom property in the `--pp-` namespace. Set any of them, anywhere:

```css
:root {
  --pp-color-primary: rebeccapurple;
  --pp-radius-sm: 0;
  --pp-font-sans: Georgia, serif;
}
```

**Rules.** All of the library's CSS, the default theme included, is inside the `platform-ui` cascade layer. Any CSS an
app writes outside a layer beats it, whatever its specificity, so styling a component is an ordinary rule against its
`data-part` hooks:

```css
[data-part='button'][data-variant='primary'] {
  border-radius: 999px;
  text-transform: uppercase;
}
```

`src/routes/themed` shows both, side by side with the default look, and checks in the browser that the overrides win.

Where markup is worth replacing, components take snippet props: `Card`'s `header`, `FormField`'s `labelContent`, and
`Autocomplete`'s `option`.

### Tokens

| Group  | Tokens                                                                                                                                                                                               |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Color  | `--pp-color-primary`, `-primary-hover`, `-primary-muted`, `-text`, `-text-muted`, `-error`, `-error-muted`, `-border`, `-surface`, `-surface-alt`, `-success`, `-success-muted`, `-warning`, `-info` |
| Type   | `--pp-font-sans`; `--pp-font-weight-normal`, `-medium`, `-semibold`, `-bold`; `--pp-font-size-xs`, `-sm`, `-base`, `-lg`, `-xl`, `-2xl`, `-3xl`; `--pp-line-height-tight`, `-normal`, `-relaxed`     |
| Space  | `--pp-space-xs`, `-sm`, `-md`, `-lg`, `-xl`                                                                                                                                                          |
| Shape  | `--pp-radius-sm`, `-md`; `--pp-shadow-sm`, `-md`, `-focus`                                                                                                                                           |
| Motion | `--pp-transition-fast`, `-normal`                                                                                                                                                                    |
| Layout | `--pp-content-max-width`, `-narrow`                                                                                                                                                                  |

Defaults are in [`src/lib/theme.css`](src/lib/theme.css).

### Parts

`data-part` values, and the state each part exposes, are a public contract: renaming one is a breaking change.

| Component       | Parts                                                                                                    | State attributes                                     |
| --------------- | -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `Alert`         | `alert`                                                                                                  | `data-variant`                                       |
| `Autocomplete`  | `autocomplete`, `autocomplete-input`, `autocomplete-loading`, `autocomplete-list`, `autocomplete-option` | `data-open` on the root, `data-focused` on an option |
| `Button`        | `button`                                                                                                 | `data-variant`                                       |
| `Card`          | `card`, `card-header`, `card-title`, `card-chevron`, `card-body`                                         | `data-collapsible`, `data-expanded`                  |
| `FormField`     | `form-field`, `form-field-required`, `form-field-error`                                                  | `data-invalid`                                       |
| `Heading`       | `heading`                                                                                                | `data-level`                                         |
| `Input`         | `input`                                                                                                  |                                                      |
| `Label`         | `label`                                                                                                  |                                                      |
| `Link`          | `link`                                                                                                   |                                                      |
| `LoginForm`     | `login-form` (its fields are `FormField`, `Input` and `Button` parts)                                    |                                                      |
| `NumberInput`   | `number-input`                                                                                           |                                                      |
| `PageContainer` | `page-container`                                                                                         | `data-width` (`narrow` or `wide`)                    |
| `Select`        | `select`                                                                                                 |                                                      |
| `Switch`        | `switch`, `switch-input`, `switch-track`                                                                 | `data-checked`, `data-disabled`                      |
| `Text`          | `text`                                                                                                   | `data-variant`                                       |

## Development

```sh
make install
make format lint test
make build
```

`pnpm exec vite dev` serves `src/routes`: a gallery of every component at `/` and the restyling demo at `/themed`.
Neither is part of the package.
