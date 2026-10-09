import { useEffect, useState } from 'react'
import { Outlet } from 'react-router'
import ScreenLoader from '../../components/ScreenLoader'
import { fetchCatalog } from '../../lib/catalog'

function CatalogLayout() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchCatalog().then(({ data, error }) => {
      if (error) {
        setError('No pudimos cargar el catálogo. Revisá tu conexión y volvé a intentar.')
      } else {
        setBooks(data)
      }
      setLoading(false)
    })
  }, [])

  if (loading) return <ScreenLoader />
  if (error) return <p className="placeholder screen-error">{error}</p>

  return <Outlet context={{ books }} />
}

export default CatalogLayout