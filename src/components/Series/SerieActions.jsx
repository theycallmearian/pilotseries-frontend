import { Flex, IconButton, Tooltip } from '@chakra-ui/react'
import { FaStar, FaRegStar, FaBookmark, FaCheckCircle } from 'react-icons/fa'
import { useAlert } from '../../context/AlertContext'
import { useUser } from '../../context/UserContext'

export default function SerieActions({ serieId, compact = false, onUpdate }) {
  const {
    usuario,
    cargandoUsuario,
    alternarFavorita,
    alternarSeguida,
    alternarFinalizada
  } = useUser()
  const { showSuccess, showError } = useAlert()

  if (cargandoUsuario) return null
  if (!usuario) return null

  const isFavorita = usuario.favoritosSeries?.some(
    (serie) => String(serie._id) === String(serieId)
  )
  const isSeguimiento = usuario.seguimientoSeries?.some(
    (serie) => String(serie._id) === String(serieId)
  )
  const isFinalizada = usuario.seriesFinalizadas?.some(
    (serie) => String(serie._id) === String(serieId)
  )

  const handleAction = (fn, tipo, estado) => async (e) => {
    e.stopPropagation()
    if (!usuario) {
      showError('Debes iniciar sesión para usar esta función.')
      return
    }
    try {
      await fn(serieId)
      showSuccess(
        estado
          ? `Quitado de ${tipo}`
          : `¡Añadido a ${tipo.charAt(0).toUpperCase() + tipo.slice(1)}!`
      )
      if (onUpdate) onUpdate()
    } catch (err) {
      showError(`Error al actualizar ${tipo}: ${err.message}`)
    }
  }

  return (
    <Flex gap={compact ? 1 : 2} justify='center' mt={compact ? 0 : 2}>
      <Tooltip label='Favoritos' hasArrow>
        <IconButton
          icon={isFavorita ? <FaStar color='gold' /> : <FaRegStar />}
          onClick={handleAction(alternarFavorita, 'favoritos', isFavorita)}
          aria-label='Favorito'
          size={compact ? 'sm' : 'md'}
          _active={{ transform: 'scale(1.2)' }}
        />
      </Tooltip>
      <Tooltip label='Seguimiento' hasArrow>
        <IconButton
          icon={
            <FaBookmark
              style={{
                color: isSeguimiento ? '#a259fc' : '#8888'
              }}
            />
          }
          onClick={handleAction(alternarSeguida, 'seguimiento', isSeguimiento)}
          aria-label='Seguimiento'
          size={compact ? 'sm' : 'md'}
          _active={{ transform: 'scale(1.2)' }}
        />
      </Tooltip>
      <Tooltip label='Finalizada' hasArrow>
        <IconButton
          icon={
            isFinalizada ? <FaCheckCircle color='#28e768' /> : <FaCheckCircle />
          }
          onClick={handleAction(alternarFinalizada, 'finalizada', isFinalizada)}
          aria-label='Finalizada'
          size={compact ? 'sm' : 'md'}
          _active={{ transform: 'scale(1.2)' }}
        />
      </Tooltip>
    </Flex>
  )
}
