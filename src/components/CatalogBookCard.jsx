import { Link } from 'react-router'
import './CatalogBookCard.css'

function CatalogBookCard({ book, size = 'row' }) {
  return (
    <Link to={`/catalogo/libro/${book.id}`} className={`catalog-card catalog-card--${size}`}>
      <div className="catalog-card__cover" style={{ backgroundColor: book.coverColor }}>
        {book.coverUrl && <img src={book.coverUrl} alt="" loading="lazy" />}
      </div>
      <div className="catalog-card__info">
        <p className="catalog-card__title">{book.title}</p>
        <p className="catalog-card__author">{book.author}</p>
        <p
          className={
            book.available
              ? 'catalog-card__availability catalog-card__availability--available'
              : 'catalog-card__availability'
          }
        >
          <span className="catalog-card__dot" aria-hidden="true" />
          {book.available ? 'Disponible' : 'No disponible'}
        </p>
      </div>
    </Link>
  )
}

export default CatalogBookCard