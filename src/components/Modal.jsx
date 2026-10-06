import { useEffect, useRef } from 'react'
import './Modal.css'
import Icon from './Icon'

function Modal({ open, onClose, label, children }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current

    if (open && !dialog.open) {
      dialog.showModal()
      document.body.style.overflow = 'hidden'
    }

    if (!open && dialog.open) {
      dialog.close()
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  function handleClick(event) {
    // Un toque en el fondo oscuro (fuera del panel) cierra el modal
    if (event.target === dialogRef.current) {
      onClose()
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      aria-label={label}
      onClose={onClose}
      onClick={handleClick}
    >
      <div className="modal__content">
        <button type="button" className="modal__close" aria-label="Cerrar" onClick={onClose}>
          <Icon name="delete" />
        </button>
        {children}
      </div>
    </dialog>
  )
}

export default Modal
