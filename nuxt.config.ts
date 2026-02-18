// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      htmlAttrs: {
        dir: "rtl",
        lang: "ar",
      },
      title: "مهارى",
      meta: [{ name: "description", content: "مهارى" }],
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/logo.png",
        },
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css",
        },
      ],
    },
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
  },
});
