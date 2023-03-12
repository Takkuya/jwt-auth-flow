import { createGlobalStyle, css } from 'styled-components'

const styled = { createGlobalStyle }

export const GlobalStyle = styled.createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter';
  }

  input:focus {
    outline: 0;
    box-shadow: 0 2px 10px 2px #00000022;
  }

  html {
    font-size: 70%;
  }

  body {
    background: #2148c0;
    color: ${(props) => props.theme.colors['base-alt-text']};
    -webkit-font-smoothing: antialiased;
  }

  body,
  input,
  textarea,
  button {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 1rem;
  }

  ${({ theme: { breakpoints } }) => css`
    @media (min-width: ${breakpoints.md}) {
      html {
        font-size: 100%;
      }
    }
  `}
`
