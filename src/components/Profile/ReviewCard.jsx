import { Box, Flex, Text, Button } from '@chakra-ui/react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import HeartLikeButton from '../Reviews/HeartLikeButton'

export default function ReviewCard({ review, usuario, onEdit, onDelete }) {
  const reviewUser = review.usuario

  if (!reviewUser) return null

  return (
    <Box mb={6} p={4} bg='#232041' borderRadius='xl' boxShadow='md'>
      <Flex align='center' gap={4}>
        <img
          src={reviewUser.imagen || ''}
          alt={reviewUser.nombre || 'Usuario'}
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            border: '2px solid #00ffae'
          }}
        />
        <Box flex='1'>
          <Text fontWeight='bold' color='brand.200' fontSize='lg'>
            {reviewUser.nombre}
          </Text>
          <Text color='gray.400' fontSize='sm'>
            {review.serie?.serie || review.serie?.titulo || 'Serie'}
          </Text>
          <Text color='gray.400' fontSize='sm'>
            {review.fecha ? new Date(review.fecha).toLocaleDateString() : ''}
          </Text>
        </Box>
        <Text fontSize='2xl' fontWeight='bold' color='yellow.300'>
          ⭐ {review.rating}
        </Text>
      </Flex>
      <Text color='white' mt={3} fontSize='md'>
        {review.comentario}
      </Text>
      <Flex align='center' mt={2}>
        <HeartLikeButton
          reviewId={review._id}
          initialLikes={review.likes || []}
        />
        <Flex gap={2} ml='auto'>
          <Button
            bg='#8224e3'
            color='#fff'
            _hover={{ bg: '#6313a3' }}
            size='sm'
            onClick={() => onEdit(review)}
            leftIcon={<FaEdit />}
            fontWeight='bold'
          >
            Editar
          </Button>
          <Button
            bg='#d90429'
            color='#fff'
            _hover={{ bg: '#a0031c' }}
            size='sm'
            onClick={() => onDelete(review._id)}
            leftIcon={<FaTrash />}
            fontWeight='bold'
          >
            Eliminar
          </Button>
        </Flex>
      </Flex>
    </Box>
  )
}
