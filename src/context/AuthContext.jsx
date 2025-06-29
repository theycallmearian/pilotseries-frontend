import React, { createContext, useContext, useState, useEffect } from 'react'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const [usuario, setUsuario] = useState(() => {
    const raw = localStorage.getItem('usuario')
    try {
      if (!raw || raw === 'undefined') return null
      return JSON.parse(raw)
    } catch (e) {
      return null
    }
  })
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    setCargando(true)
    const raw = localStorage.getItem('usuario')
    if (!raw || raw === 'undefined') {
      setUsuario(null)
    } else {
      try {
        const userObj = JSON.parse(raw)
        setUsuario(userObj)
      } catch {
        setUsuario(null)
      }
    }
    setCargando(false)
  }, [])

  const login = (nuevoToken, infoUsuario) => {
    setCargando(true)
    localStorage.setItem('token', nuevoToken)
    localStorage.setItem('usuario', JSON.stringify(infoUsuario))
    setToken(nuevoToken)
    setUsuario(infoUsuario)
    setCargando(false)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    setToken(null)
    setUsuario(null)
    setCargando(false)
  }

  const actualizarUsuario = (infoUsuario) => {
    setUsuario(infoUsuario)
    localStorage.setItem('usuario', JSON.stringify(infoUsuario))
  }

  return (
    <AuthContext.Provider
      value={{ token, usuario, login, logout, actualizarUsuario, cargando }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
