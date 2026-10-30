# Runbook: Checkout 502 with promo codes (DEMO)

> DEMO / SYNTHETIC DATA for a Grok Bot ticket-triage demo. Fictional customer and system.

## Symptoms
- `POST /api/checkout` returns **502 Bad Gateway** after ~10 s, only when a promo code is applied.
- Checkout without a promo code succeeds.
- Started after payments-service `v2.14.0` was deployed.

## Known cause
Promo validation in payments-service calls `promo-rules` synchronously with a 3 s timeout and no retry or cache. Under load the call times out and the gateway returns 502.

## Customer workaround
1. Remove the promo code, then reapply it from the **cart** page (not the payment step), or
2. Apply the code from **Account > Promotions** before starting checkout.

## Fix
- Jira: GIO-26
- PR: branch `demo/fix-promo-timeout` (timeout 8 s, one retry, 5-minute cache, fail open).

## Escalation path
1. Tier 1 Support: share the workaround and link GIO-26.
2. Tier 2 / Payments on-call: confirm the timeout spike, then roll back to `v2.13.x` if the error rate stays high.
3. Engineering manager, Payments: approve the hotfix release.
