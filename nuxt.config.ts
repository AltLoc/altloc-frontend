// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from "vite-svg-loader";
import { fileURLToPath, URL } from "node:url";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  ssr: true,
  devtools: { enabled: false },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/i18n", "nuxt-gtag"],
  plugins: ["~/plugins/vue-query.ts"],

  runtimeConfig: {
    public: {
      PUBLIC_CDN_URL: process.env.PUBLIC_CDN_URL,
      PUBLIC_API_URL: process.env.PUBLIC_API_BASE_URL || "/api",
      PUBLIC_GOOGLE_ANALYTICS_ID: process.env.PUBLIC_GOOGLE_ANALYTICS_ID,
    },
  },
  gtag: {
    id: process.env.PUBLIC_GOOGLE_ANALYTICS_ID,
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
          content: "Altloc gamify your life",
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
      {
        code: "en",
        iso: "en-US",
        name: "English",
        file: "en-US.json",
        flag: "en.svg",
      },
      {
        code: "uk",
        iso: "uk-UA",
        name: "Ukrainian",
        file: "uk-UA.json",
        flag: "uk.svg",
      },
      {
        code: "pl",
        iso: "pl-PL",
        name: "Polish",
        file: "pl-PL.json",
        flag: "pl.svg",
      },
    ],

    defaultLocale: "en",
  },
});
