import styled from 'styled-components'

export const UserCardContainer = styled.div`
  border: 2px solid ${(props) => props.theme.colors['base-text']};
  border-radius: 6px;

  padding: 1rem;

  display: flex;
  gap: 1rem;
  flex-direction: column;
`

export const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Title = styled.h2`
  color: ${(props) => props.theme.colors['base-title']};
`

export const DeleteButton = styled.button`
  padding: 0.5rem 1rem;
  background: ${(props) => props.theme.colors.warning};
  color: ${(props) => props.theme.colors.white};
  font-weight: 500;

  border-radius: 6px;
  border: 0;

  transition: 0.2s all;

  cursor: pointer;

  :hover {
    filter: brightness(80%);
  }
`

export const MessageWrapper = styled.div`
  font-weight: 500;

  .error {
    color: ${(props) => props.theme.colors.warning};
  }

  .succesfull {
    color: ${(props) => props.theme.colors.success};
  }
`
