// @vitest-environment node
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { compile } from 'svelte/compiler';
import { describe, expect, it } from 'vitest';

const lib = import.meta.dirname;

function components(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return components(path);
    return entry.name.endsWith('.svelte') ? [path] : [];
  });
}

const sources = components(lib).map((path) => ({ name: relative(lib, path), source: readFileSync(path, 'utf8') }));
const theme = readFileSync(join(lib, 'theme.css'), 'utf8');
const defined = new Set([...theme.matchAll(/(--pp-[a-z0-9-]+)\s*:/g)].map((m) => m[1]));

describe('the default theme', () => {
  it('defines every token a component reads, so nothing renders unstyled without app CSS', () => {
    const missing = sources.flatMap(({ name, source }) =>
      [...source.matchAll(/var\((--[a-z0-9-]+)/g)]
        .map((m) => m[1])
        .filter((token) => !defined.has(token!))
        .map((token) => `${name}: ${token}`),
    );

    expect(missing).toEqual([]);
  });

  it('only defines tokens in the pp namespace', () => {
    expect([...defined].every((token) => token.startsWith('--pp-'))).toBe(true);
  });

  it('sits in the platform-ui layer', () => {
    expect(theme).toMatch(/^@layer platform-ui \{/m);
  });
});

describe('component styles', () => {
  it.each(sources.filter(({ source }) => source.includes('<style>')))(
    '$name puts all of its CSS in the platform-ui layer',
    ({ name, source }) => {
      const css = compile(source, { filename: name, css: 'external' }).css?.code.trim() ?? '';

      expect(css.startsWith('@layer platform-ui {')).toBe(true);
      expect(css.endsWith('}')).toBe(true);
      // One layer block wrapping everything: its opening brace is the only one at depth zero.
      let depth = 0;
      let topLevelBlocks = 0;
      for (const char of css.replace(/\/\*[\s\S]*?\*\//g, '')) {
        if (char === '{' && depth++ === 0) topLevelBlocks++;
        if (char === '}') depth--;
      }
      expect(topLevelBlocks).toBe(1);
    },
  );
});
