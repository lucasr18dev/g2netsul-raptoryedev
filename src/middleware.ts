// src/middleware.ts
import { defineMiddleware } from 'astro:middleware';

const LEGACY_ROUTES = new Set(['/cliente', '/visitante']);

export const onRequest = defineMiddleware(async (context, next) => {
  if (LEGACY_ROUTES.has(context.url.pathname)) {
    return context.redirect('/');
  }

  const response = await next();

  /*
  SSR de audiência por cookie desativado temporariamente para SSG:
  - context.locals.audience = parseAudience(context.cookies.get(AUDIENCE_COOKIE)?.value);
  - Vary: Cookie e Cache-Control private/no-cache, pois a página agora é igual para todos.
  */

  return response;
});