import axios from 'axios'
import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
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
  profile: UserData
}

export const UserCard = ({ profile }: UserCardProps) => {
  const [error, setError] = useState('')

  const { user } = useContext(AuthContext)

  async function handleDeleteUser() {
    try {
      const res = await api.delete(`/users/${profile.id}`, {
        headers: { authorization: 'Bearer ' + user.accessToken },
      })

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
        <Title>{profile.username}</Title>
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
