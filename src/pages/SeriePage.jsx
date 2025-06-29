import { useEffect, useState, useRef } from 'react'
import { Box, Flex, Spinner, useToast, Text } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import {
  getSerieById,
  getSerieReviews,
  addReview,
  updateReview,
  deleteReview
} from '../services/seriesService'
import { useAuth } from '../context/AuthContext'
import SerieInfo from '../components/Series/SerieInfo'
import SerieActions from '../components/Series/SerieActions'
import SerieReviewForm from '../components/Series/SerieReviewForm'
import SerieReviewsList from '../components/Series/SerieReviewsList'
import ReviewEditModal from '../components/Profile/ReviewEditModal'
import ReviewDeleteDialog from '../components/Profile/ReviewDeleteDialog'

export default function SeriePage() {
  const { id: serieId } = useParams()
  const { usuario } = useAuth()
  const userId = usuario?._id || usuario?.id
  const [serie, setSerie] = useState(null)
  const [reviews, setReviews] = useState([])
  const [showAll, setShowAll] = useState(false)
  const [comentario, setComentario] = useState('')
  const [rating, setRating] = useState(5)
  const [sending, setSending] = useState(false)
  const [loading, setLoading] = useState(true)
  const [editModal, setEditModal] = useState(false)
  const [editReviewObj, setEditReviewObj] = useState(null)
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [reviewToDelete, setReviewToDelete] = useState(null)
  const cancelRef = useRef()
  const toast = useToast()

  const fetchSerieAndReviews = async () => {
    const s = await getSerieById(serieId)
    setSerie(s)
    const r = await getSerieReviews(serieId)
    setReviews(r)
  }

  useEffect(() => {
    if (!serieId) return
    setLoading(true)
    fetchSerieAndReviews().finally(() => setLoading(false))
  }, [serieId])

  const userReview = userId
    ? reviews.find((r) => r.usuario && String(r.usuario._id) === String(userId))
    : null

  const handleAddReview = async (e) => {
    e.preventDefault()
    if (!comentario.trim()) return
    setSending(true)
    try {
      await addReview(serieId, { comentario, rating })
      toast({ title: 'Review añadida', status: 'success' })
      setComentario('')
      setRating(5)
      await fetchSerieAndReviews()
    } catch (e) {
      toast({ title: e.message, status: 'error' })
    }
    setSending(false)
  }

  const onEdit = (review) => {
    setEditReviewObj(review)
    setEditModal(true)
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    if (!editReviewObj) return
    try {
      await updateReview(editReviewObj._id, {
        comentario: editReviewObj.comentario,
        rating: editReviewObj.rating
      })
      toast({ title: 'Review actualizada', status: 'success' })
      setEditModal(false)
      await fetchSerieAndReviews()
    } catch (e) {
      toast({ title: e.message, status: 'error' })
    }
  }

  const onDelete = (review) => {
    setReviewToDelete(review)
    setDeleteDialog(true)
  }

  const handleDelete = async () => {
    try {
      await deleteReview(reviewToDelete._id)
      toast({ title: 'Review eliminada', status: 'success' })
      setDeleteDialog(false)
      setReviewToDelete(null)
      await fetchSerieAndReviews()
    } catch (e) {
      toast({ title: e.message, status: 'error' })
    }
  }

  if (loading || !serie)
    return (
      <Flex align='center' justify='center' h='70vh'>
        <Spinner size='xl' />
      </Flex>
    )

  return (
    <Flex
      direction={['column', null, 'row']}
      gap={[6, 8]}
      p={[2, 6]}
      maxW='1100px'
      mx='auto'
      bg='#171729'
      borderRadius='2xl'
      boxShadow='2xl'
      align={['center', null, 'flex-start']}
    >
      <Box
        w={['100%', null, '260px']}
        maxW={['100%', null, '260px']}
        mb={[6, null, 0]}
        mr={[0, 0, 4]}
        display='flex'
        flexDirection='column'
        alignItems='center'
      >
        <img
          src={serie.urlImagen || serie.imagen}
          alt={serie.titulo || serie.serie}
          style={{
            width: '100%',
            borderRadius: '24px',
            objectFit: 'cover',
            maxHeight: '370px',
            marginBottom: '0.5rem'
          }}
        />
        <SerieActions
          serieId={serieId}
          usuario={usuario}
          onUpdate={fetchSerieAndReviews}
        />
      </Box>

      <Box
        flex='1'
        w='100%'
        ml={[0, 0, 0]}
        textAlign={['center', null, 'left']}
        display='flex'
        flexDirection='column'
        alignItems={['center', null, 'center']}
      >
        <Box
          w={['100%', null, '90%']}
          maxW='800px'
          textAlign={['center', null, 'left']}
        >
          <SerieInfo serie={serie} />
        </Box>

        <Box w={['100%', null, '90%']} maxW='800px'>
          {!userReview && usuario && (
            <SerieReviewForm
              comentario={comentario}
              setComentario={setComentario}
              rating={rating}
              setRating={setRating}
              sending={sending}
              handleAddReview={handleAddReview}
            />
          )}
          {userReview && (
            <Text color='green.300' mt={2} fontWeight='bold'>
              ¡Ya has reseñado esta serie! Puedes editar o eliminar tu review
              abajo.
            </Text>
          )}

          <SerieReviewsList
            reviews={reviews}
            usuario={usuario}
            userId={userId}
            onEdit={onEdit}
            onDelete={onDelete}
            reviewsLength={reviews.length}
            showAll={showAll}
            setShowAll={setShowAll}
            onLikeSuccess={fetchSerieAndReviews}
          />
        </Box>
      </Box>

      <ReviewEditModal
        isOpen={editModal}
        onClose={() => setEditModal(false)}
        review={editReviewObj}
        editComment={editReviewObj?.comentario}
        setEditComment={(c) =>
          setEditReviewObj((r) => ({ ...r, comentario: c }))
        }
        editRating={editReviewObj?.rating}
        setEditRating={(n) => setEditReviewObj((r) => ({ ...r, rating: n }))}
        onSubmit={handleEditSubmit}
      />
      <ReviewDeleteDialog
        isOpen={deleteDialog}
        onClose={() => setDeleteDialog(false)}
        onDelete={handleDelete}
        cancelRef={cancelRef}
      />
    </Flex>
  )
}
