import React, { useState, useRef, useCallback } from 'react'
import { Box, useToast, useBreakpointValue } from '@chakra-ui/react'
import { useAuth } from '../context/AuthContext'
import ProfileHeaderSection from '../components/Profile/ProfileHeaderSection'
import Recommendations from '../components/Profile/Recommendations'
import ProfileTabsSection from '../components/Profile/ProfileTabsSection'
import ProfileEditForm from '../components/Profile/ProfileEditForm'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export default function PerfilPage() {
  const { usuario, logout } = useAuth()
  const [editing, setEditing] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const cancelRef = useRef()
  const toast = useToast()
  const isMobile = useBreakpointValue({ base: true, md: false })

  const [refreshKey, setRefreshKey] = useState(0)
  const refreshAll = useCallback(() => setRefreshKey((k) => k + 1), [])

  if (!usuario) return <Box color='white'>Cargando usuario...</Box>

  const handleDeleteProfile = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/usuarios/me`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      if (!res.ok) throw new Error('No se pudo eliminar la cuenta')
      toast({ title: 'Cuenta eliminada', status: 'success' })
      logout()
    } catch (e) {
      toast({ title: e.message, status: 'error' })
    }
    setIsOpen(false)
  }

  return (
    <Box
      minH='100vh'
      py={10}
      px={[2, 4, 6]}
      maxW='1100px'
      mx='auto'
      width='100%'
      borderRadius='0 0 24px 24px'
      boxShadow='xl'
      display='flex'
      flexDirection='column'
      alignItems='center'
    >
      <ProfileHeaderSection
        user={usuario}
        isMobile={isMobile}
        editing={editing}
        onEdit={() => setEditing(true)}
        onDelete={handleDeleteProfile}
      />

      {!editing && <Recommendations onUpdate={refreshAll} />}

      {editing && (
        <ProfileEditForm
          user={usuario}
          onSuccess={() => {
            setEditing(false)
            refreshAll()
          }}
          onCancel={() => setEditing(false)}
        />
      )}

      {!editing && (
        <ProfileTabsSection usuario={usuario} refreshKey={refreshKey} />
      )}
    </Box>
  )
}
