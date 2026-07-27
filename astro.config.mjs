import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import emdash from "emdash/astro";
import { d1, kvCache, r2 } from "@emdash-cms/cloudflare";
import { cloudflareEmail } from "@emdash-cms/cloudflare/plugins/cloudflare-email";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const safeR2StoragePath = resolve(__dirname, "src/lib/safe-r2-storage.ts").replace(/\\/g, "/");

export default defineConfig({
  site: "https://anekanews.com",
  output: "server",
  adapter: cloudflare({
    inspectorPort: false,
    imageService: "passthrough",
    prerenderEnvironment: "node",
  }),
  integrations: [
    react(),
    emdash({
      siteUrl: "https://anekanews.com",
      database: d1({ binding: "DB" }),
      objectCache: kvCache({ binding: "CACHE" }),
      storage: {
        entrypoint: safeR2StoragePath,
        config: { binding: "MEDIA" },
      },
      plugins: [
        cloudflareEmail({ from: "noreply@anekanews.com" })
      ],
    }),
  ],
});
