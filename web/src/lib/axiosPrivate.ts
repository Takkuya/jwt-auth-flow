import axios, { AxiosRequestHeaders, InternalAxiosRequestConfig } from 'axios'
import { memoizedRefreshToken } from '../utils/refreshToken'

axios.defaults.baseURL = 'http://localhost:5000/api'

type iAxiosRequestHeaders = AxiosRequestHeaders & {
  authorization: string
}

axios.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const accessToken = JSON.parse(localStorage.getItem('session')!).accessToken

    if (!accessToken) {
      console.error('No access token')
    }

    if (!accessToken) {
      config.headers = {
        ...config.headers,
        authorization: `Bearer ${accessToken}`,
      } as iAxiosRequestHeaders
    }

    return config
  },
  (error) => Promise.reject(error),
)

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config

    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true

      const result = await memoizedRefreshToken()

      if (result?.accessToken) {
        config.headers = {
          ...config.headers,
          authorization: `Bearer ${result?.accessToken}`,
        }
      }

      return axios(config)
    }
    return Promise.reject(error)
  },
)

export const axiosPrivate = axios
