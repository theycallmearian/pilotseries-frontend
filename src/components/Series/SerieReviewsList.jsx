import { Box, Heading, Text, Flex, Button } from '@chakra-ui/react'
import HeartLikeButton from '../Reviews/HeartLikeButton'

export default function SerieReviewsList({
  reviews,
  usuario,
  userId,
  onEdit,
  onDelete,
  showAll,
  setShowAll,
  onLikeSuccess = () => {}
}) {
  const reviewsConUsuario = reviews.filter((r) => r.usuario)
  const REVIEWS_TO_SHOW = 3
  const reviewsToShow = showAll
    ? reviewsConUsuario
    : reviewsConUsuario.slice(0, REVIEWS_TO_SHOW)

  return (
    <Box mt={8}>
      <Heading as='h3' color='brand.200' fontSize='xl' mb={4}>
        Reseñas
      </Heading>
      {reviewsConUsuario.length === 0 && (
        <Text color='gray.400'>Aún no hay reseñas. ¡Sé el primero!</Text>
      )}
      {reviewsToShow.map((review) => (
        <Box
          key={review._id}
          mb={5}
          bg='#232041'
          p={4}
          borderRadius='xl'
          boxShadow='md'
        >
          <Flex align='center' gap={4}>
            <img
              src={review.usuario.imagen}
              alt={review.usuario.nombre}
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                border: '2px solid #00ffae'
              }}
            />
            <Box flex='1'>
              <Text fontWeight='bold' color='brand.200' fontSize='lg'>
                {review.usuario.nombre}
              </Text>
              <Text color='gray.400' fontSize='sm'>
                {review.fecha
                  ? new Date(review.fecha).toLocaleDateString()
                  : ''}
              </Text>
            </Box>
            <Text fontSize='2xl' fontWeight='bold' color='yellow.300'>
              ⭐ {review.rating}
            </Text>
          </Flex>
          <Text color='white' mt={3} fontSize='md'>
            {review.comentario}
          </Text>
          <Flex align='center' mt={2} gap={2}>
            <HeartLikeButton
              reviewId={review._id}
              initialLikes={review.likes || []}
              onLikeSuccess={onLikeSuccess}
            />
            {usuario && review.usuario && (
              <Flex gap={2} ml='auto'>
                {String(review.usuario._id) === String(userId) && (
                  <Button
                    bg='#8224e3'
                    color='#fff'
                    _hover={{ bg: '#6313a3' }}
                    size='sm'
                    onClick={() => onEdit(review)}
                    fontWeight='bold'
                  >
                    Editar
                  </Button>
                )}
                {(String(review.usuario._id) === String(userId) ||
                  usuario?.rol === 'admin') && (
                  <Button
                    bg='#d90429'
                    color='#fff'
                    _hover={{ bg: '#a0031c' }}
                    size='sm'
                    onClick={() => onDelete(review)}
                    fontWeight='bold'
                  >
                    Eliminar
                  </Button>
                )}
              </Flex>
            )}
          </Flex>
        </Box>
      ))}
      {reviewsConUsuario.length > REVIEWS_TO_SHOW && (
        <Flex justify='center' mb={3}>
          <Button
            onClick={() => setShowAll((prev) => !prev)}
            bg='#8224e3'
            color='#fff'
            _hover={{ bg: '#6313a3' }}
            fontWeight='bold'
            mt={2}
            size='md'
          >
            {showAll ? 'Ver menos' : 'Ver más'}
          </Button>
        </Flex>
      )}
    </Box>
  )
}
