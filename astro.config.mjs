import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import db from "@astrojs/db";
import auth from "auth-astro";
import vercel from "@astrojs/vercel/serverless";
import sitemap from "@astrojs/sitemap";
import dotenv from 'dotenv';
dotenv.config();

// https://astro.build/config
export default defineConfig({
  site: 'https://www.swifly.app',
  integrations: [tailwind(), db(), react(), auth({
    providers: [],
    db: {
      // db connection
      client: 'astrodb',
      connection: process.env.ASTRO_STUDIO_APP_TOKEN
    }
  }), sitemap()],
  output: "server",
  adapter: vercel()
});