import React, { useState } from 'react'
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Text,
  Avatar,
  Flex,
  VStack
} from '@chakra-ui/react'
import { useAlert } from '../../context/AlertContext'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { FaCamera } from 'react-icons/fa'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001'

export default function RegisterForm({ switchToLogin }) {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [foto, setFoto] = useState(null)
  const [preview, setPreview] = useState(null)
  const { showError, showSuccess } = useAlert()
  const [submitting, setSubmitting] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    symbol: /[!@#$%^&*(),.?":{}|<>]/.test(password)
  }

  const allValid = Object.values(checks).every(Boolean)

  const requirements = [
    { check: checks.length, label: '8+' },
    { check: checks.uppercase && checks.lowercase, label: 'Aa' },
    { check: checks.number, label: '123' },
    { check: checks.symbol, label: '!@#' }
  ]

  const handleFotoChange = (e) => {
    const file = e.target.files[0]
    setFoto(file)
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setPreview(reader.result)
      reader.readAsDataURL(file)
    } else {
      setPreview(null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!nombre) {
      showError('El nombre es obligatorio')
      return
    }
    if (password !== confirm) {
      showError('Las contraseñas no coinciden')
      return
    }
    if (!allValid) {
      showError('La contraseña no cumple los requisitos de seguridad')
      return
    }
    setSubmitting(true)
    try {
      const formData = new FormData()
      formData.append('nombre', nombre)
      formData.append('email', email)
      formData.append('password', password)
      if (foto) formData.append('imagen', foto)

      const res = await fetch(`${BACKEND_URL}/api/auth/register`, {
        method: 'POST',
        body: formData
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || 'Error en registro')
      }
      const data = await res.json()
      login(data.token, data.user)
      showSuccess('Registro exitoso, bienvenido/a 👋')
      navigate('/app')
    } catch (e) {
      if (e.message.toLowerCase().includes('failed to fetch')) {
        showError('No se pudo conectar con el servidor. Inténtalo más tarde.')
      } else {
        showError(e.message)
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Box
      as='form'
      onSubmit={handleSubmit}
      bg='rgba(0,0,0,0.88)'
      p={[4, 6]}
      borderRadius='lg'
      width='100%'
      maxW='410px'
      textAlign='center'
      boxShadow='2xl'
    >
      <Heading
        size='lg'
        mb={4}
        color='white'
        fontFamily="'Michroma', sans-serif"
      >
        Crear cuenta
      </Heading>

      <Flex justify='center' align='center' mb={4} position='relative'>
        <Box position='relative' display='inline-block'>
          <Avatar size='xl' src={preview || undefined} />
          <label htmlFor='foto-upload'>
            <Box
              position='absolute'
              bottom='8px'
              right='8px'
              bg='rgba(0,0,0,0.7)'
              borderRadius='full'
              p={2}
              zIndex={2}
              cursor='pointer'
              _hover={{ bg: 'brand.500' }}
              transition='background 0.2s'
              display='flex'
              alignItems='center'
              justifyContent='center'
            >
              <FaCamera color='#fff' size={18} />
              <Input
                id='foto-upload'
                type='file'
                accept='image/*'
                display='none'
                onChange={handleFotoChange}
              />
            </Box>
          </label>
        </Box>
      </Flex>

      <FormControl mb={3} isRequired>
        <FormLabel color='white'>Nombre</FormLabel>
        <Input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          color='brand.200'
          _placeholder={{ color: 'green.300', opacity: 1 }}
        />
      </FormControl>

      <FormControl mb={3} isRequired>
        <FormLabel color='white'>Email</FormLabel>
        <Input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          color='brand.200'
          _placeholder={{ color: 'green.300', opacity: 1 }}
        />
      </FormControl>

      <FormControl mb={3} isRequired>
        <FormLabel color='white'>Contraseña</FormLabel>
        <Input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          color='brand.200'
          _placeholder={{ color: 'green.300', opacity: 1 }}
        />
        <VStack align='start' mt={1} spacing={0}>
          <Text fontSize='xs' color='gray.300' mb={1}>
            Requisitos:&nbsp;
            {requirements.map((req, i) => (
              <Text
                as='span'
                key={i}
                fontWeight='bold'
                color={req.check ? 'green.300' : 'red.400'}
                fontSize='lg'
                mr={2}
              >
                {req.check ? '🟢' : '🔴'}{req.label}
              </Text>
            ))}
          </Text>
        </VStack>
      </FormControl>

      <FormControl mb={4} isRequired>
        <FormLabel color='white'>Repite la contraseña</FormLabel>
        <Input
          type='password'
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
          color='brand.200'
          _placeholder={{ color: 'green.300', opacity: 1 }}
        />
      </FormControl>
      <Button
        type='submit'
        bg='brand.500'
        color='white'
        _hover={{ bg: 'brand.200', color: 'black' }}
        width='100%'
        mb={2}
        isLoading={submitting}
        isDisabled={!nombre || !email || !password || !confirm || !allValid}
        fontWeight='bold'
      >
        Registrarse
      </Button>
      <Text color='gray.300' fontSize='sm'>
        ¿Ya tienes cuenta?{' '}
        <Text
          as='span'
          color='brand.200'
          fontWeight='bold'
          cursor='pointer'
          onClick={switchToLogin}
        >
          Inicia sesión
        </Text>
      </Text>
    </Box>
  )
}
