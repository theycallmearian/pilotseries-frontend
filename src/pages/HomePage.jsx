import React, { useState, useEffect } from 'react'
import { Box, Flex, Button, useBreakpointValue } from '@chakra-ui/react'
import PlataformFilter from '../components/Plataforms/PlataformFilter'
import TipoFilter from '../components/Tipo/TipoFilter'
import SerieCarousel from '../components/Series/SerieCarousel'
import SeriesTabs from '../components/Series/SeriesTabs'
import SeriesSearchBar from '../components/Common/SeriesSearchBar'
import '../components/Common/SeriesSearchBar.scss'
import { getAllSeries } from '../services/seriesService'
import { getAllReviews } from '../services/reviewService'
import { PLATFORM_LOGOS } from '../components/Plataforms/platformLogos'

export default function HomePage() {
  const [series, setSeries] = useState([])
  const [search, setSearch] = useState('')
  const [selectedPlatforms, setSelectedPlatforms] = useState([])
  const [selectedTipos, setSelectedTipos] = useState([])
  const [loading, setLoading] = useState(true)
  const [reviews, setReviews] = useState([])
  const [reviewsLoading, setReviewsLoading] = useState(true)
  const [showCount, setShowCount] = useState(20)
  const columns = useBreakpointValue({ base: 1, sm: 2, md: 3, xl: 4 })
  const isMobile = useBreakpointValue({ base: true, md: false })

  useEffect(() => {
    setLoading(true)
    getAllSeries()
      .then((data) =>
        setSeries(
          data.map((s) => ({
            _id: s._id,
            titulo: s.serie,
            imagen: s.urlImagen,
            descripcion: s.descripcion,
            plataforma: s.plataforma,
            rating: s.ratingPromedio ?? s.rating,
            tipo: s.tipo
          }))
        )
      )
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    setReviewsLoading(true)
    getAllReviews()
      .then((data) => setReviews(data))
      .finally(() => setReviewsLoading(false))
  }, [])

  useEffect(() => {
    setShowCount(20)
  }, [search, selectedPlatforms, selectedTipos])

  const platforms = Array.from(new Set(series.map((s) => s.plataforma))).filter(
    Boolean
  )
  const tipos = Array.from(new Set(series.flatMap((s) => s.tipo))).filter(
    Boolean
  )

  const anyFilter = selectedPlatforms.length > 0 || selectedTipos.length > 0

  const handleClearAll = () => {
    setSelectedPlatforms([])
    setSelectedTipos([])
  }

  const filteredSeries = series.filter(
    (serie) =>
      typeof serie.titulo === 'string' &&
      (selectedPlatforms.length === 0 ||
        selectedPlatforms.includes(serie.plataforma)) &&
      (selectedTipos.length === 0 ||
        (Array.isArray(serie.tipo)
          ? serie.tipo.some((t) => selectedTipos.includes(t))
          : selectedTipos.includes(serie.tipo))) &&
      serie.titulo.toLowerCase().includes(search.toLowerCase())
  )

  const topSeries = [...series]
    .filter((s) => typeof s.rating === 'number')
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 10)

  const highlightedReviews = [...reviews]
    .filter((r) => typeof r.rating === 'number')
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 10)

  return (
    <Box minH='100vh' bg='#181622'>
      <SerieCarousel
        topSeries={topSeries}
        loading={loading}
        platformLogos={PLATFORM_LOGOS}
      />

      <Box py={6} display='flex' justifyContent='center'>
        <SeriesSearchBar value={search} onChange={setSearch} />
      </Box>

      <Flex
        py={2}
        justify='center'
        align='flex-start'
        gap={isMobile ? 2 : 12}
        direction={isMobile ? 'column' : 'row'}
        position='relative'
        width='100%'
      >
        <PlataformFilter
          platforms={platforms}
          selectedPlatforms={selectedPlatforms}
          setSelectedPlatforms={setSelectedPlatforms}
          platformLogos={PLATFORM_LOGOS}
        />

        <TipoFilter
          tiposList={tipos}
          selectedTipos={selectedTipos}
          setSelectedTipos={setSelectedTipos}
        />
      </Flex>

      {anyFilter && (
        <Box
          display='flex'
          justifyContent='center'
          mt={isMobile ? 2 : 4}
          mb={isMobile ? 7 : 14}
        >
          <Button
            size='md'
            fontWeight='bold'
            borderRadius='lg'
            leftIcon={
              <span role='img' aria-label='broom'>
                🧹
              </span>
            }
            bg='#00ffae'
            color='#181622'
            border='none'
            boxShadow='0 0 14px 2px #00ffae99'
            _hover={{
              bg: '#8224e3',
              color: 'white',
              boxShadow: '0 0 18px 6px #8224e3'
            }}
            _focus={{
              outline: 'none',
              bg: '#8224e3',
              color: 'white',
              boxShadow: '0 0 18px 7px #8224e3'
            }}
            width={isMobile ? '90%' : '340px'}
            maxWidth='100%'
            onClick={handleClearAll}
          >
            Limpiar filtros
          </Button>
        </Box>
      )}

      <SeriesTabs
        columns={columns}
        filteredSeries={filteredSeries}
        topSeries={topSeries}
        reviewsLoading={reviewsLoading}
        highlightedReviews={highlightedReviews}
        platformLogos={PLATFORM_LOGOS}
        showCount={showCount}
        setShowCount={setShowCount}
      />
    </Box>
  )
}
