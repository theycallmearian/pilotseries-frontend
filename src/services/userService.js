const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const API = `${BACKEND_URL}/api/usuarios/me`

export const getPerfilUsuario = async () => {
  const token = localStorage.getItem('token')
  let res
  try {
    res = await fetch(`${API}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  } catch (err) {
    if (err.message && err.message.toLowerCase().includes('failed to fetch')) {
      throw new Error('No se pudo conectar con el servidor. Inténtalo más tarde.')
    }
    throw err
  }
  if (!res.ok) throw new Error('No se pudo cargar el usuario')
  return await res.json()
}

export const getFavoritas = async () => {
  const token = localStorage.getItem('token')
  let res
  try {
    res = await fetch(`${API}/favoritas`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  } catch (err) {
    if (err.message && err.message.toLowerCase().includes('failed to fetch')) {
      throw new Error('No se pudo conectar con el servidor. Inténtalo más tarde.')
    }
    throw err
  }
  if (!res.ok) throw new Error('No se pudieron cargar favoritas')
  return await res.json()
}

export const getSeguidas = async () => {
  const token = localStorage.getItem('token')
  let res
  try {
    res = await fetch(`${API}/seguidas`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  } catch (err) {
    if (err.message && err.message.toLowerCase().includes('failed to fetch')) {
      throw new Error('No se pudo conectar con el servidor. Inténtalo más tarde.')
    }
    throw err
  }
  if (!res.ok) throw new Error('No se pudieron cargar seguidas')
  return await res.json()
}

export const getFinalizadas = async () => {
  const token = localStorage.getItem('token')
  let res
  try {
    res = await fetch(`${API}/finalizadas`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  } catch (err) {
    if (err.message && err.message.toLowerCase().includes('failed to fetch')) {
      throw new Error('No se pudo conectar con el servidor. Inténtalo más tarde.')
    }
    throw err
  }
  if (!res.ok) throw new Error('No se pudieron cargar finalizadas')
  return await res.json()
}

export const toggleFavorita = async (serieId, isFavorita) => {
  const token = localStorage.getItem('token')
  const endpoint = isFavorita ? 'unfavorite' : 'favorite'
  let res
  try {
    res = await fetch(`${BACKEND_URL}/api/series/${serieId}/${endpoint}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
  } catch (err) {
    if (err.message && err.message.toLowerCase().includes('failed to fetch')) {
      throw new Error('No se pudo conectar con el servidor. Inténtalo más tarde.')
    }
    throw err
  }
  if (!res.ok) throw new Error('No se pudo actualizar favorito')
  return await res.json()
}

export const toggleSeguida = async (serieId, isSeguida) => {
  const token = localStorage.getItem('token')
  const endpoint = isSeguida ? 'unfollow' : 'follow'
  let res
  try {
    res = await fetch(`${BACKEND_URL}/api/series/${serieId}/${endpoint}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
  } catch (err) {
    if (err.message && err.message.toLowerCase().includes('failed to fetch')) {
      throw new Error('No se pudo conectar con el servidor. Inténtalo más tarde.')
    }
    throw err
  }
  if (!res.ok) throw new Error('No se pudo actualizar seguimiento')
  return await res.json()
}

export const toggleFinalizada = async (serieId, isFinalizada) => {
  const token = localStorage.getItem('token')
  const endpoint = isFinalizada ? 'unfinish' : 'finish'
  let res
  try {
    res = await fetch(`${BACKEND_URL}/api/series/${serieId}/${endpoint}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
  } catch (err) {
    if (err.message && err.message.toLowerCase().includes('failed to fetch')) {
      throw new Error('No se pudo conectar con el servidor. Inténtalo más tarde.')
    }
    throw err
  }
  if (!res.ok) throw new Error('No se pudo actualizar finalizada')
  return await res.json()
}

export async function deleteUser(userId) {
  const token = localStorage.getItem('token')
  let res
  try {
    res = await fetch(`${BACKEND_URL}/api/usuarios/${userId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
  } catch (err) {
    if (err.message && err.message.toLowerCase().includes('failed to fetch')) {
      throw new Error('No se pudo conectar con el servidor. Inténtalo más tarde.')
    }
    throw err
  }
  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw new Error(error.message || 'Error al eliminar el usuario')
  }
  return await res.json()
}

export async function getAllUsers() {
  const token = localStorage.getItem('token')
  let res
  try {
    res = await fetch(`${BACKEND_URL}/api/usuarios`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  } catch (err) {
    if (err.message && err.message.toLowerCase().includes('failed to fetch')) {
      throw new Error('No se pudo conectar con el servidor. Inténtalo más tarde.')
    }
    throw err
  }
  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw new Error(error.message || 'Error al cargar usuarios')
  }
  return await res.json()
}

export async function banUser(id) {
  const token = localStorage.getItem('token')
  let res
  try {
    res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/${id}/ban`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
  } catch (err) {
    if (err.message && err.message.toLowerCase().includes('failed to fetch')) {
      throw new Error('No se pudo conectar con el servidor. Inténtalo más tarde.')
    }
    throw err
  }
  const text = await res.text()
  if (!res.ok) throw new Error(text || 'Error al banear usuario')
  return text
}

export async function unbanUser(id) {
  const token = localStorage.getItem('token')
  let res
  try {
    res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/${id}/unban`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
  } catch (err) {
    if (err.message && err.message.toLowerCase().includes('failed to fetch')) {
      throw new Error('No se pudo conectar con el servidor. Inténtalo más tarde.')
    }
    throw err
  }
  const text = await res.text()
  if (!res.ok) throw new Error(text || 'Error al desbanear usuario')
  return text
}
