// src/lib/audience.ts
// Única fonte da verdade para a regra "cliente ou não cliente".
// Nenhum outro arquivo deve conhecer o nome do cookie ou os valores 'true'/'false'.
import type { AstroCookies } from 'astro';

/**
 * - customer: já é cliente
 * - visitor:  declarou que ainda não é cliente
 * - unknown:  ainda não escolheu (ou crawler / primeira visita)
 */
export type Audience = 'customer' | 'visitor' | 'unknown';

export const AUDIENCE_COOKIE = 'is_customer';
const ONE_YEAR = 60 * 60 * 24 * 365;

/** Aceita o valor cru do cookie ou do FormData. Qualquer coisa inesperada vira 'unknown'. */
export function parseAudience(raw: unknown): Audience {
  if (raw === 'true') return 'customer';
  if (raw === 'false') return 'visitor';
  return 'unknown';
}

export function setAudience(
  cookies: AstroCookies,
  audience: Exclude<Audience, 'unknown'>,
  secure: boolean,
) {
  cookies.set(AUDIENCE_COOKIE, audience === 'customer' ? 'true' : 'false', {
    path: '/',
    maxAge: ONE_YEAR,
    httpOnly: true,
    secure,
    sameSite: 'lax',
  });
}

export function clearAudience(cookies: AstroCookies) {
  cookies.delete(AUDIENCE_COOKIE, { path: '/' });
}