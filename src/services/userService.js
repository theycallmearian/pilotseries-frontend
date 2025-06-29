const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const API = `${BACKEND_URL}/api/usuarios/me`

export const getPerfilUsuario = async () => {
  const token = localStorage.getItem('token')
  const res = await fetch(`${API}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('No se pudo cargar el usuario')
  return await res.json()
}

export const getFavoritas = async () => {
  const token = localStorage.getItem('token')
  const res = await fetch(`${API}/favoritas`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('No se pudieron cargar favoritas')
  return await res.json()
}

export const getSeguidas = async () => {
  const token = localStorage.getItem('token')
  const res = await fetch(`${API}/seguidas`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('No se pudieron cargar seguidas')
  return await res.json()
}

export const getFinalizadas = async () => {
  const token = localStorage.getItem('token')
  const res = await fetch(`${API}/finalizadas`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('No se pudieron cargar finalizadas')
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

export async function deleteUser(userId) {
  const token = localStorage.getItem('token')
  const res = await fetch(`${BACKEND_URL}/api/usuarios/${userId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw new Error(error.message || 'Error al eliminar el usuario')
  }
  return await res.json()
}

export async function getAllUsers() {
  const token = localStorage.getItem('token')
  const res = await fetch(`${BACKEND_URL}/api/usuarios`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw new Error(error.message || 'Error al cargar usuarios')
  }
  return await res.json()
}

export async function banUser(id) {
  const token = localStorage.getItem('token')
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/${id}/ban`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
  )
  const text = await res.text()
  if (!res.ok) throw new Error(text)
  return text
}

export async function unbanUser(id) {
  const token = localStorage.getItem('token')
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/${id}/unban`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
  )
  const text = await res.text()
  if (!res.ok) throw new Error(text)
  return text
}
