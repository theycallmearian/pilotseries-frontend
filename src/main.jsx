import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import App from './App'
import './styles/global.scss'
import { AuthProvider } from './context/AuthContext'
import { AlertProvider } from './context/AlertContext'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './context/UserContext'

const theme = extendTheme({
  fonts: {
    heading: `'Michroma', sans-serif`,
    body: `'Inter', sans-serif`
  },
  colors: {
    brand: {
      500: '#4b009b',
      200: '#02f987'
    }
  },
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: true
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'dark' ? '#191b1d' : '#fff',
        color: props.colorMode === 'dark' ? '#fafafa' : '#191b1d',
        transition: 'background 0.3s'
      }
    })
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <AlertProvider>
        <BrowserRouter>
          <AuthProvider>
            <UserProvider>
              <App />
            </UserProvider>
          </AuthProvider>
        </BrowserRouter>
      </AlertProvider>
    </ChakraProvider>
  </React.StrictMode>
)
