import { defineConfig } from 'astro/config';

import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind({
    applyBaseStyles: false,
  })],
  site: import.meta.env.SITE_URL,
  output: "server",
  adapter: import.meta.env.PROD ? vercel() : nodejs({ mode: "standalone" }),
});
