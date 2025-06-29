import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import HomePage from './pages/HomePage'
import PerfilPage from './pages/PerfilPage'
import SeriePage from './pages/SeriePage'
import AdminPage from './pages/AdminPage'
import ProtectedRoute from './routes/ProtectedRoute'
import AppLayout from './components/AppLayout/AppLayout'

function App() {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route element={<ProtectedRoute allowedRoles={['usuario', 'admin']} />}>
        <Route element={<AppLayout />}>
          <Route path='/app' element={<HomePage />} />
          <Route path='/perfil' element={<PerfilPage />} />
          <Route path='/serie/:id' element={<SeriePage />} />
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path='/admin' element={<AdminPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}
export default App
