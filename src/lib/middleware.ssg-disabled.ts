/*
// Middleware server-side temporariamente desativado para gerar o site como SSG.
// Rotas legadas e seleção de audiência por cookie ficam indisponíveis enquanto
// o deploy usar GitHub Pages, que serve apenas arquivos estáticos.
import { defineMiddleware } from 'astro:middleware';

const LEGACY_ROUTES = new Set(['/cliente', '/visitante']);

export const onRequest = defineMiddleware(async (context, next) => {
  if (LEGACY_ROUTES.has(context.url.pathname)) {
    return context.redirect('/');
  }

  const response = await next();

  // SSR de audiência por cookie desativado temporariamente para SSG:
  // context.locals.audience e os cabeçalhos Vary/Cache-Control ficam inativos.

  return response;
});
*/