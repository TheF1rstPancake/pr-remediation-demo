import test from "node:test";
import assert from "node:assert/strict";
import { formatPercent } from "../src/format.js";

test("formatPercent multiplies fraction by 100", () => {
  assert.equal(formatPercent(0.25, 0), "25%");
});
