import { Box, Text, Button, Textarea } from '@chakra-ui/react'
import StarRating from '../Common/StarRating'

export default function SerieReviewForm({
  comentario,
  setComentario,
  rating,
  setRating,
  sending,
  handleAddReview
}) {
  return (
    <Box
      as='form'
      onSubmit={handleAddReview}
      bg='#221f3b'
      borderRadius='xl'
      p={4}
      mb={6}
      maxW='480px'
      mx='auto'
    >
      <Text fontWeight='bold' mb={2}>
        Tu puntuación:
      </Text>
      <StarRating value={rating} onChange={setRating} max={10} />
      <Textarea
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
        placeholder='Escribe tu reseña...'
        minH='70px'
        w='100%'
        resize='vertical'
        bg='#232344'
        color='white'
        mt={3}
      />
      <Button
        type='submit'
        colorScheme='purple'
        mt={3}
        w='100%'
        isLoading={sending}
        fontWeight='bold'
        fontSize='lg'
      >
        Añadir reseña
      </Button>
    </Box>
  )
}
