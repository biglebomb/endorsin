import { defineNuxtConfig } from "nuxt/config";

// Nuxt configuration for the endors.in MVP. This configuration
// registers the Supabase module for serverless data access and
// sets up Vuetify styles. Supabase credentials are injected at
// runtime via environment variables (see the runtimeConfig block).

export default defineNuxtConfig({
  // Enable the Supabase module. This will expose composables such as
  // useSupabaseClient() throughout the application.
  modules: ["@nuxtjs/supabase"],

  // Include Vuetify styles. Vuetify is imported via a plugin (see
  // plugins/vuetify.ts) and must be transpiled.
  css: [
    "vuetify/lib/styles/main.sass"
  ],
  build: {
    transpile: ["vuetify"]
  },
    nitro: {
    preset: "vercel-edge"
  },


  // Public runtime configuration exposes the Supabase URL and anon
  // key to the client. These values are populated from the
  // environment variables NUXT_PUBLIC_SUPABASE_URL and
  // NUXT_PUBLIC_SUPABASE_ANON_KEY when deployed.
  runtimeConfig: {
    public: {
      supabase: {
        url: process.env.NUXT_PUBLIC_SUPABASE_URL,
        key: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY
      }
    }
  }
});
