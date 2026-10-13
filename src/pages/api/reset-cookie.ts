/*
// SSR de cookies temporariamente desativado enquanto o site usa SSG.
import type { APIRoute } from 'astro';
import { clearAudience } from '../../lib/audience';

// Precisa rodar no servidor (um POST não funciona se a rota for pré-renderizada)
export const prerender = false;

export const POST: APIRoute = ({ cookies, redirect }) => {
  clearAudience(cookies);
  return redirect('/', 303);
};
*/