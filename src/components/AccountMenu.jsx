import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import './AccountMenu.css'
import Avatar from './Avatar'
import Icon from './Icon'
import { useAuth } from '../store/AuthContext'

function AccountMenu() {
  const navigate = useNavigate()
  const { session, signOut } = useAuth()
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)

  // Cerrar al tocar afuera o al apretar Escape
  useEffect(() => {
    if (!open) return

    function handlePointerDown(event) {
      if (!rootRef.current.contains(event.target)) setOpen(false)
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  return (
    <div className="account-menu" ref={rootRef}>
      <button
        type="button"
        className="account-menu__trigger"
        aria-label="Abrir menú de cuenta"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <Avatar src="/avatar-mica.png" />
      </button>

      {open && (
        <div className="account-menu__popover">
          <div className="account-menu__session">
            <p className="account-menu__label">Sesión iniciada como</p>
            <p className="account-menu__email">{session?.user.email}</p>
          </div>

          <button type="button" className="account-menu__item" onClick={() => navigate('/catalogo')}>
            <span className="account-menu__icon">
              <Icon name="book-library" />
            </span>
            Ver catálogo público
          </button>

          <button type="button" className="account-menu__item" onClick={signOut}>
            <span className="account-menu__icon">
              <Icon name="logout" />
            </span>
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  )
}

export default AccountMenu