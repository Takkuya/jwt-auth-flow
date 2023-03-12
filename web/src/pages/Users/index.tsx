import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserCard } from '../../components/UserCard'
import { api } from '../../lib/axios'
import { Header, LogoutButton, UsersContainer } from './styles'

export type UserData = {
  email: string
  id: string
  isAdmin: boolean
  password: string
  username: string
}

export const Users = () => {
  const navigate = useNavigate()

  const [users, setUsers] = useState([])

  async function getUsers() {
    const res = await api.get('/')

    setUsers(res.data)
  }

  function handleLogout() {
    try {
      // const res = api.post('/logout')
      console.log('usuário saiu')
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

      {users.map((user: UserData) => {
        return <UserCard key={user.id} user={user} />
      })}
    </UsersContainer>
  )
}
