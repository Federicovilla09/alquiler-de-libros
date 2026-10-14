import { Link } from 'react-router'
import './LibraryBookCard.css'
import StatusIndicator from './StatusIndicator'

const STATUS_TYPES = {
  Disponible: 'available',
  Alquilado: 'rent',
  Reservado: 'reserved',
}

function LibraryBookCard({ book, status }) {
  const copies = book.copies.length

  return (
    <Link to={`/libros/${book.id}`} className="library-card">
      <div className="library-card__cover" style={{ backgroundColor: book.coverColor }}>
        {book.coverUrl && <img src={book.coverUrl} alt="" loading="lazy" width="164" height="236" />}
      </div>
      <div className="library-card__info">
        <p className="library-card__title">{book.title}</p>
        <p className="library-card__author">{book.author}</p>
        <div className="library-card__meta">
          <StatusIndicator type={STATUS_TYPES[status]}>{status}</StatusIndicator>
          <span className="library-card__copies">{copies === 1 ? '1 ejemplar' : `${copies} ejemplares`}</span>
        </div>
      </div>
    </Link>
  )
}

export default LibraryBookCard