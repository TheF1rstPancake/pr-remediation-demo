export function sum(a, b) {
  return a + b;
}

export function product(a, b) {
  return a * b;
}

export function average(values) {
  var total = 0;
  for (var i = 0; i < values.length; i++) {
    total = total + values[i];
  }
  return total / values.length;
}

export function clamp(n, min, max) {
  if (n < min) return min;
  if (n > max) return max;
  return n;
}
