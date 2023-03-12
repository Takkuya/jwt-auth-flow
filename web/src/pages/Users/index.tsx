/* eslint-disable camelcase */
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserCard } from '../../components/UserCard'
import { AuthContext } from '../../contexts/AuthContext'
import { api } from '../../lib/axios'
import { Header, LogoutButton, UsersContainer } from './styles'
import jwt_decode from 'jwt-decode'

export type UserData = {
  email: string
  id: string
  isAdmin: boolean
  password: string
  username: string
}

type DecodedTokenData = {
  exp: number
}

export const Users = () => {
  const navigate = useNavigate()

  const { user, setUser } = useContext(AuthContext)

  const [users, setUsers] = useState([])

  async function getUsers() {
    const res = await api.get('/')

    setUsers(res.data)
  }

  console.log('user', user)

  async function handleLogout() {
    try {
      const res = await api.post(
        '/logout',
        { refreshToken: user.refreshToken },
        {
          headers: { authorization: 'Bearer ' + user.accessToken },
        },
      )
      console.log(res)
      navigate('/login')
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <UsersContainer>
      <Header>
        <h1>Listagem de usuários</h1>
        <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
      </Header>

      {users.map((profile: UserData) => {
        return <UserCard key={profile.id} profile={profile} />
      })}
    </UsersContainer>
  )
}
