import { useEffect, useState, useRef } from 'react'
import { Box, Flex, Spinner, Text, Button, useToast } from '@chakra-ui/react'
import {
  getUserReviews,
  deleteReview,
  updateReview
} from '../../services/reviewService'
import ReviewEditModal from './ReviewEditModal'
import ReviewDeleteDialog from './ReviewDeleteDialog'

const REVIEWS_TO_SHOW = 4

export default function ProfileReviewsList({ userId, refreshKey }) {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [editModal, setEditModal] = useState(false)
  const [editReviewObj, setEditReviewObj] = useState(null)
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [reviewToDelete, setReviewToDelete] = useState(null)
  const [showAll, setShowAll] = useState(false)
  const cancelRef = useRef()
  const toast = useToast()

  useEffect(() => {
    if (!userId) return
    setLoading(true)
    getUserReviews(userId)
      .then(setReviews)
      .catch(() => setReviews([]))
      .finally(() => setLoading(false))
    setShowAll(false)
  }, [userId, refreshKey])

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
      getUserReviews(userId).then(setReviews)
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
      getUserReviews(userId).then(setReviews)
    } catch (e) {
      toast({ title: e.message, status: 'error' })
    }
  }

  if (loading)
    return (
      <Flex align='center' justify='center' minH='100px'>
        <Spinner size='lg' />
      </Flex>
    )

  if (!reviews.length)
    return (
      <Text color='gray.400' textAlign='center'>
        Aún no has escrito ninguna reseña.
      </Text>
    )

  const visibleReviews = showAll ? reviews : reviews.slice(0, REVIEWS_TO_SHOW)

  return (
    <Box>
      {visibleReviews.map((review) => (
        <Box
          key={review._id}
          mb={4}
          bg='#232041'
          p={4}
          borderRadius='xl'
          boxShadow='md'
        >
          <Flex align='center' gap={4}>
            <Box flex='1'>
              <Text fontWeight='bold' color='brand.200' fontSize='lg'>
                {review.serie?.serie || review.serie?.titulo || '[Sin serie]'}
              </Text>
              <Text color='gray.400' fontSize='sm'>
                {review.fecha
                  ? new Date(review.fecha).toLocaleDateString()
                  : ''}
              </Text>
            </Box>
            <Text fontSize='2xl' fontWeight='bold' color='yellow.300'>
              ⭐ {review.rating}
            </Text>
          </Flex>
          <Text color='white' mt={3} fontSize='md'>
            {review.comentario}
          </Text>
          <Flex align='center' mt={2} gap={2} justify='flex-end'>
            <Button
              bg='#8224e3'
              color='#fff'
              _hover={{ bg: '#6313a3' }}
              size='sm'
              onClick={() => onEdit(review)}
              fontWeight='bold'
            >
              Editar
            </Button>
            <Button
              bg='#d90429'
              color='#fff'
              _hover={{ bg: '#a0031c' }}
              size='sm'
              onClick={() => onDelete(review)}
              fontWeight='bold'
            >
              Eliminar
            </Button>
          </Flex>
        </Box>
      ))}

      {reviews.length > REVIEWS_TO_SHOW && (
        <Flex justify='center' mb={2} mt={1}>
          <Button
            onClick={() => setShowAll((prev) => !prev)}
            bg='#8224e3'
            color='#fff'
            _hover={{ bg: '#6313a3' }}
            fontWeight='bold'
            size='md'
          >
            {showAll ? 'Ver menos' : 'Ver más'}
          </Button>
        </Flex>
      )}

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
    </Box>
  )
}
