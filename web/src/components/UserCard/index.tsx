import axios from 'axios'
import { useState } from 'react'
import { api } from '../../lib/axios'
import { UserData } from '../../pages/Users'
import {
  DeleteButton,
  InfoWrapper,
  MessageWrapper,
  Title,
  UserCardContainer,
} from './styles'

type UserCardProps = {
  user: UserData
}

export const UserCard = ({ user }: UserCardProps) => {
  const [error, setError] = useState('')

  console.log('usuário maneiro e legal', user)

  async function handleDeleteUser() {
    try {
      const res = await api.delete(`/users/${user.id}`)

      console.log('usuário deletado')

      return res.data
    } catch (err) {
      setError('Não foi possível deletar o usuário')
      console.error(err)
    }
  }

  return (
    <UserCardContainer>
      <InfoWrapper>
        <Title>{user.username}</Title>
        <DeleteButton onClick={handleDeleteUser}>Deletar</DeleteButton>
      </InfoWrapper>
      <MessageWrapper>
        {error && <p className="error">{error}</p>}
        {/* 
        <p className="succesfull">
          Usuário deletado com sucesso
        </p> */}
      </MessageWrapper>
    </UserCardContainer>
  )
}
