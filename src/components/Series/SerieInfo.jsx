import { Box, Heading, Flex, Text } from '@chakra-ui/react'
import { PLATFORM_LOGOS } from '../Plataforms/platformLogos'
import { GENRE_EMOJIS } from '../../utils/genreEmojis'

export default function SerieInfo({ serie }) {
  const logo = PLATFORM_LOGOS[serie.plataforma]
  const genre = serie.tipo
  const genreEmoji = GENRE_EMOJIS[genre] || '🎬'

  return (
    <Box w='100%'>
      <Heading
        color='brand.200'
        fontWeight='bold'
        fontSize={['2xl', '3xl', '4xl']}
        mt={[0, 6]}
        mb={2}
        fontFamily="'Michroma', 'Orbitron', sans-serif"
        textAlign={['center', null, 'left']}
      >
        {serie.titulo || serie.serie}
      </Heading>
      <Flex
        align='center'
        gap={4}
        mb={3}
        justify={['center', null, 'flex-start']}
      >
        {logo && (
          <img
            src={logo}
            alt={serie.plataforma}
            style={{ width: 28, height: 28, borderRadius: '50%' }}
          />
        )}
        <Text color='gray.100' fontWeight='bold'>
          {serie.plataforma}
        </Text>
        <Text
          color='white'
          fontWeight='bold'
          display='flex'
          alignItems='center'
          bg='#2e2e49'
          px={3}
          py={1}
          borderRadius='xl'
          ml={2}
          fontSize='sm'
        >
          {genreEmoji} {genre}
        </Text>
      </Flex>
      <Text color='white' fontWeight='bold' mt={2}>
        Seguidores:{' '}
        <span style={{ color: '#b1fa2a' }}>
          {serie.seguidores?.length || 0}
        </span>
      </Text>
      <Text color='white' fontWeight='bold' mb={3}>
        Rating promedio: {serie.ratingPromedio?.toFixed(1) || '?'}/10
      </Text>
      <Text color='gray.200' mb={4} maxW='640px'>
        {serie.descripcion}
      </Text>
    </Box>
  )
}
