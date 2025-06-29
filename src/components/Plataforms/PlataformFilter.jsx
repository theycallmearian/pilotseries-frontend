import {
  Flex,
  IconButton,
  Tooltip,
  Box,
  Text,
  useBreakpointValue
} from '@chakra-ui/react'

export default function PlataformFilter({
  platforms = [],
  selectedPlatforms = [],
  setSelectedPlatforms,
  platformLogos = {}
}) {
  if (!platforms.length) return null

  const isMobile = useBreakpointValue({ base: true, md: false })

  const togglePlatform = (name) => {
    setSelectedPlatforms((prev) =>
      prev.includes(name) ? prev.filter((p) => p !== name) : [...prev, name]
    )
  }

  return (
    <Box px={[2, 10]} mb={isMobile ? 2 : 6} width='100%'>
      <Text color='white' fontWeight='bold' mb={2} textAlign='center'>
        Filtrar por plataforma:
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
        {platforms.map((name) => {
          const selected = selectedPlatforms.includes(name)
          return (
            <Tooltip label={name} key={name}>
              <IconButton
                icon={
                  <img
                    src={platformLogos[name]}
                    alt={name}
                    style={{
                      width: 54,
                      height: 54,
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: selected
                        ? '3px solid #00ffae'
                        : '3px solid transparent',
                      boxShadow: selected ? '0 0 12px 2px #00ffae88' : 'none',
                      background: '#232041',
                      transition: 'all 0.15s',
                      outline: 'none'
                    }}
                  />
                }
                variant='ghost'
                aria-label={name}
                onClick={() => togglePlatform(name)}
                bg='#232041'
                _hover={{
                  borderColor: '#00ffae',
                  boxShadow: '0 0 12px 2px #00ffae55',
                  bg: 'transparent'
                }}
                _focus={{
                  borderColor: '#00ffae',
                  boxShadow: '0 0 12px 2px #00ffae99',
                  bg: 'transparent'
                }}
                _active={{
                  borderColor: '#00ffae',
                  boxShadow: '0 0 12px 2px #00ffae66',
                  bg: 'transparent'
                }}
                borderRadius='50%'
                border={
                  selected ? '3px solid #00ffae' : '3px solid transparent'
                }
                p={0}
                minW={0}
                h='56px'
                w='56px'
              />
            </Tooltip>
          )
        })}
      </Flex>
    </Box>
  )
}
