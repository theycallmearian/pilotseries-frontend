import { useState, useEffect, useRef } from 'react'
import {
  Box,
  Input,
  Button,
  Flex,
  Text,
  Image,
  Stack,
  useToast,
  useDisclosure
} from '@chakra-ui/react'
import { getAllSeries, deleteSerie } from '../../services/seriesService'
import ConfirmDialog from '../Common/ConfirmDialog'

export default function SeriesAdminList({ onEdit, onSeriesChange }) {
  const [series, setSeries] = useState([])
  const [search, setSearch] = useState('')
  const [serieToDelete, setSerieToDelete] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()
  const toast = useToast()

  useEffect(() => {
    getAllSeries().then(setSeries)
  }, [onSeriesChange])

  const handleEdit = (serie) => {
    onEdit(serie)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = (serie) => {
    setSerieToDelete(serie)
    onOpen()
  }

  const confirmDelete = async () => {
    try {
      await deleteSerie(serieToDelete._id)
      setSeries(series.filter((s) => s._id !== serieToDelete._id))
      toast({ title: 'Serie eliminada', status: 'success' })
      onSeriesChange && onSeriesChange()
    } catch (e) {
      toast({
        title: e.message || 'Error al eliminar la serie',
        status: 'error'
      })
    }
    onClose()
  }

  const filtered = series.filter(
    (s) =>
      (s.serie?.toLowerCase() || '').includes(search.toLowerCase()) ||
      (s.descripcion?.toLowerCase() || '').includes(search.toLowerCase()) ||
      (s.plataforma?.toLowerCase() || '').includes(search.toLowerCase()) ||
      (s.tipo?.toLowerCase() || '').includes(search.toLowerCase())
  )

  return (
    <Box>
      <Input
        placeholder='Buscar serie, plataforma, género...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        mb={4}
        maxW='400px'
        bg='#261f3b'
        color='white'
        borderRadius='lg'
      />
      <Stack spacing={3}>
        {filtered.length === 0 ? (
          <Text color='gray.400'>No hay series.</Text>
        ) : (
          filtered.map((s) => (
            <Flex
              key={s._id}
              align='center'
              bg='#211a32'
              p={3}
              borderRadius='md'
              justify='space-between'
              gap={3}
              direction={{ base: 'column', md: 'row' }}
              flexWrap='wrap'
            >
              <Flex align='center' gap={3}>
                <Image
                  src={s.urlImagen}
                  alt={s.serie}
                  boxSize='56px'
                  objectFit='cover'
                  borderRadius='md'
                  fallbackSrc='https://via.placeholder.com/56x56?text=Serie'
                />
                <Box>
                  <Text color='brand.200' fontWeight='bold' fontSize='lg'>
                    {s.serie}
                  </Text>
                  <Text color='gray.400' fontSize='sm'>
                    {s.plataforma} • {s.tipo}
                  </Text>
                  <Text
                    color='gray.500'
                    fontSize='xs'
                    noOfLines={1}
                    maxW='210px'
                  >
                    {s.descripcion}
                  </Text>
                </Box>
              </Flex>
              <Flex gap={2}>
                <Button
                  colorScheme='purple'
                  size='sm'
                  onClick={() => handleEdit(s)}
                >
                  Editar
                </Button>
                <Button
                  colorScheme='red'
                  bg='red.500'
                  _hover={{ bg: 'red.700' }}
                  color='white'
                  size='sm'
                  onClick={() => handleDelete(s)}
                >
                  Eliminar
                </Button>
              </Flex>
            </Flex>
          ))
        )}
      </Stack>
      <ConfirmDialog
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={confirmDelete}
        cancelRef={cancelRef}
        message={
          serieToDelete
            ? `¿Seguro que quieres eliminar la serie "${serieToDelete.serie}"? Esta acción es irreversible.`
            : ''
        }
      />
    </Box>
  )
}
