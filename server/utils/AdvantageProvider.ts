import { join } from 'pathe'
import type { Profile, User } from '@auth/core/types'
import type { OAuth2Config, OAuthUserConfig } from '@auth/core/providers/oauth'

export const AdvantageProviderConfig = {
  id: 'advantage',
  name: 'Advantage SSO',
  type: 'oauth',
  checks: ['pkce', 'state'],
  profile: (token: Profile): User => ({
    id: token.oid,
    name: `${token.given_name} ${token.family_name}`,
    hasActiveEdwSubscription:
      token?.extension_hasActiveEdwSubscription || false,
    hasActiveUmgSubscription:
      token?.extension_hasActiveUmgSubscription || false,
  }),
} satisfies OAuth2Config<Profile>

export function AdvantageProvider(
  options: OAuthUserConfig<Profile>,
): OAuth2Config<Profile> {
  // https://unityssotest.b2clogin.com/unityssotest.onmicrosoft.com/B2C_1_SignUp_SignIn_Web_Dev_English/oauth2/v2.0/
  const { ADVANTAGE_SSO_BASE_URL, ORIGIN } = useRuntimeConfig()

  const absoluteUrl = (...path: string[]): string =>
    join(ADVANTAGE_SSO_BASE_URL, ...path)

  return {
    ...AdvantageProviderConfig,
    authorization: {
      url: absoluteUrl('/authorize'),
      params: {
        scope: 'openid',
        response_type: 'code',
        redirect_uri: join(ORIGIN, '/api/auth/callback/advantage'),
      },
    },
    token: absoluteUrl('/token'),
    issuer: absoluteUrl('/'),
    options,
  } as OAuth2Config<Profile> & {
    options?: OAuthUserConfig<Profile>
  }
}

export default AdvantageProvider
