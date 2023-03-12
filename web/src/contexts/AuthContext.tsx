/* eslint-disable camelcase */
import axios from 'axios'
import React, { createContext, ReactNode, useState } from 'react'
import { api } from '../lib/axios'
import jwt_decode from 'jwt-decode'

type UserData = {
  accessToken: string
  password: string
  refreshToken: string
  username: string
}

type AuthContextProviderProps = {
  children: ReactNode
}

type AuthContextData = {
  user: UserData
  setUser: any
}

type DecodedTokenData = {
  exp: number
}

export const AuthContext = createContext({} as AuthContextData)

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<UserData>({} as UserData)

  console.log('user', user)

  const refreshToken = async () => {
    console.log('asdasd')

    try {
      const res = await api.post('/refresh', {
        refreshToken: user.refreshToken,
      })

      setUser({
        ...user,
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
      })

      return res.data
    } catch (err) {
      console.error(err)
    }
  }

  // it does not work without creating this instance
  const axiosJWT = axios.create()

  // do something before every request
  axiosJWT.interceptors.request.use(
    // check is access token is expired
    async (config) => {
      const currentDate = new Date()
      // checking access token expire date
      const decodedToken: DecodedTokenData = jwt_decode(user.accessToken)

      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        const data = await refreshToken()
        config.headers.authorization = 'Bearer ' + data.accessToken
      }

      return config
    },
    (error) => {
      return Promise.reject(error)
    },
  )

  console.log('user', user)

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}
