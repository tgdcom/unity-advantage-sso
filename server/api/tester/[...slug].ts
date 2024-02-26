export default defineEventHandler(async (event) => {
  const file = import.meta.url

  const url = getRequestURL(event)
  const path = event.path
  const host = getRequestHost(event)
  const fingerprint = getRequestFingerprint(event)

  return {
    data: 'Hello from the server!',
    meta: {
      file,
      url,
      path,
      host,
      fingerprint,
    },
  }
})
