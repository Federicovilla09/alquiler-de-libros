import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import './AccountMenu.css'
import Avatar from './Avatar'
import Icon from './Icon'
import { useAuth } from '../store/AuthContext'
import { useNotice } from '../store/NoticeContext'

function AccountMenu() {
  const navigate = useNavigate()
  const { session, signOut } = useAuth()
  const { notify } = useNotice()
  const [open, setOpen] = useState(false)

  // Cerrar con la tecla Escape (los toques afuera los atrapa el fondo oscuro)
  useEffect(() => {
    if (!open) return

    function handleKeyDown(event) {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open])

  async function copyCatalogLink() {
    const link = `${window.location.origin}/catalogo`
    setOpen(false)

    try {
      await navigator.clipboard.writeText(link)
      notify('¡Link copiado!')
    } catch {
      notify('No pudimos copiar el link. Abrí tu catálogo y copialo desde el navegador.', 'error')
    }
  }

  return (
    <div className="account-menu">
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
        <div className="account-menu__backdrop" aria-hidden="true" onClick={() => setOpen(false)} />
      )}

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

          <button type="button" className="account-menu__item" onClick={copyCatalogLink}>
            <span className="account-menu__icon">
              <Icon name="copy" />
            </span>
            Copiar link del catálogo
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