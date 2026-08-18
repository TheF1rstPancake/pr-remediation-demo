import test from "node:test";
import assert from "node:assert/strict";
import { sum, product, average, clamp } from "../src/math.js";

test("sum adds two numbers", () => {
  assert.equal(sum(2, 3), 5);
});

test("product multiplies", () => {
  assert.equal(product(2, 3), 6);
});

test("average of three numbers", () => {
  assert.equal(average([2, 4, 6]), 4);
});

test("average rejects empty array", () => {
  assert.throws(
    () => average([]),
    (err) => err instanceof RangeError && err.message === "average() requires at least one value"
  );
});

test("average rejects non-finite values", () => {
  assert.throws(
    () => average([1, NaN, 3]),
    (err) => err instanceof TypeError && err.message === "average() requires finite numbers"
  );
  assert.throws(
    () => average([1, Infinity, 3]),
    (err) => err instanceof TypeError && err.message === "average() requires finite numbers"
  );
});

test("clamp keeps value in range", () => {
  assert.equal(clamp(5, 0, 10), 5);
  assert.equal(clamp(-1, 0, 10), 0);
  assert.equal(clamp(99, 0, 10), 10);
});

test("clamp swaps inverted bounds", () => {
  assert.equal(clamp(5, 10, 0), 5);
});
