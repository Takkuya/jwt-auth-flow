import styled from 'styled-components'

export const UsersContainer = styled.div`
  height: 100vh;
  width: 40rem;
  background: ${(props) => props.theme.colors.white};
  overflow-x: hidden;

  padding: 2rem 3rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  h1 {
    color: ${(props) => props.theme.colors['base-title']};
  }
`

export const Header = styled.header`
  display: flex;
  align-items: center;

  justify-content: space-between;

  padding-bottom: 1rem;
`

export const LogoutButton = styled.button`
  color: ${(props) => props.theme.colors.white};
  background: ${(props) => props.theme.colors['primary-dark']};
  font-weight: 500;

  border-radius: 6px;
  border: 0;
  padding: 0.5rem 1.5rem;

  transition: 0.2s all;
  cursor: pointer;

  &:hover {
    filter: brightness(80%);
  }
`
