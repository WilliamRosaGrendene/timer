import { ThemeProvider } from "styled-components"
import { Rounter } from "./Rounter"
import { defaultTheme } from "./styles/themes/default"
import { BrowserRouter } from 'react-router-dom'

import { GlobalStyle } from "./styles/themes/global"
import { CyclesContextProvider } from "./contexts/CyclesContext"

export function App() {

  return (
    <ThemeProvider theme={defaultTheme}>   {/* tag de styled criada para envelopar todos os elementos com uma tipagem de thema iguais */}
      <BrowserRouter>    {/* tag de rotas/caminhos dos elementos, ela também é mostrada na URL da página */}
          <CyclesContextProvider>
            <Rounter />
          </CyclesContextProvider>
      </BrowserRouter>
      <GlobalStyle />    {/* tag de styled gerais da página */}
    </ThemeProvider>
  )
}

