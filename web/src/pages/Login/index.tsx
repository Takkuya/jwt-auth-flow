import { GoogleLogo } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext, useEffect, useState } from 'react'
import { api } from '../../lib/axios'
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode'
import {
  BorderWrapper,
  Button,
  CustomLink,
  ErrorMessage,
  FormWrapper,
  GoogleButton,
  Header,
  Input,
  Label,
  FormContainer,
  OAuthWrapper,
  Title,
} from '../../styles/form'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import axios from 'axios'

const loginFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O Usuário precisa ter pelo menos 3 letras' }),
  password: z
    .string()
    .min(3, { message: 'A senha precisa ter pelo menos 3 letras' }),
})

type LoginFormData = z.infer<typeof loginFormSchema>

type UserData = {
  accessToken: string
  password: string
  refreshToken: string
  username: string
}

type DecodedTokenData = {
  exp: number
}

export const Login = () => {
  const navigate = useNavigate()

  const { setUser } = useContext(AuthContext)

  const [errorMessage, setErrorMessage] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  })

  const username = watch('username')
  const password = watch('password')

  async function handleLogin() {
    console.log('asdasds')

    try {
      const res = await api.post('/login', { username, password })
      setUser(res.data)

      navigate('/users')
    } catch (err) {
      setErrorMessage('Usuário ou senha incorretos')
      console.error(err)
    }
  }

  return (
    <FormContainer onSubmit={handleSubmit(handleLogin)}>
      <Header>
        <Title>Entrar</Title>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima,
          officia!
        </p>
      </Header>
      <FormWrapper>
        <Label>
          <p>Nome de usuário</p>
          <Input
            type="text"
            required
            {...register('username')}
            error={!!errorMessage}
          />
          {errors.username && (
            <ErrorMessage>{errors.username.message}</ErrorMessage>
          )}
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </Label>
        <Label>
          <p>Senha</p>
          <Input
            type="password"
            required
            {...register('password')}
            error={!!errorMessage}
          />
        </Label>
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}
      </FormWrapper>
      <Button>Confirmar</Button>

      <OAuthWrapper>
        <BorderWrapper>
          <div className="border" />
          <p>OU</p>
          <div className="border" />
        </BorderWrapper>
        <GoogleButton>
          <GoogleLogo size={20} weight="bold" /> Continue com o Google
        </GoogleButton>
        <p>
          Não tem uma conta? <CustomLink to="/register">Registrar</CustomLink>
        </p>
      </OAuthWrapper>
    </FormContainer>
  )
}
