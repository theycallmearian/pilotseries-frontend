const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export async function getAllSeries() {
  const res = await fetch(`${BACKEND_URL}/api/series`)
  if (!res.ok) throw new Error('No se pudieron cargar las series')
  return await res.json()
}

export async function getSerieById(id) {
  const res = await fetch(`${BACKEND_URL}/api/series/${id}`)
  if (!res.ok) throw new Error('No se pudo cargar la serie')
  return await res.json()
}

export async function createSerie(serieData) {
  const res = await fetch(`${BACKEND_URL}/api/series`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(serieData)
  })
  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw new Error(error.message || 'Error al crear la serie')
  }
  return await res.json()
}

export async function updateSerie(id, serieData) {
  const res = await fetch(`${BACKEND_URL}/api/series/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(serieData)
  })
  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw new Error(error.message || 'Error al actualizar la serie')
  }
  return await res.json()
}

export async function deleteSerie(id) {
  const res = await fetch(`${BACKEND_URL}/api/series/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw new Error(error.message || 'Error al eliminar la serie')
  }
  return await res.json()
}

export const toggleFavorita = async (serieId, isFavorita) => {
  const token = localStorage.getItem('token')
  const endpoint = isFavorita ? 'unfavorite' : 'favorite'
  const res = await fetch(`${BACKEND_URL}/api/series/${serieId}/${endpoint}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
  if (!res.ok) throw new Error('No se pudo actualizar favorito')
  return await res.json()
}

export const toggleSeguida = async (serieId, isSeguida) => {
  const token = localStorage.getItem('token')
  const endpoint = isSeguida ? 'unfollow' : 'follow'
  const res = await fetch(`${BACKEND_URL}/api/series/${serieId}/${endpoint}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
  if (!res.ok) throw new Error('No se pudo actualizar seguimiento')
  return await res.json()
}

export const toggleFinalizada = async (serieId, isFinalizada) => {
  const token = localStorage.getItem('token')
  const endpoint = isFinalizada ? 'unfinish' : 'finish'
  const res = await fetch(`${BACKEND_URL}/api/series/${serieId}/${endpoint}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
  if (!res.ok) throw new Error('No se pudo actualizar finalizada')
  return await res.json()
}

export async function getSerieReviews(serieId) {
  const res = await fetch(`${BACKEND_URL}/api/reviews/serie/${serieId}`)
  if (!res.ok) throw new Error('No se pudieron cargar las reviews')
  return await res.json()
}

export async function addReview(serieId, { comentario, rating }) {
  const token = localStorage.getItem('token')
  const res = await fetch(`${BACKEND_URL}/api/reviews/${serieId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ comentario, rating })
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || 'No se pudo agregar la reseña')
  }
  return await res.json()
}

export async function updateReview(reviewId, { comentario, rating }) {
  const token = localStorage.getItem('token')
  const res = await fetch(`${BACKEND_URL}/api/reviews/${reviewId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ comentario, rating })
  })
  if (!res.ok) throw new Error('No se pudo editar la reseña')
  return await res.json()
}

export async function deleteReview(reviewId) {
  const token = localStorage.getItem('token')
  const res = await fetch(`${BACKEND_URL}/api/reviews/${reviewId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
  if (!res.ok) throw new Error('No se pudo eliminar la reseña')
  return await res.json()
}

export async function likeReview(reviewId) {
  const token = localStorage.getItem('token')
  const res = await fetch(`${BACKEND_URL}/api/reviews/${reviewId}/like`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
  if (!res.ok) throw new Error('No se pudo actualizar el like')
  return await res.json()
}
