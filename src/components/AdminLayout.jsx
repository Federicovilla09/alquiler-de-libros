import { useEffect, useRef, useState } from 'react'
import { Outlet, useLocation, useNavigate, useNavigationType } from 'react-router'
import './AdminLayout.css'
import SideNav from './SideNav'
import BottomNav from './BottomNav'
import SidePanel from './SidePanel'
import HomePage from '../pages/HomePage'
import { useMediaQuery } from '../utils/useMediaQuery'

// Las pantallas que, en tablet y escritorio, se abren en un panel lateral
const PANELS = [
  { pattern: /^\/libros\/nuevo$/, title: 'Agregar nuevo libro' },
  { pattern: /^\/libros\/\d+\/editar$/, title: 'Editar datos del libro' },
  { pattern: /^\/libros\/\d+$/, title: 'Ficha del libro', size: 'wide' },
  { pattern: /^\/seguimiento$/, title: 'Seguimiento' },
]

// Lo que comparten todas las pantallas de la gestión
function AdminLayout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const isWide = useMediaQuery('(min-width: 600px)')
  const panel = PANELS.find((p) => p.pattern.test(pathname))

  // Cuántos pasos se avanzó dentro del panel abierto
  const navigationType = useNavigationType()
  const [depth, setDepth] = useState(0)
  const wasOpen = useRef(false)

  useEffect(() => {
    if (!panel || !wasOpen.current) {
      setDepth(0)
    } else if (navigationType === 'PUSH') {
      setDepth((d) => d + 1)
    } else if (navigationType === 'POP') {
      setDepth((d) => Math.max(0, d - 1))
    }
    wasOpen.current = Boolean(panel)
  }, [pathname])

  // Celular, o una dirección que no va en panel: la pantalla completa
  if (!isWide || (!panel && pathname !== '/')) {
    return (
      <div className="admin">
        <SideNav />
        <div className="admin__main">
          <Outlet />
        </div>
        <BottomNav />
      </div>
    )
  }

  // Tablet y escritorio: la biblioteca siempre de fondo, y el panel encima
  return (
    <div className="admin">
      <SideNav />
      <div className="admin__main">
        <HomePage />
      </div>
      {panel && (
        <SidePanel
          title={panel.title}
          size={panel.size}
          onClose={() => navigate('/')}
          onBack={depth > 0 ? () => navigate(-1) : undefined}
        >
          <Outlet />
        </SidePanel>
      )}
      <BottomNav />
    </div>
  )
}

export default AdminLayout