import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { IconButton, Text } from '@chakra-ui/react'
import { useAlert } from '../../context/AlertContext'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export default function HeartLikeButton({
  reviewId,
  initialLikes,
  onLikeSuccess = () => {}
}) {
  const { usuario } = useAuth()
  const { showError } = useAlert()

  const [likes, setLikes] = useState(
    Array.isArray(initialLikes) ? initialLikes : []
  )
  const [liking, setLiking] = useState(false)

  const isLiked =
    usuario &&
    likes.some((id) => String(id) === String(usuario.id || usuario._id))

  const handleLike = async () => {
    if (!usuario) return showError('Debes iniciar sesión para dar like')
    setLiking(true)
    try {
      const res = await fetch(`${BACKEND_URL}/api/reviews/${reviewId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (!res.ok) throw new Error('Error al dar like')
      const data = await res.json()
      setLikes(Array.isArray(data.likes) ? data.likes : [])
      if (onLikeSuccess) onLikeSuccess()
    } catch (e) {
      showError('Error al dar like')
    } finally {
      setLiking(false)
    }
  }

  return (
    <>
      <IconButton
        icon={isLiked ? <FaHeart color='red' /> : <FaRegHeart color='gray' />}
        variant='ghost'
        aria-label='Me gusta'
        onClick={handleLike}
        isRound
        size='md'
        isLoading={liking}
      />
      <Text color='gray.300' fontWeight='bold' fontSize='md' ml={2}>
        {likes.length}
      </Text>
    </>
  )
}
