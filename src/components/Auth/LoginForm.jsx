const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

import React, { useState } from 'react'
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Text,
  Image
} from '@chakra-ui/react'
import { useAuth } from '../../context/AuthContext'
import { useAlert } from '../../context/AlertContext'
import { useNavigate } from 'react-router-dom'

export default function LoginForm({ switchToRegister }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const { showError, showSuccess } = useAlert()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || 'Error en autenticación')
      }
      const data = await res.json()
      login(data.token, data.user)
      showSuccess('Login correcto')
      navigate('/app')
    } catch (e) {
      showError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      bg='rgba(0,0,0,0.85)'
      p={6}
      borderRadius='md'
      width='100%'
      maxW='400px'
      textAlign='center'
      mt={12}
    >
      <Image
        src='https://res.cloudinary.com/dye4qdrys/image/upload/v1750485116/pilotseries/logo_favicon/logo_text.png'
        alt='PilotSeries Logo'
        mx='auto'
        mb={4}
        maxH='150px'
        filter='brightness(0) invert(1)'
      />

      <Heading
        as='h2'
        size='lg'
        mb={4}
        color='white'
        fontFamily="'Michroma', sans-serif"
      >
        Iniciar Sesión
      </Heading>

      <form onSubmit={handleSubmit}>
        <FormControl id='email' mb={3} isRequired>
          <FormLabel color='white'>Email</FormLabel>
          <Input
            type='email'
            placeholder='Tu correo'
            _placeholder={{ color: 'white', opacity: 1 }}
            color='purple.200'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

        <FormControl id='password' mb={6} isRequired>
          <FormLabel color='white'>Contraseña</FormLabel>
          <Input
            type='password'
            placeholder='Contraseña'
            _placeholder={{ color: 'white', opacity: 1 }}
            color='purple.200'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>

        <Button
          bg='brand.500'
          color='white'
          _hover={{ bg: 'brand.200', color: 'black' }}
          width='100%'
          mb={3}
          type='submit'
          isLoading={loading}
          isDisabled={loading}
        >
          Entrar
        </Button>
      </form>

      <Text mt={2} textAlign='center' fontSize='sm' color='white'>
        ¿No tienes cuenta?{' '}
        <Text
          as='span'
          color='brand.200'
          fontWeight='bold'
          cursor='pointer'
          onClick={switchToRegister}
        >
          Regístrate
        </Text>
      </Text>
    </Box>
  )
}
