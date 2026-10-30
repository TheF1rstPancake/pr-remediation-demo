// DEMO / SYNTHETIC CODE for a Grok Bot ticket-triage demo. Not production code.
// Related ticket: GIO-26 - Checkout 502 when promo code applied (payments-service)
//
// Before (payments-service v2.14.0): a synchronous call to promo-rules with a 3 s
// timeout and no retry or cache. Under morning load the call timed out and the
// gateway surfaced it to customers as a 502.
//
// After: raise the timeout to 8 s, retry once with backoff, cache valid codes for
// 5 minutes, and fail open (checkout continues without the discount and the
// customer sees a message) instead of returning a 502.

const PROMO_TIMEOUT_MS = 8000;
const PROMO_RETRIES = 1;
const CACHE_TTL_MS = 5 * 60 * 1000;

const cache = new Map();

async function withTimeout(promise, ms) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error('promo-rules timeout')), ms);
  });
  try {
    return await Promise.race([promise, timeout]);
  } finally {
    clearTimeout(timer);
  }
}

async function validatePromo(code, promoRulesClient) {
  const cached = cache.get(code);
  if (cached && Date.now() - cached.at < CACHE_TTL_MS) {
    return cached.result;
  }

  for (let attempt = 0; attempt <= PROMO_RETRIES; attempt++) {
    try {
      const result = await withTimeout(promoRulesClient.validate(code), PROMO_TIMEOUT_MS);
      cache.set(code, { result, at: Date.now() });
      return result;
    } catch (err) {
      if (attempt < PROMO_RETRIES) {
        await new Promise((r) => setTimeout(r, 250 * (attempt + 1)));
      }
    }
  }

  // Fail open: do not block checkout with a 502.
  return { valid: false, reason: 'promo_unavailable', failOpen: true };
}

module.exports = { validatePromo, PROMO_TIMEOUT_MS, PROMO_RETRIES, CACHE_TTL_MS };
