import './BookRow.css'

const STATUS_COLORS = {
  Disponible: 'var(--success-10)',
  Reservado: 'var(--info-9)',
  Alquilado: 'var(--warning-7)',
}

function BookRow({ title, author, status, copies, coverColor }) {
  return (
    <article className="book-row">
      <div className="book-row__details">
        <div className="book-row__cover" style={{ backgroundColor: coverColor }} />
        <div className="book-row__info">
          <h3 className="book-row__title">{title}</h3>
          <p className="book-row__author">{author}</p>
        </div>
      </div>
      <div className="book-row__availability">
        <span className="book-row__status">
          <span className="book-row__dot" style={{ backgroundColor: STATUS_COLORS[status] }} />
          {status}
        </span>
        <span className="book-row__copies">
          {copies === 1 ? '1 ejemplar' : `${copies} ejemplares`}
        </span>
      </div>
    </article>
  )
}

export default BookRow