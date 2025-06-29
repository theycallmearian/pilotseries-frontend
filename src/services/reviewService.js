const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export async function addReview(serieId, review) {
  const token = localStorage.getItem('token')
  const res = await fetch(`${BACKEND_URL}/api/series/${serieId}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(review)
  })
  if (!res.ok) throw new Error('No se pudo añadir la review')
  return await res.json()
}

export async function getReviewsBySerieId(serieId) {
  const res = await fetch(`${BACKEND_URL}/api/series/${serieId}/reviews`)
  if (!res.ok) throw new Error('No se pudieron cargar las reviews')
  return await res.json()
}

export async function getAllReviews() {
  const res = await fetch(`${BACKEND_URL}/api/reviews`)
  if (!res.ok) throw new Error('No se pudieron cargar las reviews')
  return await res.json()
}

export async function deleteReview(reviewId) {
  const token = localStorage.getItem('token')
  const res = await fetch(`${BACKEND_URL}/api/reviews/${reviewId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
  if (!res.ok) throw new Error('No se pudo eliminar la review')
  return await res.json()
}

export async function getUserReviews(userId) {
  const token = localStorage.getItem('token')
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/reviews/user/${userId}`,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  )
  if (!res.ok) throw new Error('No se pudieron cargar tus reseñas')
  return await res.json()
}

export async function updateReview(reviewId, data) {
  const token = localStorage.getItem('token')
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/reviews/${reviewId}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
  )
  if (!res.ok) throw new Error('No se pudo actualizar la review')
  return await res.json()
}
