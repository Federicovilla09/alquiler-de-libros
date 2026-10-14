import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'
import './SidePanel.css'
import Icon from './Icon'

function SidePanel({ title, size = 'default', onClose, onBack, children }) {
  const dialogRef = useRef(null)
  const bodyRef = useRef(null)
  const { pathname } = useLocation()

  // Abrirlo como modal al aparecer: Escape, foco adentro y fondo oscuro
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog.open) dialog.showModal()
    return () => {
      if (dialog.open) dialog.close()
    }
  }, [])

  // Al pasar de una pantalla a otra dentro del panel, volver arriba
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = 0
  }, [pathname])

  return (
    <dialog
      ref={dialogRef}
      className={`side-panel side-panel--${size}`}
      aria-labelledby="side-panel-title"
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        // Un toque en el fondo oscuro (fuera del panel) lo cierra
        if (event.target === dialogRef.current) onClose()
      }}
    >
      <div className="side-panel__inner">
        <header className="side-panel__header">
          {onBack && (
            <button type="button" className="side-panel__button" aria-label="Volver" onClick={onBack}>
              <Icon name="arrows-button-left" size={18} />
            </button>
          )}
          <h2 id="side-panel-title" className="side-panel__title">
            {title}
          </h2>
          <button type="button" className="side-panel__button" aria-label="Cerrar" onClick={onClose}>
            <Icon name="delete" size={18} />
          </button>
        </header>
        <div className="side-panel__body" ref={bodyRef}>
          {children}
        </div>
      </div>
    </dialog>
  )
}

export default SidePanel