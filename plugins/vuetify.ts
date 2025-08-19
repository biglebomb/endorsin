import { defineNuxtPlugin } from "#app";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// This plugin instantiates Vuetify and installs it into the Vue
// application. Components and directives are imported automatically
// to keep the bundle size manageable. See nuxt.config.ts for
// associated build settings and CSS imports.

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
  });
  nuxtApp.vueApp.use(vuetify);
});
