/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    audience: import('./lib/audience').Audience;
  }
}