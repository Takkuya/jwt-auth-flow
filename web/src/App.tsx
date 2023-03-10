import { MainRoutes } from './routes'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import defaultTheme from './styles/themes/default'
import { GlobalStyle } from './styles/global'
import { AppContainer } from './AppStyle'

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <AppContainer>
          <MainRoutes />
          <GlobalStyle />
        </AppContainer>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
