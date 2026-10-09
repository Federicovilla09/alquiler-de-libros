import { useEffect, useState } from 'react'
import { Outlet, useMatch } from 'react-router'
import ScreenLoader from '../../components/ScreenLoader'
import PreviewBar from '../../components/PreviewBar'
import { fetchCatalog } from '../../lib/catalog'
import { useAuth } from '../../store/AuthContext'

function CatalogLayout() {
  const { session } = useAuth()
  const bookMatch = useMatch('/catalogo/libro/:id')
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

  return (
    <>
      {/* Micaela, con su sesión iniciada, ve el catálogo con la barra arriba */}
      {session && <PreviewBar bookId={bookMatch?.params.id} />}
      <Outlet context={{ books }} />
    </>
  )
}

export default CatalogLayout