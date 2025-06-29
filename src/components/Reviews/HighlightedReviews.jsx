import { Box, Flex, Spinner, Text } from '@chakra-ui/react'
import HeartLikeButton from './HeartLikeButton'

export default function HighlightedReviews({ reviews = [], loading }) {
  if (loading) {
    return (
      <Flex align='center' justify='center' minH={200}>
        <Spinner color='brand.200' size='xl' />
      </Flex>
    )
  }
  if (!reviews.length) {
    return (
      <Text color='gray.400' fontSize='lg' textAlign='center' mt={10}>
        No hay reviews destacadas todavía.
      </Text>
    )
  }
  return (
    <>
      {reviews.map((review, i) => (
        <Box
          key={review._id || i}
          mb={4}
          p={5}
          bg='#232041'
          borderRadius='xl'
          boxShadow='lg'
        >
          <Flex align='center' gap={4}>
            <img
              src={review.usuario?.imagen || '/default-user.png'}
              alt={review.usuario?.nombre || 'Usuario'}
              style={{
                width: 46,
                height: 46,
                borderRadius: '50%',
                border: '2px solid #00ffae',
                objectFit: 'cover',
                background: '#232041'
              }}
            />
            <Box flex='1'>
              <Text fontWeight='bold' color='brand.200' fontSize='lg'>
                {review.usuario?.nombre || 'Usuario'}
              </Text>
              <Text color='gray.400' fontSize='sm'>
                {review.serie?.serie || review.serie?.titulo || 'Serie'}
              </Text>
            </Box>
            <Text fontSize='2xl' fontWeight='bold' color='yellow.300' ml={2}>
              ⭐ {review.rating}
            </Text>
          </Flex>
          <Text color='white' mt={3} fontSize='md'>
            {review.comentario}
          </Text>
          <Flex align='center' mt={2} gap={1}>
            <HeartLikeButton
              reviewId={review._id}
              initialLikes={review.likes || 0}
            />
          </Flex>
        </Box>
      ))}
    </>
  )
}
