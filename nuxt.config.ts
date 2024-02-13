// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@hebilicious/authjs-nuxt',
    '@nuxt/ui',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    'nuxt-radash',
  ],
  alias: {
    cookie: 'cookie',
  },
  // Optional default config
  authJs: {
    verifyClientOnEveryRequest: false,
    guestRedirectTo: '/', // where to redirect if the user is not authenticated
    authenticatedRedirectTo: '/', // where to redirect if the user is authenticated
    baseUrl: process.env.NUXT_NEXTAUTH_URL || 'http://localhost:3001/', // should be something like https://www.my-app.com
  },
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config',
    exposeConfig: {
      level: 2,
    },
    config: {},
    viewer: true,
  },
  runtimeConfig: {
    ADVANTAGE_SSO_BASE_URL: process.env.ADVANTAGE_SSO_BASE_URL,
    authJs: {
      secret: process.env.NUXT_NEXTAUTH_SECRET, // You can generate one with `openssl rand -base64 32`
    },
    advantage: {
      clientId: process.env.NUXT_ADVANTAGE_CLIENT_ID,
      clientSecret: process.env.NUXT_ADVANTAGE_CLIENT_SECRET,
      tenantId: process.env.NUXT_ADVANTAGE_TENANT_ID,
      primaryUserFlow: process.env.NUXT_ADVANTAGE_PRIMARY_USER_FLOW,
    },
    github: {
      clientId: process.env.NUXT_GITHUB_CLIENT_ID,
      clientSecret: process.env.NUXT_GITHUB_CLIENT_SECRET,
    },
    public: {
      authJs: {
        baseUrl: process.env.NUXT_NEXTAUTH_URL || 'http://localhost:3001/', // The URL of your deployed app (used for origin Check in production)
        verifyClientOnEveryRequest: process.env.NODE_ENV === 'production', // whether to hit the /auth/session endpoint on every client request
      },
    },
  },
})
