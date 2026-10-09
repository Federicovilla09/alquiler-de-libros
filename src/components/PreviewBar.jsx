import { Link } from 'react-router'
import './PreviewBar.css'

function PreviewBar({ bookId }) {
  return (
    <div className="preview-bar" role="region" aria-label="Vista de clienta">
      <div className="preview-bar__texts">
        <p className="preview-bar__title">Vista de clienta</p>
        <p className="preview-bar__subtitle">Así ven tu catálogo</p>
      </div>
      <div className="preview-bar__actions">
        {bookId && (
          <Link to={`/libros/${bookId}/editar`} className="preview-bar__action">
            Editar libro
          </Link>
        )}
        <Link to="/" className="preview-bar__action">
          Volver al panel
        </Link>
      </div>
    </div>
  )
}

export default PreviewBar