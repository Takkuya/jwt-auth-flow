import { MainRoutes } from './routes'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import defaultTheme from './styles/themes/default'
import { GlobalStyle } from './styles/global'
import { AppContainer } from './AppStyle'
import { AuthContextProvider } from './contexts/AuthContext'

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <ThemeProvider theme={defaultTheme}>
          <AppContainer>
            <MainRoutes />
            <GlobalStyle />
          </AppContainer>
        </ThemeProvider>
      </AuthContextProvider>
    </BrowserRouter>
  )
}

export default App
