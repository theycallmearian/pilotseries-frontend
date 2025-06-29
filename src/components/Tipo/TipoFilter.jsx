import {
  Flex,
  IconButton,
  Tooltip,
  Box,
  Text,
  useBreakpointValue
} from '@chakra-ui/react'
import { GENRE_EMOJIS } from '../../utils/genreEmojis'

export default function TipoFilter({
  tiposList = [],
  selectedTipos = [],
  setSelectedTipos
}) {
  if (!tiposList.length) return null

  const isMobile = useBreakpointValue({ base: true, md: false })

  const toggleTipo = (tipo) => {
    setSelectedTipos((prev) =>
      prev.includes(tipo) ? prev.filter((t) => t !== tipo) : [...prev, tipo]
    )
  }

  return (
    <Box px={[2, 10]} mb={isMobile ? 2 : 6} width='100%'>
      <Text color='white' fontWeight='bold' mb={2} textAlign='center'>
        Filtrar por tipo:
      </Text>
      <Flex
        wrap={isMobile ? 'wrap' : 'nowrap'}
        gap={3}
        align='center'
        justify='center'
        py={1}
        width='100%'
        sx={{
          '::-webkit-scrollbar': { height: 0 }
        }}
        style={{ overflow: 'visible' }}
      >
        {tiposList.map((tipo) => {
          const selected = selectedTipos.includes(tipo)
          return (
            <Tooltip label={tipo} key={tipo}>
              <IconButton
                icon={
                  <span
                    style={{
                      fontSize: 28,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 42,
                      height: 42
                    }}
                  >
                    {GENRE_EMOJIS[tipo] || '🏷️'}
                  </span>
                }
                variant='ghost'
                aria-label={tipo}
                onClick={() => toggleTipo(tipo)}
                bg='#232041'
                _hover={{
                  borderColor: '#8224e3',
                  boxShadow: '0 0 12px 2px #8224e366',
                  bg: 'transparent'
                }}
                _focus={{
                  borderColor: '#8224e3',
                  boxShadow: '0 0 12px 2px #8224e3cc',
                  bg: 'transparent'
                }}
                _active={{
                  borderColor: '#8224e3',
                  boxShadow: '0 0 12px 2px #8224e399',
                  bg: 'transparent'
                }}
                borderRadius='50%'
                border={
                  selected ? '3px solid #8224e3' : '3px solid transparent'
                }
                p={0}
                minW={0}
                h='48px'
                w='48px'
                boxShadow={selected ? '0 0 12px 2px #8224e388' : 'none'}
                color={selected ? '#fff' : '#bbb'}
                transition='all 0.15s'
                style={{
                  background: selected ? '#8224e3' : '#232041',
                  color: selected ? '#fff' : '#bbb',
                  outline: 'none'
                }}
              />
            </Tooltip>
          )
        })}
      </Flex>
    </Box>
  )
}
