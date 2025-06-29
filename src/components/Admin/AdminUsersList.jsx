import { useEffect, useState, useRef } from 'react'
import {
  Box,
  Input,
  Button,
  Flex,
  Text,
  useToast,
  useDisclosure,
  Stack
} from '@chakra-ui/react'
import {
  getAllUsers,
  deleteUser,
  banUser,
  unbanUser
} from '../../services/userService'
import ConfirmDialog from '../Common/ConfirmDialog'

export default function AdminUsersList({ onUsersChange }) {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')
  const [userToDelete, setUserToDelete] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const cancelRef = useRef()

  useEffect(() => {
    getAllUsers().then(setUsers)
  }, [onUsersChange])

  const handleDelete = (user) => {
    setUserToDelete(user)
    onOpen()
  }

  const confirmDelete = async () => {
    try {
      await deleteUser(userToDelete._id)
      setUsers(users.filter((u) => u._id !== userToDelete._id))
      toast({ title: 'Usuario eliminado', status: 'success' })
      setUserToDelete(null)
      onUsersChange()
    } catch (e) {
      toast({
        title: e.message || 'Error al eliminar usuario',
        status: 'error'
      })
    }
    onClose()
  }

  const handleBanToggle = async (user) => {
    try {
      if (user.baneado) {
        await unbanUser(user._id)
        toast({ title: 'Usuario desbaneado', status: 'success' })
      } else {
        await banUser(user._id)
        toast({ title: 'Usuario baneado', status: 'warning' })
      }
      const updated = await getAllUsers()
      setUsers(updated)
      onUsersChange && onUsersChange()
    } catch (e) {
      toast({
        title: e.message || 'Error al banear/desbanear',
        status: 'error'
      })
    }
  }

  const filtered = users.filter(
    (u) =>
      u.nombre?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Box w='100%'>
      <Input
        placeholder='Buscar usuarios por nombre/email...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        mb={4}
        maxW='400px'
        bg='#261f3b'
        color='white'
        borderRadius='lg'
      />
      {filtered.length === 0 ? (
        <Text color='gray.400'>No hay usuarios.</Text>
      ) : (
        <Stack spacing={3}>
          {filtered.map((u) => (
            <Flex
              key={u._id}
              align={{ base: 'stretch', md: 'center' }}
              justify='space-between'
              bg='#211a32'
              p={3}
              borderRadius='md'
              direction={{ base: 'column', md: 'row' }}
              gap={2}
              wrap='wrap'
            >
              <Box flex='1'>
                <Text
                  color='brand.200'
                  fontWeight='bold'
                  fontSize={{ base: 'md', md: 'lg' }}
                >
                  {u.nombre}
                  {u.baneado && (
                    <Text as='span' color='red.300' ml={2} fontSize='sm'>
                      (Baneado)
                    </Text>
                  )}
                </Text>
                <Text color='gray.400' fontSize={{ base: 'sm', md: 'sm' }}>
                  {u.email}
                </Text>
              </Box>
              <Flex
                direction='row'
                gap={2}
                w={{ base: '100%', md: 'auto' }}
                align='center'
                mt={{ base: 2, md: 0 }}
              >
                <Button
                  colorScheme={u.baneado ? 'green' : 'orange'}
                  variant='solid'
                  size='sm'
                  onClick={() => handleBanToggle(u)}
                >
                  {u.baneado ? 'Desbanear' : 'Banear'}
                </Button>
                <Button
                  colorScheme='red'
                  bg='red.500'
                  _hover={{ bg: 'red.700' }}
                  color='white'
                  variant='solid'
                  size='sm'
                  onClick={() => handleDelete(u)}
                >
                  Eliminar
                </Button>
              </Flex>
            </Flex>
          ))}
        </Stack>
      )}
      <ConfirmDialog
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={confirmDelete}
        cancelRef={cancelRef}
        message={`¿Seguro que quieres eliminar a ${
          userToDelete?.nombre || ''
        }? Esta acción es irreversible.`}
      />
    </Box>
  )
}
