import React, { useState } from 'react'
import Carousel from '../components/Carousel/Carousel'
import LoginForm from '../components/Auth/LoginForm'
import RegisterForm from '../components/Auth/RegisterForm'
import { Box } from '@chakra-ui/react'

export default function LandingPage() {
  const [showRegister, setShowRegister] = useState(false)

  return (
    <Box position='relative' minH='100vh' overflow='hidden'>
      {}
      <Box position='fixed' top={0} left={0} w='100vw' h='100vh' zIndex={1}>
        <Carousel />
      </Box>
      {}
      <Box
        position='fixed'
        top='50%'
        left='50%'
        transform='translate(-50%, -50%)'
        zIndex={2}
        w={['98vw', '400px']}
        maxW='95vw'
        minW={['90vw', '350px']}
      >
        {showRegister ? (
          <RegisterForm switchToLogin={() => setShowRegister(false)} />
        ) : (
          <LoginForm switchToRegister={() => setShowRegister(true)} />
        )}
      </Box>
    </Box>
  )
}
