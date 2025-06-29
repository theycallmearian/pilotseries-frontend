import React, { createContext, useContext, useState, useEffect } from 'react'
import {
  toggleFavorita,
  toggleSeguida,
  toggleFinalizada,
  getPerfilUsuario
} from '../services/userService'
import { useAuth } from './AuthContext'

const UserContext = createContext()
export const useUser = () => useContext(UserContext)

export function UserProvider({ children }) {
  const { token } = useAuth()
  const [usuario, setUsuario] = useState(null)
  const [cargandoUsuario, setCargandoUsuario] = useState(true)

  useEffect(() => {
    setUsuario(null)
    setCargandoUsuario(true)
    if (!token) {
      setCargandoUsuario(false)
      return
    }
    getPerfilUsuario()
      .then((u) => {
        setUsuario(u)
      })
      .catch(() => setUsuario(null))
      .finally(() => setCargandoUsuario(false))
  }, [token])

  const refetchUsuario = async () => {
    setCargandoUsuario(true)
    try {
      const usuarioActualizado = await getPerfilUsuario()
      setUsuario(usuarioActualizado)
    } catch {
      setUsuario(null)
    } finally {
      setCargandoUsuario(false)
    }
  }

  const alternarFavorita = async (serieId) => {
    try {
      const isFav = usuario?.favoritosSeries?.some(
        (serie) => String(serie._id) === String(serieId)
      )
      await toggleFavorita(serieId, isFav)
      await refetchUsuario()
    } catch (err) {
      throw err
    }
  }

  const alternarSeguida = async (serieId) => {
    try {
      const isSeg = usuario?.seguimientoSeries?.some(
        (serie) => String(serie._id) === String(serieId)
      )
      await toggleSeguida(serieId, isSeg)
      await refetchUsuario()
    } catch (err) {
      throw err
    }
  }

  const alternarFinalizada = async (serieId) => {
    try {
      const isFin = usuario?.seriesFinalizadas?.some(
        (serie) => String(serie._id) === String(serieId)
      )
      await toggleFinalizada(serieId, isFin)
      await refetchUsuario()
    } catch (err) {
      throw err
    }
  }

  return (
    <UserContext.Provider
      value={{
        usuario,
        setUsuario,
        cargandoUsuario,
        refetchUsuario,
        alternarFavorita,
        alternarSeguida,
        alternarFinalizada
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
