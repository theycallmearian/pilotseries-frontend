import { useState, useEffect } from 'react'
import {
  Box,
  Input,
  Button,
  Flex,
  Select,
  Textarea,
  useToast,
  Heading,
  Stack
} from '@chakra-ui/react'
import { createSerie, updateSerie } from '../../services/seriesService'

const PLATFORMS = [
  'Netflix',
  'HBO Max',
  'Amazon Prime Video',
  'Disney+',
  'Apple TV+',
  'Paramount+',
  'Starzplay',
  'Movistar+'
]
const GENEROS = [
  'Drama',
  'Comedia',
  'Acción',
  'Crimen',
  'Thriller',
  'Fantasía',
  'Aventura',
  'Documental',
  'Sci-Fi',
  'Romance'
]

const initial = {
  serie: '',
  descripcion: '',
  plataforma: '',
  tipo: '',
  urlImagen: ''
}

export default function SeriesAdminForm({ serie, onSuccess }) {
  const [form, setForm] = useState(initial)
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  useEffect(() => {
    if (serie)
      setForm({
        serie: serie.serie || '',
        descripcion: serie.descripcion || '',
        plataforma: serie.plataforma || '',
        tipo: serie.tipo || '',
        urlImagen: serie.urlImagen || ''
      })
    else setForm(initial)
  }, [serie])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (serie && serie._id) {
        await updateSerie(serie._id, form)
        toast({ title: 'Serie actualizada', status: 'success' })
      } else {
        await createSerie(form)
        toast({ title: 'Serie creada', status: 'success' })
      }
      setForm(initial)
      onSuccess && onSuccess()
    } catch (err) {
      toast({ title: err.message || 'Error', status: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      bg='#1a1627'
      p={8}
      borderRadius='2xl'
      boxShadow='lg'
      maxW='500px'
      mx='auto'
      mb={6}
      mt={2}
    >
      <Heading color='brand.200' fontSize='2xl' textAlign='center' mb={4}>
        {serie ? 'Editar serie' : 'Crear nueva serie'}
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <Input
            name='serie'
            placeholder='Título de la serie'
            value={form.serie}
            onChange={handleChange}
            required
            bg='#322e4d'
            color='white'
            borderRadius='lg'
            _placeholder={{ color: '#a3a3c2' }}
            fontWeight='bold'
            fontSize='lg'
          />
          <Textarea
            name='descripcion'
            placeholder='Descripción'
            value={form.descripcion}
            onChange={handleChange}
            bg='#322e4d'
            color='white'
            borderRadius='lg'
            minH='70px'
            _placeholder={{ color: '#a3a3c2' }}
          />
          <Flex gap={4} flexWrap='wrap'>
            <Select
              name='plataforma'
              value={form.plataforma}
              onChange={handleChange}
              placeholder='Plataforma'
              bg='#322e4d'
              color='white'
              borderRadius='lg'
              maxW='220px'
              _placeholder={{ color: '#a3a3c2' }}
            >
              {PLATFORMS.map((p) => (
                <option value={p} key={p}>
                  {p}
                </option>
              ))}
            </Select>
            <Select
              name='tipo'
              value={form.tipo}
              onChange={handleChange}
              placeholder='Género'
              bg='#322e4d'
              color='white'
              borderRadius='lg'
              maxW='220px'
              _placeholder={{ color: '#a3a3c2' }}
            >
              {GENEROS.map((g) => (
                <option value={g} key={g}>
                  {g}
                </option>
              ))}
            </Select>
          </Flex>
          <Input
            name='urlImagen'
            placeholder='URL de la imagen'
            value={form.urlImagen}
            onChange={handleChange}
            bg='#322e4d'
            color='white'
            borderRadius='lg'
            _placeholder={{ color: '#a3a3c2' }}
          />
          <Button
            type='submit'
            isLoading={loading}
            colorScheme='purple'
            borderRadius='lg'
            fontWeight='bold'
            size='lg'
          >
            {serie ? 'Actualizar' : 'Crear serie'}
          </Button>
        </Stack>
      </form>
    </Box>
  )
}
