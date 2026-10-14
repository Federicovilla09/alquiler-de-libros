import { useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router'

// Al avanzar a otra pantalla, volver al principio.
// Al ir hacia atrás, el navegador restaura la posición anterior.
// En la gestión de tablet y escritorio, las pantallas se abren en paneles:
// la biblioteca de fondo no se mueve.
function ScrollToTop() {
  const { pathname } = useLocation()
  const navigationType = useNavigationType()

  useEffect(() => {
    const isPanelLayout =
      window.matchMedia('(min-width: 600px)').matches &&
      !pathname.startsWith('/catalogo') &&
      pathname !== '/login'

    if (navigationType !== 'POP' && !isPanelLayout) {
      window.scrollTo(0, 0)
    }
  }, [pathname, navigationType])

  return null
}

export default ScrollToTop