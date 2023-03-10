import { GoogleLogo } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { api } from '../../lib/axios'
import { useNavigate } from 'react-router-dom'

const loginFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O Usuário precisa ter pelo menos 3 letras' }),
  email: z
    .string()
    .min(1, { message: 'Esse campo precisa ser preenchido' })
    .email({ message: 'Esse email não é válido' }),
  password: z
    .string()
    .min(6, { message: 'A senha precisa ter pelo menos 6 letras' }),
})

type LoginFormData = z.infer<typeof loginFormSchema>

export const Register = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  })

  const username = watch('username')
  const email = watch('email')
  const password = watch('password')

  async function handleRegister() {
    try {
      const res = await api.post('/register', {
        email,
        username,
        password,
      })

      navigate('/login')
      console.log('funcionou?')
      return res
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <FormContainer onSubmit={handleSubmit(handleRegister)}>
      <Header>
        <Title>Registrar</Title>
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
          <p>Email</p>
          <Input type="email" {...register('email')} />
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
          Já se cadastrou? <CustomLink to="/login">Entrar</CustomLink>
        </p>
      </OAuthWrapper>
    </FormContainer>
  )
}
