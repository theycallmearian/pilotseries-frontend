import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  SimpleGrid,
  Text,
  Flex,
  useBreakpointValue
} from '@chakra-ui/react'
import SerieCard from './SerieCard'
import HighlightedReviews from '../Reviews/HighlightedReviews'

export default function SeriesTabs({
  columns,
  filteredSeries,
  topSeries,
  reviewsLoading,
  highlightedReviews,
  platformLogos,
  showCount = 20,
  setShowCount = () => {}
}) {
  const isMobile = useBreakpointValue({ base: true, md: false })
  const tabLabels = isMobile
    ? ['🎬', '🏆', '🔥']
    : ['Todas', 'Top puntuadas', 'Reviews destacadas']

  return (
    <Box px={[0, 10]} pb={10} mt={isMobile ? 2 : 0}>
      <Tabs colorScheme='purple' variant='unstyled' mt={3} isFitted>
        <TabList
          justifyContent='center'
          display='flex'
          mb={6}
          w='100%'
          borderRadius='2xl'
          overflow='hidden'
          boxShadow='0 2px 24px #0004'
        >
          {tabLabels.map((label, i) => (
            <Tab
              key={label}
              fontWeight='bold'
              fontSize={isMobile ? '1.35rem' : '1.4rem'}
              px={0}
              py={isMobile ? 3 : 6}
              flex={1}
              bg='#5d5d5d'
              transition='all 0.22s'
              borderRadius={
                i === 0
                  ? '2xl 0 0 2xl'
                  : i === tabLabels.length - 1
                  ? '0 2xl 2xl 0'
                  : 0
              }
              _selected={{
                bg: '#8224e3',
                color: '#fff',
                boxShadow:
                  '0 0 18px 6px #8224e3cc, 0 1px 8px #01ffae33, 0 2px 10px #0003',
                zIndex: 2
              }}
              _hover={{
                boxShadow:
                  '0 0 18px 8px #8224e3, 0 2px 10px #01ffae33, 0 2px 10px #0001',
                bg: '#6337b6',
                color: '#fff'
              }}
            >
              {label}
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          <TabPanel px={0}>
            <SimpleGrid columns={columns} spacing={8}>
              {filteredSeries.length > 0 ? (
                filteredSeries
                  .slice(0, showCount)
                  .map((serie) => (
                    <SerieCard
                      key={serie._id}
                      serie={serie}
                      platformLogo={platformLogos[serie.plataforma]}
                      onClick={() =>
                        (window.location.href = `/serie/${serie._id}`)
                      }
                    />
                  ))
              ) : (
                <Text
                  color='gray.400'
                  fontSize='lg'
                  textAlign='center'
                  mt={10}
                  gridColumn='1 / -1'
                  w='100%'
                >
                  No hay series que coincidan con la búsqueda 😕
                </Text>
              )}
            </SimpleGrid>
            {filteredSeries.length > showCount && (
              <Flex justify='center' mt={8}>
                <button
                  style={{
                    padding: '12px 32px',
                    borderRadius: '16px',
                    background: '#02f987',
                    color: '#232041',
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 2px 10px #0002'
                  }}
                  onClick={() => setShowCount(showCount + 20)}
                >
                  Cargar más
                </button>
              </Flex>
            )}
          </TabPanel>
          <TabPanel px={0}>
            <SimpleGrid columns={columns} spacing={8}>
              {topSeries.length > 0 ? (
                topSeries.map((serie) => (
                  <SerieCard
                    key={serie._id}
                    serie={serie}
                    platformLogo={platformLogos[serie.plataforma]}
                    onClick={() =>
                      (window.location.href = `/serie/${serie._id}`)
                    }
                  />
                ))
              ) : (
                <Text
                  color='gray.400'
                  fontSize='lg'
                  textAlign='center'
                  mt={10}
                  gridColumn='1 / -1'
                  w='100%'
                >
                  No hay series top por ahora...
                </Text>
              )}
            </SimpleGrid>
          </TabPanel>
          <TabPanel px={0}>
            <HighlightedReviews
              reviews={highlightedReviews}
              loading={reviewsLoading}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}
