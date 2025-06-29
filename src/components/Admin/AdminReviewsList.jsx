import { useState, useEffect, useRef } from 'react'
import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  Collapse,
  Input,
  useToast,
  useDisclosure
} from '@chakra-ui/react'
import { getAllReviews, deleteReview } from '../../services/reviewService'
import ConfirmDialog from '../Common/ConfirmDialog'

export default function AdminReviewsList({ onReviewsChange }) {
  const [reviews, setReviews] = useState([])
  const [open, setOpen] = useState({})
  const [search, setSearch] = useState('')
  const [reviewToDelete, setReviewToDelete] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()
  const toast = useToast()

  useEffect(() => {
    getAllReviews().then(setReviews)
  }, [onReviewsChange])

  const handleDelete = (review) => {
    setReviewToDelete(review)
    onOpen()
  }

  const confirmDelete = async () => {
    try {
      await deleteReview(reviewToDelete._id)
      setReviews((rs) => rs.filter((r) => r._id !== reviewToDelete._id))
      toast({ title: 'Review eliminada', status: 'success' })
      setReviewToDelete(null)
      onReviewsChange && onReviewsChange()
    } catch {
      toast({ title: 'Error al eliminar la review', status: 'error' })
    }
    onClose()
  }

  const handleToggle = (id) => {
    setOpen((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const filtered = reviews.filter(
    (r) =>
      (r.usuario?.nombre?.toLowerCase() || '').includes(search.toLowerCase()) ||
      (r.serie?.serie?.toLowerCase() || '').includes(search.toLowerCase())
  )

  return (
    <Box w='100%'>
      <Input
        placeholder='Buscar por usuario o serie...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        mb={4}
        maxW='400px'
        bg='#261f3b'
        color='white'
        borderRadius='lg'
      />
      <Stack spacing={3}>
        {filtered.length === 0 ? (
          <Text color='gray.400'>No hay reviews.</Text>
        ) : (
          filtered.map((r) => (
            <Box key={r._id} bg='#211a32' p={3} borderRadius='md' w='100%'>
              <Flex
                direction='row'
                align='center'
                justify='space-between'
                wrap='wrap'
                gap={2}
              >
                <Box>
                  <Text color='brand.200' fontWeight='bold'>
                    {r.usuario?.nombre || '??'}{' '}
                    <span style={{ color: '#14ff89' }}>
                      [{r.serie?.serie || 'Sin serie'}]
                    </span>
                  </Text>
                </Box>
                <Flex direction='row' gap={2} align='center'>
                  <Button
                    colorScheme='blue'
                    variant='outline'
                    size='sm'
                    onClick={() => handleToggle(r._id)}
                  >
                    {open[r._id] ? 'Ocultar comentario' : 'Ver comentario'}
                  </Button>
                  <Button
                    colorScheme='red'
                    bg='red.500'
                    _hover={{ bg: 'red.700' }}
                    color='white'
                    size='sm'
                    onClick={() => handleDelete(r)}
                  >
                    Eliminar
                  </Button>
                </Flex>
              </Flex>
              <Collapse in={open[r._id]} animateOpacity>
                <Box
                  mt={2}
                  color='gray.200'
                  fontSize='sm'
                  bg='#19142a'
                  p={2}
                  borderRadius='md'
                >
                  {r.comentario}
                </Box>
              </Collapse>
            </Box>
          ))
        )}
      </Stack>
      <ConfirmDialog
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={confirmDelete}
        cancelRef={cancelRef}
        message={
          reviewToDelete
            ? `¿Seguro que quieres eliminar la reseña de "${
                reviewToDelete.usuario?.nombre || '??'
              }" sobre "[${
                reviewToDelete.serie?.serie || 'Sin serie'
              }]"? Esta acción es irreversible.`
            : ''
        }
      />
    </Box>
  )
}
