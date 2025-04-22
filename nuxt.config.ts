// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from "vite-svg-loader";
import { fileURLToPath, URL } from "node:url";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/i18n"],
  plugins: ["~/plugins/vue-query.ts"],
  runtimeConfig: {
    public: {
      PUBLIC_CDN_URL: process.env.PUBLIC_CDN_URL,
    },
  },
  vite: {
    plugins: [svgLoader()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./", import.meta.url)),
      },
    },
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:4000",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
      extensions: ["vue"],
    },
  ],
  app: {
    head: {
      title: "nuxt-vue-query",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content: "Nuxt.js project with Vue Query",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  i18n: {
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root", // recommended
    },
    lazy: true,
    langDir: "locales",
    strategy: "prefix",
    locales: [
      { code: "en", iso: "en-US", name: "English", file: "en-US.json" },
      { code: "uk", iso: "uk-UA", name: "Ukrainian", file: "uk-UA.json" },
      { code: "pl", iso: "pl-PL", name: "Polish", file: "pl-PL.json" },
    ],
    defaultLocale: "en",
  },
});
