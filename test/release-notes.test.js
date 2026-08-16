import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const notes = fs.readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), "../docs/release-notes.md"), "utf8");

test("ship date is concrete, not TBD", () => {
  assert.match(notes, /Ship date: 2026-08-12/);
  assert.doesNotMatch(notes, /Ship date: TBD/);
});

test("dark mode scope is explicit", () => {
  assert.match(notes, /Settings → Appearance/);
});

test("Safari known issue links tracker + workaround", () => {
  assert.match(notes, /ATLAS-1847/);
  assert.match(notes, /refresh once/i);
});
