import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { usuario, cargando } = useContext(AuthContext)

  if (cargando) return null
  if (!usuario) {
    return <Navigate to='/' replace />
  }
  if (allowedRoles.length && !allowedRoles.includes(usuario.rol)) {
    return <Navigate to='/' replace />
  }
  return <Outlet />
}

export default ProtectedRoute
