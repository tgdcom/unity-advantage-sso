import CredentialsProvider from 'next-auth/providers/credentials'
import { pick } from 'radash'
import { v4 as uuid } from 'uuid'

// import { AdvantageProvider, type User } from '#imports'
import { NuxtAuthHandler } from '#auth'

type AuthOptions = Exclude<Parameters<typeof NuxtAuthHandler>[0], undefined>
type Callbacks = Exclude<AuthOptions['callbacks'], undefined>
type SessionParams = Parameters<Exclude<Callbacks['session'], undefined>>[0]

export default NuxtAuthHandler({
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
    session ({ session, token, user }: SessionParams) {
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
        ...pick(user as any, wanted)
      }

      return session
    }
  },
  providers: [
    AdvantageProvider({
      id: 'advantage',
      // id: 'advantage-custom',
      clientId: process.env.NUXT_ADVANTAGE_CLIENT_ID as string,
      issuer: process.env.ADVANTAGE_SSO_ISSUER as string
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
