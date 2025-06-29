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
  VStack,
  useToast
} from '@chakra-ui/react'
import { FaCamera } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001'

export default function ProfileEditForm({ user, onSuccess, onCancel }) {
  const { login } = useAuth()
  const [nombre, setNombre] = useState(user?.nombre || '')
  const [email, setEmail] = useState(user?.email || '')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [foto, setFoto] = useState(null)
  const [preview, setPreview] = useState(user?.imagen || '')
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const toast = useToast()

  const checks = {
    length: password.length === 0 || password.length >= 8,
    uppercase: password.length === 0 || /[A-Z]/.test(password),
    number: password.length === 0 || /[0-9]/.test(password),
    symbol: password.length === 0 || /[!@#$%^&*(),.?":{}|<>]/.test(password)
  }
  const allValid = Object.values(checks).every(Boolean)

  const requirements = [
    { check: checks.length, label: '8+', emoji: '🔒' },
    { check: checks.uppercase, label: 'M', emoji: '🔠' },
    { check: checks.number, label: '#', emoji: '🔢' },
    { check: checks.symbol, label: '@', emoji: '✨' }
  ]

  const handleFotoChange = (e) => {
    const file = e.target.files[0]
    setFoto(file)
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setPreview(reader.result)
      reader.readAsDataURL(file)
    } else {
      setPreview(user?.imagen || '')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})

    if (!nombre.trim()) {
      setErrors({ nombre: 'El nombre es obligatorio' })
      return
    }
    if (password && password !== repeatPassword) {
      setErrors({ repeatPassword: 'Las contraseñas no coinciden' })
      return
    }
    if (password && !allValid) {
      setErrors({ password: 'La contraseña no cumple los requisitos' })
      return
    }

    setSubmitting(true)
    try {
      const formData = new FormData()
      formData.append('nombre', nombre)
      formData.append('email', email)
      if (password) formData.append('password', password)
      if (foto) formData.append('imagen', foto)

      const res = await fetch(`${BACKEND_URL}/api/usuarios/me`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        body: formData
      })
      if (!res.ok) throw new Error('Error al actualizar perfil')
      const data = await res.json()
      login(localStorage.getItem('token'), data.user || data)
      toast({ title: 'Perfil actualizado', status: 'success' })
      onSuccess?.()
    } catch (err) {
      toast({
        title: err.message || 'Error al actualizar perfil',
        status: 'error'
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Box
      as='form'
      onSubmit={handleSubmit}
      bg='rgba(24,22,34,0.96)'
      p={[4, 6]}
      borderRadius='xl'
      width='100%'
      maxW='420px'
      textAlign='center'
      boxShadow='2xl'
      mx='auto'
    >
      <Heading
        size='lg'
        mb={4}
        color='brand.200'
        fontFamily="'Michroma', sans-serif"
        textAlign='center'
      >
        Editar perfil
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
      <Text fontSize='sm' color='gray.300' mb={3}>
        Sube aquí tu nuevo avatar para sustituir el actual
      </Text>

      <FormControl mb={3} isRequired isInvalid={!!errors.nombre}>
        <FormLabel color='white'>Nombre</FormLabel>
        <Input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          color='brand.200'
          _placeholder={{ color: 'green.300', opacity: 1 }}
        />
        {errors.nombre && (
          <Text color='red.300' fontSize='sm'>
            {errors.nombre}
          </Text>
        )}
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

      <FormControl mb={3} isInvalid={!!errors.password}>
        <FormLabel color='white'>Nueva contraseña</FormLabel>
        <Input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
                {req.emoji}
                {req.label}
              </Text>
            ))}
          </Text>
        </VStack>
        {errors.password && (
          <Text color='red.300' fontSize='sm'>
            {errors.password}
          </Text>
        )}
      </FormControl>

      <FormControl mb={4} isInvalid={!!errors.repeatPassword}>
        <FormLabel color='white'>Repite la contraseña</FormLabel>
        <Input
          type='password'
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          color='brand.200'
          _placeholder={{ color: 'green.300', opacity: 1 }}
        />
        {errors.repeatPassword && (
          <Text color='red.300' fontSize='sm'>
            {errors.repeatPassword}
          </Text>
        )}
      </FormControl>

      <Flex mt={2} gap={2} justify='center'>
        <Button
          type='submit'
          bg='brand.500'
          color='white'
          _hover={{ bg: 'brand.200', color: 'black' }}
          width='100%'
          isLoading={submitting}
          fontWeight='bold'
        >
          Guardar cambios
        </Button>
        <Button
          background='white'
          color='red'
          fontWeight='bold'
          onClick={onCancel}
          width='100%'
        >
          Cancelar
        </Button>
      </Flex>
    </Box>
  )
}
