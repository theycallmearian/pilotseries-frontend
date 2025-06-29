import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'

export default function AppLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
