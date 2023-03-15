/* eslint-disable camelcase */
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserCard } from '../../components/UserCard'
import { AuthContext } from '../../contexts/AuthContext'
import { api } from '../../lib/axios'
import { Header, LogoutButton, UsersContainer } from './styles'
import { axiosPrivate } from '../../lib/axiosPrivate'

export type UserData = {
  email: string
  id: string
  isAdmin: boolean
  password: string
  username: string
}

export const Users = () => {
  const navigate = useNavigate()

  const { user } = useContext(AuthContext)

  const [users, setUsers] = useState([])

  async function getUsers() {
    const res = await api.get('/')

    setUsers(res.data)
  }

  async function handleLogout() {
    try {
      const accessToken = JSON.parse(
        localStorage.getItem('session')!,
      ).accessToken

      await axiosPrivate.post(
        '/logout',
        { refreshToken: user.refreshToken },
        {
          headers: { authorization: 'Bearer ' + accessToken },
        },
      )
      navigate('/login')
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getUsers()
  }, [users, setUsers])

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
