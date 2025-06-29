import React, { useState } from 'react'
import {
  Flex,
  Image,
  Spacer,
  Avatar,
  Text,
  useBreakpointValue,
  IconButton,
  Button,
  Tooltip
} from '@chakra-ui/react'
import { FaHome, FaUserCircle, FaSignOutAlt, FaTools } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const logoUrl =
  'https://res.cloudinary.com/dye4qdrys/image/upload/v1750485116/pilotseries/logo_favicon/logo_text.png'

export default function Header() {
  const { usuario, logout } = useAuth()
  const isMobile = useBreakpointValue({ base: true, md: false })
  const navigate = useNavigate()

  const [avatarHover, setAvatarHover] = useState(false)

  return (
    <Flex
      as='header'
      align='center'
      py={3}
      px={[2, 4, 10]}
      bg='rgba(20,18,40,0.97)'
      borderBottom='2px solid #3f1979'
      zIndex={99}
      position='relative'
      minH={isMobile ? '54px' : '78px'}
    >
      <Image
        src={logoUrl}
        alt='PilotSeries Logo'
        maxH={isMobile ? '32px' : '70px'}
        filter='brightness(0) invert(1)'
        cursor='pointer'
        onClick={() => navigate('/app')}
      />

      <Flex gap={2} ml={5} align='center'>
        <Tooltip label='Inicio' hasArrow>
          <IconButton
            icon={<FaHome />}
            aria-label='Home'
            variant='ghost'
            color='white'
            fontSize='2xl'
            onClick={() => navigate('/app')}
            _hover={{ bg: '#8224e3', color: 'white' }}
          />
        </Tooltip>
        <Tooltip label='Perfil' hasArrow>
          <IconButton
            icon={<FaUserCircle />}
            aria-label='Perfil'
            variant='ghost'
            color='white'
            fontSize='2xl'
            onClick={() => navigate('/perfil')}
            _hover={{ bg: '#8224e3', color: 'white' }}
          />
        </Tooltip>

        {usuario?.rol === 'admin' && (
          <Tooltip label='Panel de admin' hasArrow>
            <IconButton
              icon={<FaTools />}
              aria-label='Admin'
              variant='solid'
              colorScheme='purple'
              fontSize='2xl'
              onClick={() => navigate('/admin')}
              ml={2}
              _hover={{
                bg: '#fff',
                color: '#8224e3',
                borderColor: '#8224e3'
              }}
            />
          </Tooltip>
        )}
      </Flex>

      <Spacer />

      {usuario && (
        <Flex align='center' gap={2}>
          <Avatar
            src={usuario.imagen}
            name={usuario.nombre}
            size={isMobile ? 'sm' : 'md'}
            border={`2px solid ${avatarHover ? '#8224e3' : '#fff'}`}
            transition='border-color 0.25s, box-shadow 0.25s'
            boxShadow={avatarHover ? '0 0 8px #8224e3' : 'md'}
            bg='brand.700'
            cursor='pointer'
            onClick={() => navigate('/perfil')}
            onMouseEnter={() => setAvatarHover(true)}
            onMouseLeave={() => setAvatarHover(false)}
          />
          {isMobile ? (
            <Text
              color='brand.200'
              fontFamily="'Michroma',sans-serif"
              fontWeight='bold'
              fontSize='md'
              noOfLines={1}
              maxW='90px'
            >
              {usuario.nombre}
            </Text>
          ) : (
            <Flex direction='column' ml={2} align='flex-start'>
              <Text
                color='brand.200'
                fontFamily="'Michroma',sans-serif"
                fontWeight='bold'
                fontSize='xl'
              >
                ¡Hola, {usuario.nombre}!
              </Text>
              <Text color='gray.400' fontWeight='medium' fontSize='sm'>
                ¿Listo para descubrir tu próxima serie favorita?
              </Text>
            </Flex>
          )}

          {isMobile ? (
            <IconButton
              icon={<FaSignOutAlt />}
              aria-label='Cerrar sesión'
              variant='outline'
              borderRadius='full'
              border='2px solid #d90429'
              color='#d90429'
              bg='transparent'
              fontSize='xl'
              onClick={logout}
              _hover={{
                bg: '#d90429',
                color: '#fff',
                borderColor: '#d90429'
              }}
              ml={2}
              minW={8}
              minH={8}
              size='sm'
            />
          ) : (
            <Button
              leftIcon={<FaSignOutAlt />}
              bg='transparent'
              color='#d90429'
              border='2px solid #d90429'
              _hover={{ bg: '#d90429', color: '#fff', borderColor: '#d90429' }}
              variant='outline'
              borderRadius='full'
              onClick={logout}
              fontWeight='bold'
              size='lg'
              px={5}
              ml={4}
            >
              Cerrar sesión
            </Button>
          )}
        </Flex>
      )}
    </Flex>
  )
}
