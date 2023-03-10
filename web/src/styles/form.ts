import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const FormContainer = styled.form`
  width: 400px;

  display: flex;
  gap: 1.5rem;
  flex-direction: column;
  justify-content: center;

  background: ${(props) => props.theme.colors.white};

  padding: 2rem;

  border-radius: 8px;
  border: 2px solid ${(props) => props.theme.colors['base-title']};
`

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;

  p {
    color: ${(props) => props.theme.colors['base-alt-text']};
    font-size: 1.1rem;
    font-weight: 400;
  }
`

export const Title = styled.h1`
  color: ${(props) => props.theme.colors['base-title']};
  font-size: 2rem;
`

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;

  p {
    color: ${(props) => props.theme.colors['base-subtitle']};
    font-size: 1rem;
    font-weight: 500;
  }
`

type InputStyleProps = {
  error?: boolean
}

export const Input = styled.input<InputStyleProps>`
  height: 3rem;
  border-radius: 6px;
  padding: 0 1rem;

  border: 1px solid
    ${(props) =>
      props.error
        ? props.theme.colors.warning
        : props.theme.colors['base-text']};

  color: ${(props) => props.theme.colors['base-text']};
  font-weight: 500;

  transition: 0.2s all;
`

export const Button = styled.button`
  border-radius: 6px;
  font-size: 1rem;
  background: ${(props) => props.theme.colors['primary-dark']};
  color: ${(props) => props.theme.colors.white};
  border: 0;
  font-weight: 500;

  cursor: pointer;

  padding: 1rem 0;

  transition: 0.2s all;

  &:hover {
    filter: brightness(80%);
  }
`

export const ErrorMessage = styled.span`
  color: ${(props) => props.theme.colors.warning};
  font-weight: 500;
  font-size: 0.9rem;
`

export const OAuthWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  p {
    text-align: center;
    color: ${(props) => props.theme.colors['base-text']};
  }
`

export const CustomLink = styled(NavLink)`
  color: ${(props) => props.theme.colors['primary-light']};
  font-weight: 500;
  text-decoration: none;

  transition: 0.2s all;

  &:hover {
    border-bottom: 1px solid ${(props) => props.theme.colors['primary-dark']};
  }
`

export const BorderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 1rem;

  .border {
    height: 1px;
    width: 100%;
    border-top: 1px solid ${(props) => props.theme.colors['base-alt-text']};
    border-radius: 6px;
  }
`

export const GoogleButton = styled.button`
  margin-top: 0.5rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  border-radius: 6px;
  font-size: 1rem;
  background: transparent;
  color: ${(props) => props.theme.colors['base-text']};
  border: 1px solid ${(props) => props.theme.colors['base-subtitle']};
  font-weight: 500;

  cursor: pointer;

  padding: 0.75rem 0;

  transition: 0.2s all;

  &:hover {
    background: ${(props) => props.theme.colors['base-subtitle']};
    color: ${(props) => props.theme.colors.white};
  }
`
