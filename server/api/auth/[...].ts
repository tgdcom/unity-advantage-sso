import CredentialsProvider from 'next-auth/providers/credentials'
import AzureADB2CProvider from 'next-auth/providers/azure-ad-b2c'
import { pick } from 'radash'
import { v4 as uuid } from 'uuid'

import { AdvantageProvider, type User } from '../utils/AdvantageProvider'
import { NuxtAuthHandler } from '#auth'

export default NuxtAuthHandler({
  // TODO: SET A STRONG SECRET, SEE https://sidebase.io/nuxt-auth/configuration/nuxt-auth-handler#secret
  secret: process.env.AUTH_SECRET,
  callbacks: {
    jwt ({ token, user }) {
      if (!user) { return token }

      token.id = user.id
      token.name = user.name
      token.hasActiveEdwSubscription = (user as User).hasActiveEdwSubscription
      token.hasActiveUmgSubscription = (user as User).hasActiveUmgSubscription

      // eslint-disable-next-line no-console
      console.log('jwt callback', { token, user })

      return token
    },
    session ({ session, token, user }: { session: any; token: any; user: any }) {
      // eslint-disable-next-line no-console
      console.log('session callback', { session, token, user })

      const wanted = [
        'id',
        'name',
        'hasActiveEdwSubscription',
        'hasActiveUmgSubscription'
      ]

      session.user = {
        ...session.user,
        ...pick(token, wanted),
        ...pick(user, wanted)
      }

      return session
    }
  },
  providers: [
    AdvantageProvider({
      id: 'advantage',
      // id: 'advantage-custom',
      clientId: process.env.NUXT_ADVANTAGE_CLIENT_ID as string
    }),
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    AzureADB2CProvider.default({
      // id: 'advantage',
      clientId: process.env.NUXT_ADVANTAGE_CLIENT_ID,
      // clientSecret: runtimeConfig.advantage.clientSecret,
      tenantId: process.env.NUXT_ADVANTAGE_TENANT_ID,
      primaryUserFlow: process.env.NUXT_ADVANTAGE_PRIMARY_USER_FLOW,
      checks: ['pkce', 'state']
    }),
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    CredentialsProvider.default({
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
          placeholder: '(hint: Roger Rabbit)'
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: '(hint: anything but "password")'
        }
      },
      authorize (credentials: any) {
        if (credentials?.password === 'password') {
          console.error(
            'Warning: Malicious login attempt registered, bad credentials provided'
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
          hasActiveUmgSubscription: true
        }

        return user
      }
    })
  ]
})
