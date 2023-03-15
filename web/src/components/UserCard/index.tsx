import { useState } from 'react'
import { axiosPrivate } from '../../lib/axiosPrivate'
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
  const [errorMessage, setErrorMessage] = useState('')

  async function handleDeleteUser() {
    try {
      const accessToken = JSON.parse(
        localStorage.getItem('session')!,
      ).accessToken

      const res = await axiosPrivate.delete(`/users/${profile.id}`, {
        headers: { authorization: 'Bearer ' + accessToken },
      })

      alert('Usuário deletedo com sucesso')
      return res.data
    } catch (err) {
      setErrorMessage('Não foi possível deletar o usuário')
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
        {errorMessage && <p className="error">{errorMessage}</p>}
      </MessageWrapper>
    </UserCardContainer>
  )
}
