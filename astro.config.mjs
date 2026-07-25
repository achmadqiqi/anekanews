import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import emdash from "emdash/astro";
import { d1, kvCache } from "@emdash-cms/cloudflare";
import { cloudflareEmail } from "@emdash-cms/cloudflare/plugins/cloudflare-email";

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
      plugins: [
        cloudflareEmail({ from: "noreply@anekanews.com" })
      ],
    }),
  ],
});
