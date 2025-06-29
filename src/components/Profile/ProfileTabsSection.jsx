import React, { useState } from 'react'
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Button
} from '@chakra-ui/react'
import SeriesList from './SeriesList'
import PlataformFilter from '../Plataforms/PlataformFilter'
import ProfileReviewsList from './ProfileReviewsList'
import { PLATFORM_LOGOS } from '../Plataforms/platformLogos'
import { useBreakpointValue } from '@chakra-ui/react'

const TAB_ICONS = {
  series: '📺',
  reviews: '🌠'
}

function TabLabel({ type, children }) {
  const isMobile = useBreakpointValue({ base: true, md: false })
  return (
    <span
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        justifyContent: 'center',
        width: '100%'
      }}
    >
      <span style={{ fontSize: 22 }}>{TAB_ICONS[type]}</span>
      {!isMobile && <span>{children}</span>}
    </span>
  )
}

export default function ProfileTabsSection({ usuario, refreshKey }) {
  const [selectedPlatforms, setSelectedPlatforms] = useState([])
  const isMobile = useBreakpointValue({ base: true, md: false })

  const userId = usuario?._id || usuario?.id

  const favoritas = usuario.favoritosSeries || []
  const seguimiento = usuario.seguimientoSeries || []
  const finalizadas = usuario.seriesFinalizadas || []
  const misSeries = [...favoritas, ...seguimiento, ...finalizadas].filter(
    (serie, idx, arr) =>
      arr.findIndex((s) => String(s._id) === String(serie._id)) === idx
  )

  const platforms = Array.from(
    new Set(misSeries.map((s) => s.plataforma).filter(Boolean))
  )

  const filteredSeries = misSeries.filter(
    (serie) =>
      selectedPlatforms.length === 0 ||
      selectedPlatforms.includes(serie.plataforma)
  )

  const anyFilter = selectedPlatforms.length > 0
  const handleClearAll = () => {
    setSelectedPlatforms([])
  }

  return (
    <Tabs
      colorScheme='purple'
      variant='soft-rounded'
      mt={4}
      width='100%'
      isFitted
      defaultIndex={0}
    >
      <TabList>
        <Tab fontWeight='bold' fontSize='lg'>
          <TabLabel type='series'>Mis series</TabLabel>
        </Tab>
        <Tab fontWeight='bold' fontSize='lg'>
          <TabLabel type='reviews'>Mis reseñas</TabLabel>
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Flex
            gap={6}
            mb={anyFilter ? 2 : 6}
            direction='row'
            justify='center'
            align='flex-start'
          >
            <PlataformFilter
              platforms={platforms}
              selectedPlatforms={selectedPlatforms}
              setSelectedPlatforms={setSelectedPlatforms}
              platformLogos={PLATFORM_LOGOS}
            />
          </Flex>

          {anyFilter && (
            <Box display='flex' justifyContent='center' mt={4} mb={10}>
              <Button
                size='md'
                fontWeight='bold'
                borderRadius='lg'
                onClick={handleClearAll}
              >
                Limpiar filtros
              </Button>
            </Box>
          )}

          <SeriesList key={refreshKey} series={filteredSeries} />
        </TabPanel>
        <TabPanel>
          {userId ? (
            <ProfileReviewsList userId={userId} refreshKey={refreshKey} />
          ) : (
            <Box color='gray.400' mt={6} textAlign='center'>
              Cargando tus reseñas...
            </Box>
          )}
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
