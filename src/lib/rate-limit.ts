/**
 * Minimal in-memory fixed-window rate limiter.
 * Good enough for a single server instance; on serverless or multi-instance
 * deployments, swap for a shared store (e.g. Redis / Upstash) using the same interface.
 */
const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string, { limit = 5, windowMs = 10 * 60 * 1000 } = {}) {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || entry.resetAt <= now) {
    hits.set(key, { count: 1, resetAt: now + windowMs });
    if (hits.size > 5000) {
      for (const [k, v] of hits) if (v.resetAt <= now) hits.delete(k);
    }
    return { allowed: true };
  }

  entry.count += 1;
  return { allowed: entry.count <= limit };
}
