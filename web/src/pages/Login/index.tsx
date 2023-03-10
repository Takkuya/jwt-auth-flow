import { GoogleLogo } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
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

  const [user, setUser] = useState<UserData>({} as UserData)

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

  const refreshToken = async () => {
    try {
      const res = await api.post('/refresh', { tokeb: user.refreshToken })

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

  async function handleLogin() {
    try {
      const res = await api.post('/login', { username, password })
      setUser(res.data)

      console.log('decoded token', res.data)

      navigate('/test')
    } catch (err) {
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
          <p>Username</p>
          <Input type="text" {...register('username')} />
          {errors.username && (
            <ErrorMessage>{errors.username.message}</ErrorMessage>
          )}
        </Label>
        <Label>
          <p>Password</p>
          <Input type="password" {...register('password')} />
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
