import { useEffect, useState, useCallback } from 'react'
import {
  Box,
  Heading,
  Text,
  Icon,
  chakra,
  SimpleGrid,
  Spinner
} from '@chakra-ui/react'
import SerieCard from '../Series/SerieCard'
import { useAuth } from '../../context/AuthContext'
import { FaMagic } from 'react-icons/fa'
import { PLATFORM_LOGOS } from '../Plataforms/platformLogos'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

function getRandomSample(arr, n = 3) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a.slice(0, n)
}

export default function Recommendations({ onUpdate }) {
  const { usuario } = useAuth()
  const userId = usuario?.id || usuario?._id
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(true)
  const [summary, setSummary] = useState('')

  const favIds = (usuario?.favoritosSeries || []).map((s) => s._id)
  const followIds = (usuario?.seguimientoSeries || []).map((s) => s._id)
  const finishedIds = (usuario?.seriesFinalizadas || []).map((s) => s._id)
  const userSeriesIds = new Set(
    [...favIds, ...followIds, ...finishedIds].map(String)
  )

  const fetchUserSeguidos = useCallback(async () => {
    if (!userId) return { plataformas: [], generos: [] }
    try {
      const res = await fetch(`${BACKEND_URL}/api/usuarios/me`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      const user = await res.json()
      const series = user.seguimientoSeries || []
      const plataformas = [
        ...new Set(series.map((s) => s.plataforma).filter(Boolean))
      ]
      const generos = [...new Set(series.map((s) => s.tipo).filter(Boolean))]
      return { plataformas, generos }
    } catch {
      return { plataformas: [], generos: [] }
    }
  }, [userId])

  const fetchRecommendations = useCallback(async () => {
    if (!userId) return
    setLoading(true)
    try {
      const res = await fetch(
        `${BACKEND_URL}/api/usuarios/${userId}/recommendations`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      )
      const data = await res.json()
      let recs = []
      if (Array.isArray(data)) recs = data
      else if (Array.isArray(data.recommendations)) recs = data.recommendations
      setRecommendations(recs)
    } catch (e) {
      setRecommendations([])
    } finally {
      setLoading(false)
    }
  }, [userId])

  useEffect(() => {
    fetchRecommendations()
  }, [
    fetchRecommendations,
    usuario?.favoritosSeries,
    usuario?.seguimientoSeries,
    usuario?.seriesFinalizadas
  ])

  useEffect(() => {
    fetchUserSeguidos().then(({ plataformas, generos }) => {
      if (!plataformas.length && !generos.length) {
        setSummary('Basado en tus intereses.')
      } else {
        const textPlat = plataformas.length
          ? `plataforma${plataformas.length > 1 ? 's' : ''} ${plataformas.join(
              ', '
            )}`
          : ''
        const textGen = generos.length
          ? `género${generos.length > 1 ? 's' : ''} ${generos.join(', ')}`
          : ''
        setSummary(
          `Personalizadas para ti${textPlat || textGen ? ': ' : ''}${[
            textPlat,
            textGen
          ]
            .filter(Boolean)
            .join(' y ')}`
        )
      }
    })
  }, [fetchUserSeguidos, userId])

  const filteredRecs = recommendations.filter(
    (serie) => !userSeriesIds.has(String(serie._id))
  )
  const displayedRecs = getRandomSample(filteredRecs, 3)

  const handleUpdate = () => {
    fetchRecommendations()
    if (onUpdate) onUpdate()
  }

  return (
    <Box px={[2, 10]} mt={5}>
      <Heading
        color='brand.200'
        size='lg'
        mb={3}
        textAlign='center'
        display='flex'
        alignItems='center'
        justifyContent='center'
        gap={3}
      >
        <Icon
          as={FaMagic}
          color='yellow.300'
          fontSize={['2xl', '2xl', '3xl']}
        />
        Descubre series que te pueden gustar
      </Heading>
      <chakra.span
        color='gray.300'
        fontSize={['md', 'lg']}
        textAlign='center'
        display='block'
        mb={8}
      >
        {summary}
      </chakra.span>
      {loading ? (
        <Box textAlign='center' py={10}>
          <Spinner size='xl' />
        </Box>
      ) : displayedRecs.length === 0 ? (
        <Text color='gray.400' textAlign='center' fontSize='lg' my={8}>
          No hay recomendaciones por ahora.
        </Text>
      ) : (
        <SimpleGrid columns={[1, 1, 3]} spacing={8}>
          {displayedRecs.map((serie) => (
            <SerieCard
              key={serie._id}
              serie={serie}
              platformLogo={PLATFORM_LOGOS[serie.plataforma]}
              onUpdate={handleUpdate}
              onClick={() => (window.location.href = `/serie/${serie._id}`)}
            />
          ))}
        </SimpleGrid>
      )}
    </Box>
  )
}
