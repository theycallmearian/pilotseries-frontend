import { Box, Text, Flex, Heading, useBreakpointValue } from '@chakra-ui/react'
import SerieActions from './SerieActions'
import { useUser } from '../../context/UserContext'
import { PLATFORM_LOGOS } from '../Plataforms/platformLogos'
import { GENRE_EMOJIS } from '../../utils/genreEmojis'

export default function SerieCard({ serie, platformLogo, onClick, onUpdate }) {
  const { user, loadingUser } = useUser()

  if (loadingUser) return null

  const logo =
    platformLogo ||
    PLATFORM_LOGOS[serie.plataforma] ||
    PLATFORM_LOGOS[serie.plataform]

  const imageHeight = useBreakpointValue({
    base: '220px',
    sm: '300px',
    md: '420px',
    lg: '500px'
  })
  const isMobile = useBreakpointValue({ base: true, md: false })

  return (
    <Box
      bg='#22203a'
      borderRadius='2xl'
      boxShadow='lg'
      overflow='hidden'
      _hover={{
        boxShadow: '0 6px 36px #6f37fa99',
        transform: 'scale(1.03)',
        zIndex: 2
      }}
      transition='all 0.18s'
      cursor='pointer'
      position='relative'
      minH={330}
      onClick={onClick}
    >
      <Box position='relative'>
        <img
          src={serie.imagen || serie.urlImagen}
          alt={serie.titulo || serie.serie}
          style={{
            width: '100%',
            height: imageHeight,
            objectFit: 'cover'
          }}
        />
        {isMobile && (
          <Flex
            position='absolute'
            bottom={0}
            left={0}
            width='100%'
            justify='center'
            bg='rgba(32,32,32,0.6)'
            zIndex={4}
            py={1.5}
          >
            <SerieActions serieId={serie._id} compact onUpdate={onUpdate} />
          </Flex>
        )}
      </Box>

      <Box p={4} pt={isMobile ? 2 : 4}>
        <Heading
          color='brand.200'
          fontWeight='bold'
          fontSize='xl'
          mb={3}
          noOfLines={1}
        >
          {serie.titulo || serie.serie}
        </Heading>
        <Flex align='center' gap={3} mb={2}>
          {logo && (
            <img
              src={logo}
              alt={serie.plataforma}
              style={{ width: 28, height: 28, borderRadius: '50%' }}
            />
          )}
          <Text color='gray.300' fontSize='sm' fontWeight='bold'>
            {serie.plataforma}
          </Text>
          {serie.tipo && (
            <Text
              color='white'
              fontSize='sm'
              fontWeight='bold'
              display='flex'
              alignItems='center'
              ml={2}
              bg='#312e4d'
              px={2}
              py='2px'
              borderRadius='lg'
            >
              {GENRE_EMOJIS[serie.tipo] || '🎬'}{' '}
              <span style={{ marginLeft: 6 }}>{serie.tipo}</span>
            </Text>
          )}
        </Flex>
        <Flex align='center' gap={2} justify='space-between'>
          <Text color='yellow.300' fontWeight='bold' fontSize='lg'>
            ⭐{' '}
            {typeof serie.rating === 'number'
              ? serie.rating.toFixed(1)
              : typeof serie.ratingPromedio === 'number'
              ? serie.ratingPromedio.toFixed(1)
              : '?'}
          </Text>
          {!isMobile && (
            <SerieActions serieId={serie._id} onUpdate={onUpdate} />
          )}
        </Flex>
      </Box>
    </Box>
  )
}
