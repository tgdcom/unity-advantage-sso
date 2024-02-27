const ORIGIN = process.env.ORIGIN || 'http://localhost:3001/'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@sidebase/nuxt-auth',
    '@nuxtjs/tailwindcss',
    '@bg-dev/nuxt-naiveui'
  ],
  build: {
    transpile: [
      'trpc-nuxt'
    ]
  },
  typescript: {
    shim: false
  },
  runtimeConfig: {
    ORIGIN,
    ADVANTAGE_SSO_BASE_URL: process.env.ADVANTAGE_SSO_BASE_URL,
    authJs: {
      secret: process.env.NUXT_NEXTAUTH_SECRET // You can generate one with `openssl rand -base64 32`
    },
    advantage: {
      clientId: process.env.NUXT_ADVANTAGE_CLIENT_ID,
      clientSecret: process.env.NUXT_ADVANTAGE_CLIENT_SECRET,
      tenantId: process.env.NUXT_ADVANTAGE_TENANT_ID,
      primaryUserFlow: process.env.NUXT_ADVANTAGE_PRIMARY_USER_FLOW
    },
    public: {
      authJs: {
        baseUrl: ORIGIN,
        verifyClientOnEveryRequest: process.env.NODE_ENV === 'production' // whether to hit the /auth/session endpoint on every client request
      }
    }
  }
})
