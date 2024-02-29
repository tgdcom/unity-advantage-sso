import { resolve } from 'pathe'
import { joinURL, parseURL, stringifyParsedURL } from 'ufo'
import { getToken } from '#auth'

const resolveUrl = (base: string, relative: string) => {
  const { pathname, ...parsed } = parseURL(base)
  return stringifyParsedURL({ ...parsed, pathname: resolve(pathname, relative) })
}

export default defineEventHandler(async (event) => {
  const wantedEndpoint = 'https://unityssotest.b2clogin.com/unityssotest.onmicrosoft.com/b2c_1_signup_signin_web_dev_english/oauth2/v2.0/logout'
  const discoveryURL = (process.env.ADVANTAGE_SSO_ISSUER as string).toLowerCase()
  const _params = event.context.params
  const token = await getToken({ event })

  if (!token) {
    throw createError({ statusCode: 401, statusMessage: 'No token' })
  }

  const { sub } = token

  const endpoint = resolveUrl(discoveryURL, '../oauth2/v2.0/logout')
  const params = {
    post_logout_redirect_uri: joinURL(process.env.AUTH_ORIGIN || 'https://localhost:3001', '/api/auth/logout'),
    id_token_hint: sub
  }

  return { wantedEndpoint, endpoint, sub, discoveryURL, _params, params, token }
})
