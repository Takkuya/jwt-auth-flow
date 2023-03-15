import mem from 'mem'

import { axiosPublic } from '../lib/axiosPublic'

const refreshTokenFn = async () => {
  const sessionObject = JSON.parse(localStorage.getItem('session')!)

  try {
    const refreshToken = sessionObject.refreshToken

    const response = await axiosPublic.post('/refresh', {
      refreshToken,
    })

    const session = response.data
    const newRefreshToken = session.refreshToken
    const newAccessToken = session.accessToken

    if (!session?.accessToken) {
      localStorage.removeItem('session')
      // localStorage.removeItem('user')
    }

    localStorage.setItem(
      'session',
      JSON.stringify({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      }),
    )

    return session
  } catch (err) {
    localStorage.removeItem('session')
    // localStorage.removeItem('user')
    console.error(err)
  }
}

const maxAge = 10000 // 10 seconds

export const memoizedRefreshToken = mem(refreshTokenFn, { maxAge })
