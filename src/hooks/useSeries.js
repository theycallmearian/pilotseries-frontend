import { useEffect, useState } from 'react'
import { getAllSeries } from '../services/seriesService'

export function useSeries() {
  const [series, setSeries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllSeries().then((data) => {
      setSeries(data)
      setLoading(false)
    })
  }, [])

  return { series, loading }
}
