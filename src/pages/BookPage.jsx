import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import './BookPage.css'
import NavigationHeader from '../components/NavigationHeader'
import Icon from '../components/Icon'
import TagChoice from '../components/TagChoice'
import Tabs from '../components/Tabs'
import Button from '../components/Button'
import BookCopyCard from '../components/BookCopyCard'
import BookHistory from '../components/BookHistory'
import Modal from '../components/Modal'
import SummaryCard, { SummaryItem } from '../components/SummaryCard'
import Notification from '../components/Notification'
import PlaceholderPage from './PlaceholderPage'
import { formatPrice } from '../data/books'
import { useLibrary } from '../store/LibraryContext'
import { addDays, formatDate, today } from '../utils/dates'

const STARS = [1, 2, 3, 4, 5]

function BookPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [tab, setTab] = useState(0)
  const [pendingRental, setPendingRental] = useState(null)
  const [notice, setNotice] = useState(null)
  const { getBook, updateCopy, rentCopy } = useLibrary()
  const book = getBook(id)

  // La notificación desaparece sola a los 3 segundos
  useEffect(() => {
    if (!notice) return
    const timer = setTimeout(() => setNotice(null), 3000)
    return () => clearTimeout(timer)
  }, [notice])

  if (!book) {
    return <PlaceholderPage title="Libro no encontrado" />
  }

  // Los dos plazos, con su fecha de devolución calculada desde hoy
  const start = today()
  const plans = [
    { days: 15, price: book.price15 },
    { days: 30, price: book.price30 },
  ].map((plan) => ({ ...plan, end: addDays(start, plan.days) }))

  const returnOptions = plans.map(
    (plan) => `${plan.days} días · ${formatPrice(plan.price)} · vuelve el ${formatDate(plan.end)}`
  )

  function confirmRental() {
    rentCopy(book.id, pendingRental.copy.number, pendingRental.plan)
    setPendingRental(null)
    setNotice('¡Libro alquilado con éxito!')
  }

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
                  key={`${copy.number}-${copy.state}`}
                  state={copy.state}
                  copyNumber={copy.number}
                  condition={copy.condition}
                  borrower={copy.borrower}
                  returnDate={copy.returnDate}
                  returnOptions={returnOptions}
                  onReserve={(name) =>
                    updateCopy(book.id, copy.number, { state: 'reserved', borrower: name })
                  }
                  onCancelReservation={() =>
                    updateCopy(book.id, copy.number, { state: 'available', borrower: undefined })
                  }
                  onConfirmDelivery={(option) =>
                    setPendingRental({ copy, plan: plans[returnOptions.indexOf(option)] })
                  }
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

      <Modal open={pendingRental !== null} onClose={() => setPendingRental(null)} label="Resumen del alquiler">
        {pendingRental && (
          <>
            <section className="modal-section">
              <h2 className="modal-section__title">Resumen del alquiler</h2>
              <SummaryCard>
                <SummaryItem label="Libro alquilado" value={book.title} />
                <SummaryItem label="Nombre del cliente" value={pendingRental.copy.borrower} />
                <div className="summary-card__row">
                  <SummaryItem label="Fecha de retiro" value={formatDate(start)} />
                  <SummaryItem label="Fecha de devolución" value={formatDate(pendingRental.plan.end)} />
                </div>
              </SummaryCard>
            </section>
            <p className="modal__note">Lo vas a ver en «Para hoy» cuando se acerque la fecha.</p>
            <Button onClick={confirmRental}>Confirmar alquiler</Button>
          </>
        )}
      </Modal>

      {notice && (
        <div className="toast">
          <Notification>{notice}</Notification>
        </div>
      )}
    </main>
  )
}

export default BookPage