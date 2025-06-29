import {
  Flex,
  Avatar,
  Box,
  Heading,
  Text,
  Stack,
  Button
} from '@chakra-ui/react'
import { FaTrash, FaUserEdit } from 'react-icons/fa'

export default function UseHeader({
  user,
  isMobile,
  editing,
  onEdit,
  onDelete
}) {
  if (!user) return null

  return (
    <Flex
      align='center'
      gap={6}
      py={6}
      px={[2, 4, 10]}
      bg='#191933'
      borderRadius='2xl'
      boxShadow='lg'
      mb={8}
      width='100%'
      flexDirection={isMobile ? 'column' : 'row'}
      justify={isMobile ? 'center' : 'space-between'}
    >
      <Flex
        align='center'
        gap={6}
        w={isMobile ? '100%' : 'auto'}
        justify={isMobile ? 'center' : 'flex-start'}
      >
        <Avatar size={isMobile ? 'xl' : '2xl'} src={user.imagen || ''} />
        <Box textAlign={isMobile ? 'center' : 'left'}>
          <Heading
            size='lg'
            color='brand.200'
            fontFamily="'Michroma',sans-serif"
          >
            {user.nombre}
          </Heading>
          <Text color='gray.400' mb={2}>
            {user.email}
          </Text>
        </Box>
      </Flex>
      {!editing && (
        <Stack
          direction={isMobile ? 'column' : 'row'}
          spacing={3}
          mt={isMobile ? 4 : 0}
          justify='center'
          align='center'
          w={isMobile ? '100%' : 'auto'}
        >
          <Button
            leftIcon={<FaUserEdit />}
            bg='#8224e3'
            color='#fff'
            _hover={{ bg: '#6313a3' }}
            onClick={onEdit}
            variant='solid'
            borderRadius='full'
            fontWeight='bold'
            size={isMobile ? 'md' : 'lg'}
            px={isMobile ? 4 : 6}
            minW={isMobile ? '90vw' : '120px'}
            maxW={isMobile ? '95vw' : '100%'}
            w={isMobile ? '100%' : 'auto'}
            aria-label='Editar perfil'
            display='flex'
            justifyContent='center'
            mb={isMobile ? 2 : 0}
          >
            Editar perfil
          </Button>
          <Button
            leftIcon={<FaTrash />}
            bg='transparent'
            color='#d90429'
            border='2px solid #d90429'
            _hover={{ bg: '#d90429', color: '#fff' }}
            variant='outline'
            borderRadius='full'
            onClick={onDelete}
            fontWeight='bold'
            size={isMobile ? 'md' : 'lg'}
            px={isMobile ? 4 : 6}
            minW={isMobile ? '90vw' : '140px'}
            maxW={isMobile ? '95vw' : '100%'}
            w={isMobile ? '100%' : 'auto'}
            aria-label='Eliminar perfil'
            display='flex'
            justifyContent='center'
          >
            Eliminar perfil
          </Button>
        </Stack>
      )}
    </Flex>
  )
}
