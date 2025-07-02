export default defineNuxtRouteMiddleware((to, _) => {
  const { initSession, token } = useAuth()
  if (!token.value) {
    return initSession().catch((error) => {
      console.error('Error during session initialization:', error)
      throw createError({
        statusCode: 500,
        message: 'Failed to initialize session. Please try again later.',
      })
    })
  }
  return true
})
