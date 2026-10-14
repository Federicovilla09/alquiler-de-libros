import { useRef, useState } from 'react'
import { Link } from 'react-router'
import './FeaturedCarousel.css'
import Icon from './Icon'
import { stripQuotes } from '../utils/text'

function FeaturedCard({ book, priority = false }) {
  return (
    <Link to={`/catalogo/libro/${book.id}`} className="featured-card">
      <div className="featured-card__texts">
        <span className="featured-card__chip">Recomendado por Mica</span>
        <p className="featured-card__title">{book.title}</p>
        <p className="featured-card__author">{book.author}</p>
        {book.quote && <p className="featured-card__quote">“{stripQuotes(book.quote)}”</p>}
        <span className="featured-card__cta">
          Ver libro
          <Icon name="arrows-button-right" />
        </span>
      </div>
      <div className="featured-card__cover" style={{ backgroundColor: book.coverColor }}>
        {book.coverUrl && (
          <img
            src={book.coverUrl}
            alt=""
            width="104"
            height="152"
            fetchPriority={priority ? 'high' : 'auto'}
          />
        )}
      </div>
    </Link>
  )
}

function FeaturedCarousel({ books }) {
  const [active, setActive] = useState(0)
  const trackRef = useRef(null)

  // Cuál tarjeta se ve: cuántas tarjetas se desplazó el carrusel
  function handleScroll() {
    const track = trackRef.current
    const first = track.firstElementChild
    if (!first) return
    const step = first.offsetWidth + (parseFloat(getComputedStyle(track).columnGap) || 0)
    setActive(Math.round(track.scrollLeft / step))
  }

  return (
    <div className="featured-carousel">
      <div className="featured-carousel__track" ref={trackRef} onScroll={handleScroll}>
        {books.map((book, index) => (
          <FeaturedCard key={book.id} book={book} priority={index === 0} />
        ))}
      </div>

      {/* El Pager es un indicador: muestra cuál se ve, pero no se toca */}
      {books.length > 1 && (
        <div className="pager" aria-hidden="true">
          {books.map((book, index) => (
            <span
              key={book.id}
              className={index === active ? 'pager__dot pager__dot--active' : 'pager__dot'}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default FeaturedCarousel