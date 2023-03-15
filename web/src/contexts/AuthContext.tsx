/* eslint-disable camelcase */
import { createContext, ReactNode, useState } from 'react'

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

export const AuthContext = createContext({} as AuthContextData)

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<UserData>({} as UserData)

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}
