import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import db from "@astrojs/db";
import auth from "auth-astro";
import vercel from "@astrojs/vercel/serverless";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), db(), react(), auth({
    providers: [],
    db: {
      // db connection
      client: 'astrodb',
      connection: process.env.DATABASE_URL
    }
  }), sitemap()],
  output: "server",
  adapter: vercel()
});