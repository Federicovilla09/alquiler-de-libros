import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import './BookPage.css'
import NavigationHeader from '../components/NavigationHeader'
import Icon from '../components/Icon'
import TagChoice from '../components/TagChoice'
import Tabs from '../components/Tabs'
import Button from '../components/Button'
import BookCopyCard from '../components/BookCopyCard'
import BookHistory from '../components/BookHistory'
import PlaceholderPage from './PlaceholderPage'
import { formatPrice } from '../data/books'
import { useLibrary } from '../store/LibraryContext'

const STARS = [1, 2, 3, 4, 5]

function BookPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [tab, setTab] = useState(0)
  const { getBook, updateCopy } = useLibrary()
  const book = getBook(id)

  if (!book) {
    return <PlaceholderPage title="Libro no encontrado" />
  }

  const returnOptions = [
    `15 días · ${formatPrice(book.price15)}`,
    `30 días · ${formatPrice(book.price30)}`,
  ]

  return (
    <main className="app">
      <NavigationHeader title="Estado del libro" />

      <div className="content book-page">
        <section className="book-summary">
          <div className="book-summary__cover" style={{ backgroundColor: book.coverColor }} />
          <div className="book-summary__meta">
            <div>
              <p className="book-summary__price">{formatPrice(book.price15)}</p>
              <p className="book-summary__price-note">*Precio por 15 días de alquiler</p>
            </div>
            <div>
              <h2 className="book-summary__title">{book.title}</h2>
              <p className="book-summary__author">{book.author}</p>
            </div>
            <div
              className="book-summary__rating"
              role="img"
              aria-label={`Puntaje: ${book.rating} de 5 estrellas`}
            >
              {STARS.map((n) => (
                <Icon key={n} name="star" filled={n <= book.rating} />
              ))}
            </div>
            {book.tropes.length > 0 && (
              <div className="book-summary__tags">
                {book.tropes.map((trope) => (
                  <TagChoice key={trope} variant="trope" readOnly>
                    {trope}
                  </TagChoice>
                ))}
              </div>
            )}
          </div>
        </section>

        {book.quote && <blockquote className="book-quote">“{book.quote}”</blockquote>}

        <section className="book-synopsis">
          <h3 className="book-synopsis__title">Sinopsis</h3>
          <p className="book-synopsis__text">{book.synopsis}</p>
        </section>

        <div className="book-tabs">
          <Tabs tabs={['Ejemplares', 'Historial']} onChange={setTab} />

          {tab === 0 && (
            <div className="book-copies">
              <div className="book-copies__add">
                <Button variant="ghost" icon="plus-add">
                  Agregar nuevo ejemplar
                </Button>
              </div>
              {book.copies.map((copy) => (
                <BookCopyCard
                  key={copy.number}
                  state={copy.state}
                  copyNumber={copy.number}
                  condition={copy.condition}
                  borrower={copy.borrower}
                  returnDate={copy.returnDate}
                  returnOptions={returnOptions}
                />
              ))}
            </div>
          )}

          {tab === 1 && <BookHistory history={book.history ?? []} />}
        </div>

        <Button variant="ghost" icon="edit-pencil" onClick={() => navigate(`/libros/${book.id}/editar`)}>
          Editar datos del libro
        </Button>
      </div>
    </main>
  )
}

export default BookPage