#!/usr/bin/env bash
# Production-build a minimal consumer against the packed tarball, once per way an app can load the theme, and fail
# unless the default theme is in the output. A dev server and this repo's gallery both see the theme whether or not a
# bundler would keep it, and publint does not build anything, so only a real build through the package can tell.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

NAME="$(node -p "require('./package.json').name")"

WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

pnpm pack --pack-destination "$WORK" >/dev/null
PKG="$WORK/node_modules/$NAME"
mkdir -p "$PKG"
tar -xzf "$WORK"/*.tgz -C "$PKG" --strip-components 1

# The consumer borrows this repo's toolchain rather than installing its own, so the check needs no network.
for dep in vite svelte @sveltejs/vite-plugin-svelte; do
  mkdir -p "$(dirname "$WORK/node_modules/$dep")"
  ln -s "$ROOT/node_modules/$dep" "$WORK/node_modules/$dep"
done

# LoginForm imports $app/forms, which only SvelteKit provides. A stub is enough for a build.
cat >"$WORK/app-forms.js" <<'EOF'
export const enhance = () => ({});
export const applyAction = async () => {};
EOF

cat >"$WORK/vite.config.mjs" <<'EOF'
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [svelte({ configFile: false })],
  resolve: { alias: { '$app/forms': new URL('./app-forms.js', import.meta.url).pathname } },
  logLevel: 'warn',
});
EOF

# Each case is the module an app writes, built on its own so one case's theme cannot stand in for another's.
check() {
  local label="$1" source="$2"
  local dir="$WORK/cases/$label"

  mkdir -p "$dir"
  printf '%s\n' "$source" >"$dir/main.js"
  printf '<script type="module" src="./main.js"></script>\n' >"$dir/index.html"

  if ! (cd "$WORK" && "$WORK/node_modules/vite/bin/vite.js" build "cases/$label" --config vite.config.mjs --outDir dist --emptyOutDir); then
    echo "::error::$label: the production build failed"
    return 1
  fi
  if ! grep -rqs -- '--pp-color-primary:' "$dir/dist"; then
    echo "::error::$label: the production build has no default theme (no --pp-color-primary in its output)"
    return 1
  fi
  echo "ok: $label"
}

failed=0
check entry "import { Button } from '$NAME'; console.log(Button);" || failed=1
check screens "import { LoginForm } from '$NAME/screens'; console.log(LoginForm);" || failed=1
check explicit "import '$NAME/theme.css';" || failed=1
exit "$failed"
