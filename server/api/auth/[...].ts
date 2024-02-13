import AzureADB2CProvider from '@auth/core/providers/azure-ad-b2c'
import CredentialsProvider from '@auth/core/providers/credentials'
import { pick } from 'radash'
import { v4 as uuid } from 'uuid'
import type { User } from '@auth/core/types'
import { AdvantageProvider } from '#imports'
import { NuxtAuthHandler } from '#auth'

// The #auth virtual import comes from this module. You can use it on the client
// and server side, however not every export is universal. For example do not
// use sign-in and sign-out on the server side.

const runtimeConfig = useRuntimeConfig()

type AuthConfig = Parameters<typeof NuxtAuthHandler>[0]

// Refer to Auth.js docs for more details
export const authOptions: AuthConfig = {
  secret: runtimeConfig.authJs.secret,
  basePath: '/api/auth',
  callbacks: {
    jwt({ token, user }: { token: any; user: User }) {
      if (!user) return token

      token.id = user.id
      token.name = user.name
      token.hasActiveEdwSubscription = user.hasActiveEdwSubscription
      token.hasActiveUmgSubscription = user.hasActiveUmgSubscription

      console.log('jwt callback', { token, user })

      return token
    },
    session({ session, token, user }: { session: any; token: any; user: any }) {
      console.log('session callback', { session, token, user })

      const wanted = [
        'id',
        'name',
        'hasActiveEdwSubscription',
        'hasActiveUmgSubscription',
      ]

      session.user = {
        ...session.user,
        ...pick(token, wanted),
        ...pick(user, wanted),
      }

      return session
    },
  },
  providers: [
    AdvantageProvider({
      clientId: runtimeConfig.advantage.clientId,
    }),
    AzureADB2CProvider({
      id: 'azure-ad',
      clientId: runtimeConfig.advantage.clientId,
      clientSecret: runtimeConfig.advantage.clientSecret,
      tenantId: runtimeConfig.advantage.tenantId,
      primaryUserFlow: runtimeConfig.advantage.primaryUserFlow,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: '(hint: Roger Rabbit)',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: '(hint: anything but "password")',
        },
      },
      authorize(credentials) {
        if (credentials?.password === 'password') {
          // eslint-disable-next-line no-console
          console.error(
            'Warning: Malicious login attempt registered, bad credentials provided',
          )
          return null
        }

        const id = uuid()
        const name = (credentials?.username as string) || 'Jimmy Neutron'
        console.info(`Logging in user ${name} with ID ${id}...`)
        const user: User = {
          id,
          name,
          hasActiveEdwSubscription: true,
          hasActiveUmgSubscription: true,
          // subscriptions: 'can access EDW',
        }

        return user
      },
    }),
  ],
}

const handler = NuxtAuthHandler(authOptions, runtimeConfig)
// If you don't want to pass the full runtime config,
//  you can pass something like this: { public: { authJs: { baseUrl: "" } } }

export default defineEventHandler((event) => {
  const ORIGIN = getRequestHeader(event, 'Origin')
  const baseUrl = runtimeConfig.public?.authJs?.baseUrl
  console.log('credentials.authorize', { ORIGIN, baseUrl })

  if (!ORIGIN) {
    console.warn('[auth] ORIGIN not set. Auth disabled.')
    // return false
  }

  return handler(event)
})
