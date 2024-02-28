import type { OAuthConfig, OAuthUserConfig as OAuthUserConfigImp } from 'next-auth/providers/oauth'

type OAuthUserConfig<P> =
  Partial<OAuthUserConfigImp<P>> &
  Required<Pick<OAuthUserConfigImp<P>, 'clientId'>> &
  { discoveryURL: string }

export interface Profile {
  oid: string
  given_name: string
  family_name: string
  extension_hasActiveEdwSubscription?: boolean
  extension_hasActiveUmgSubscription?: boolean
}

export interface User {
  id: string
  name: string
  hasActiveEdwSubscription: boolean
  hasActiveUmgSubscription: boolean
}

export function AdvantageProvider (
  { discoveryURL, ...options }: OAuthUserConfig<Profile>
): OAuthConfig<Profile> {
  // const baseURL = https://unityssotest.b2clogin.com/unityssotest.onmicrosoft.com/B2C_1_SignUp_SignIn_Web_Dev_English/oauth2/v2.0/.well-known/openid-configuration

  return {
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
        token?.extension_hasActiveUmgSubscription || false
    }),
    // wellKnown: 'https://unityssotest.b2clogin.com/unityssotest.onmicrosoft.com/B2C_1_SignUp_SignIn_Web_Dev_English/v2.0/.well-known/openid-configuration',
    wellKnown: discoveryURL,
    client: {
      token_endpoint_auth_method: 'none'
    },
    idToken: true,
    options: options as OAuthUserConfigImp<Profile>
  }
}

export default AdvantageProvider
