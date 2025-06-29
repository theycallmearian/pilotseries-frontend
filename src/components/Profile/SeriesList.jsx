import { useState, useEffect, useCallback, useMemo } from 'react'
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  SimpleGrid,
  Spinner,
  Text,
  Icon,
  chakra
} from '@chakra-ui/react'
import { FaStar, FaBookmark, FaCheckCircle } from 'react-icons/fa'
import SerieCard from '../Series/SerieCard'
import { useAuth } from '../../context/AuthContext'
import PlataformFilter from '../Plataforms/PlataformFilter'
import SeriesSearchBar from '../Common/SeriesSearchBar'
import { PLATFORM_LOGOS } from '../Plataforms/platformLogos'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001'

const ENDPOINTS = {
  favoritas: `${BACKEND_URL}/api/usuarios/me/favorita`,
  seguidas: `${BACKEND_URL}/api/usuarios/me/seguimiento`,
  finalizadas: `${BACKEND_URL}/api/usuarios/me/finalizada`
}

const TAB_CONFIG = [
  {
    label: 'Favoritas',
    icon: FaStar,
    key: 'favorites',
    endpoint: ENDPOINTS.favoritas
  },
  {
    label: 'Seguidas',
    icon: FaBookmark,
    key: 'following',
    endpoint: ENDPOINTS.seguidas
  },
  {
    label: 'Finalizadas',
    icon: FaCheckCircle,
    key: 'completed',
    endpoint: ENDPOINTS.finalizadas
  }
]

export default function SeriesList() {
  const { usuario } = useAuth()
  const [lists, setLists] = useState({
    favorites: [],
    following: [],
    completed: []
  })
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState('')
  const [selectedPlatforms, setSelectedPlatforms] = useState([])
  const [tabIndex, setTabIndex] = useState(0)

  const fetchAll = useCallback(async () => {
    setLoading(true)
    try {
      const [fav, fol, fin] = await Promise.all(
        [ENDPOINTS.favoritas, ENDPOINTS.seguidas, ENDPOINTS.finalizadas].map(
          (url) =>
            fetch(url, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            }).then((res) => res.json())
        )
      )
      setLists({ favorites: fav, following: fol, completed: fin })
    } catch {
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAll()
  }, [usuario, fetchAll])

  const currentKey = TAB_CONFIG[tabIndex].key
  const currentList = lists[currentKey] || []

  const allPlatforms = useMemo(
    () =>
      Array.from(new Set(currentList.map((s) => s.plataforma).filter(Boolean))),
    [currentList]
  )

  const filteredList = useMemo(
    () =>
      currentList.filter(
        (serie) =>
          (selectedPlatforms.length === 0 ||
            selectedPlatforms.includes(serie.plataforma)) &&
          (serie.titulo || serie.serie || '')
            .toLowerCase()
            .includes(search.toLowerCase())
      ),
    [currentList, selectedPlatforms, search]
  )

  if (loading)
    return (
      <Box textAlign='center' py={10}>
        <Spinner size='xl' />
      </Box>
    )

  return (
    <Box>
      <Box width='100%' maxW='100%' pt={[2, 6]} mb={2}>
        <SeriesSearchBar value={search} onChange={setSearch} />
      </Box>
      <PlataformFilter
        platforms={allPlatforms}
        selectedPlatforms={selectedPlatforms}
        setSelectedPlatforms={setSelectedPlatforms}
        platformLogos={PLATFORM_LOGOS}
      />

      <Tabs
        colorScheme='green'
        variant='soft-rounded'
        isFitted
        index={tabIndex}
        onChange={setTabIndex}
      >
        <TabList mb={3}>
          {TAB_CONFIG.map((tab) => (
            <Tab key={tab.key} fontWeight='bold' fontSize='lg'>
              <Icon as={tab.icon} mr={2} color='#805AD5' fontSize='xl' />
              <chakra.span display={{ base: 'none', md: 'inline' }}>
                {tab.label}
              </chakra.span>
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          {TAB_CONFIG.map((tab, i) => (
            <TabPanel key={tab.key} px={0}>
              {tabIndex === i ? (
                filteredList.length ? (
                  <SimpleGrid columns={[1, 2, 3]} spacing={6}>
                    {filteredList.map((serie) => (
                      <SerieCard
                        key={serie._id}
                        serie={serie}
                        platformLogo={PLATFORM_LOGOS[serie.plataforma]}
                        onUpdate={fetchAll}
                        onClick={() =>
                          (window.location.href = `/serie/${serie._id}`)
                        }
                      />
                    ))}
                  </SimpleGrid>
                ) : (
                  <Text
                    color='gray.400'
                    textAlign='center'
                    fontSize='lg'
                    my={8}
                  >
                    No tienes series aquí todavía.
                  </Text>
                )
              ) : null}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Box>
  )
}
