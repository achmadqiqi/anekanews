/// <reference types="astro/client" />
/// <reference types="@cloudflare/workers-types" />

declare namespace App {
  interface Locals {
    cfContext?: {
      env?: {
        DB?: D1Database;
      };
    };
  }
}
