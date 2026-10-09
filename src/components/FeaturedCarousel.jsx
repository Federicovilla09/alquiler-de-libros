import { useRef, useState } from 'react'
import { Link } from 'react-router'
import './FeaturedCarousel.css'
import Icon from './Icon'

function FeaturedCard({ book }) {
  return (
    <Link to={`/catalogo/libro/${book.id}`} className="featured-card">
      <div className="featured-card__texts">
        <span className="featured-card__chip">Recomendado por Mica</span>
        <p className="featured-card__title">{book.title}</p>
        <p className="featured-card__author">{book.author}</p>
        {book.quote && <p className="featured-card__quote">“{book.quote}”</p>}
        <span className="featured-card__cta">
          Ver libro
          <Icon name="arrows-button-right" />
        </span>
      </div>
      <div className="featured-card__cover" style={{ backgroundColor: book.coverColor }}>
        {book.coverUrl && <img src={book.coverUrl} alt="" />}
      </div>
    </Link>
  )
}

function FeaturedCarousel({ books }) {
  const [active, setActive] = useState(0)
  const trackRef = useRef(null)

  // Cuál tarjeta se ve: cuántos anchos se desplazó el carrusel
  function handleScroll() {
    const track = trackRef.current
    setActive(Math.round(track.scrollLeft / track.clientWidth))
  }

  function goTo(index) {
    const track = trackRef.current
    track.scrollTo({ left: index * track.clientWidth, behavior: 'smooth' })
  }

  return (
    <div className="featured-carousel">
      <div className="featured-carousel__track" ref={trackRef} onScroll={handleScroll}>
        {books.map((book) => (
          <FeaturedCard key={book.id} book={book} />
        ))}
      </div>

      {books.length > 1 && (
        <div className="pager" role="group" aria-label="Recomendados">
          {books.map((book, index) => (
            <button
              key={book.id}
              type="button"
              className={index === active ? 'pager__dot pager__dot--active' : 'pager__dot'}
              aria-label={`Ver recomendado ${index + 1} de ${books.length}`}
              aria-current={index === active ? 'true' : undefined}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default FeaturedCarousel