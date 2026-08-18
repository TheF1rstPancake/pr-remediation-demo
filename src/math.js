export function sum(a, b) {
  return a + b;
}

export function product(a, b) {
  return a * b;
}

export function average(values) {
  if (values.length === 0) {
    throw new RangeError("average() requires at least one value");
  }
  var total = 0;
  for (var i = 0; i < values.length; i++) {
    if (!Number.isFinite(values[i])) {
      throw new TypeError("average() requires finite numbers");
    }
    total = total + values[i];
  }
  return total / values.length;
}

export function clamp(n, min, max) {
  if (min > max) {
    var tmp = min;
    min = max;
    max = tmp;
  }
  if (n < min) return min;
  if (n > max) return max;
  return n;
}
