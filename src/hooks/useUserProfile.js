import { useEffect, useState } from 'react'
import { getUserProfile } from '../services/userService'

export function useUserProfile() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    getUserProfile().then((data) => {
      if (isMounted) {
        setUser(data)
        setLoading(false)
      }
    })
    return () => {
      isMounted = false
    }
  }, [])

  return { user, loading }
}
