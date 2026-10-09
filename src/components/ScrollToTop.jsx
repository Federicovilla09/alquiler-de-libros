import { useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router'

// Al avanzar a otra pantalla, volver al principio.
// Al ir hacia atrás, el navegador restaura la posición anterior.
function ScrollToTop() {
  const { pathname } = useLocation()
  const navigationType = useNavigationType()

  useEffect(() => {
    if (navigationType !== 'POP') {
      window.scrollTo(0, 0)
    }
  }, [pathname, navigationType])

  return null
}

export default ScrollToTop