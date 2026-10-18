import { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
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
import ConditionPicker from '../components/ConditionPicker'
import ScreenLoader from '../components/ScreenLoader'
import PlaceholderPage from './PlaceholderPage'
import { formatPrice } from '../data/books'
import { useLibrary } from '../store/LibraryContext'
import { useNotice } from '../store/NoticeContext'
import { addDays, daysBetween, formatDate, parseDate, today } from '../utils/dates'
import { stripQuotes } from '../utils/text'

const STARS = [1, 2, 3, 4, 5]
const SAVE_ERROR = 'No pudimos guardar el cambio. Revisá tu conexión y probá de nuevo.'

function BookPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [tab, setTab] = useState(0)
  const [pendingRental, setPendingRental] = useState(null)
  const [pendingReturn, setPendingReturn] = useState(null)
  const [addingCopy, setAddingCopy] = useState(location.state?.addCopy === true)
  const [newCondition, setNewCondition] = useState('Nuevo')
  const [deleting, setDeleting] = useState(false)
  const {
    loading,
    getBook,
    reserveCopy,
    cancelReservation,
    rentCopy,
    renewCopy,
    returnCopy,
    addCopy,
    deleteBook,
  } = useLibrary()
  const { notify } = useNotice()
  const book = getBook(id)

  if (loading) return <ScreenLoader />

  if (!book) {
    return <PlaceholderPage title="Libro no encontrado" />
  }

  const start = today()

  // Ejecuta una acción y avisa cómo salió
  async function run(action, successText) {
    const error = await action
    if (error) {
      notify(SAVE_ERROR, 'error')
    } else if (successText) {
      notify(successText)
    }
  }

  // Los dos plazos del libro, contados desde una fecha
  function makePlans(from) {
    return [
      { days: 15, price: book.price15 },
      { days: 30, price: book.price30 },
    ].map((plan) => ({ ...plan, end: addDays(from, plan.days) }))
  }

  function planLabel(plan) {
    return `${plan.days} días · ${formatPrice(plan.price)} · vuelve el ${formatDate(plan.end)}`
  }

  // Una renovación siempre cuenta desde hoy
  function renewalStart() {
    return start
  }

  const plans = makePlans(start)
  const returnOptions = plans.map(planLabel)

  const returnLateDays = pendingReturn
    ? Math.max(0, daysBetween(parseDate(pendingReturn.returnDate), start))
    : 0

  // Eliminar: los ejemplares prestados o reservados lo impiden
  const lentCopies = book.copies.filter((copy) => copy.state !== 'available')
  const canDelete = lentCopies.length === 0
  const historyCount = (book.history ?? []).length
  const deleteSummary = [
    `${book.copies.length} ${book.copies.length === 1 ? 'ejemplar' : 'ejemplares'}`,
    `${historyCount} ${historyCount === 1 ? 'alquiler' : 'alquileres'} del historial`,
  ].join(' y ')

  function confirmRental() {
    const { copy, plan } = pendingRental
    setPendingRental(null)
    run(rentCopy(book.id, copy.number, plan), '¡Libro alquilado con éxito!')
  }

  function confirmReturn() {
    const copy = pendingReturn
    setPendingReturn(null)
    run(returnCopy(book.id, copy.number), '¡Libro devuelto a la biblioteca!')
  }

  function confirmAddCopy() {
    setAddingCopy(false)
    run(addCopy(book.id, newCondition), '¡Ejemplar agregado con éxito!')
  }

  // Primero volver a la biblioteca, después borrar:
  // así la ficha nunca muestra un libro que ya no existe
  async function confirmDelete() {
    const bookId = book.id
    setDeleting(false)
    navigate('/', { replace: true })
    const error = await deleteBook(bookId)
    notify(error ? 'No pudimos eliminar el libro. Revisá tu conexión y probá de nuevo.' : 'Libro eliminado', error ? 'error' : undefined)
  }

  return (
    <main className="app">
      <NavigationHeader title="Estado del libro" />

      <div className="content book-page">
        <section className="book-summary">
          <div className="book-summary__cover" style={{ backgroundColor: book.coverColor }}>
            {book.coverUrl && <img src={book.coverUrl} width="96" height="134" alt="" />}
          </div>
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

        {book.quote && <blockquote className="catalog-book__quote">“{stripQuotes(book.quote)}”</blockquote>}

        <section className="book-synopsis">
          <h3 className="book-synopsis__title">Sinopsis</h3>
          <p className="book-synopsis__text">{book.synopsis}</p>
        </section>

        <div className="book-tabs">
          <Tabs tabs={['Ejemplares', 'Historial']} onChange={setTab} />

          {tab === 0 && (
            <div className="book-copies">
              <div className="book-copies__add">
                <Button
                  variant="ghost"
                  icon="plus-add"
                  onClick={() => {
                    setNewCondition('Nuevo')
                    setAddingCopy(true)
                  }}
                >
                  Agregar nuevo ejemplar
                </Button>
              </div>
              {book.copies.map((copy) => {
                const renewPlans = copy.state === 'rented' ? makePlans(renewalStart(copy)) : []
                const renewOptions = renewPlans.map(planLabel)

                return (
                  <BookCopyCard
                    key={`${copy.number}-${copy.state}`}
                    state={copy.state}
                    copyNumber={copy.number}
                    condition={copy.condition}
                    borrower={copy.borrower}
                    returnDate={copy.returnDate}
                    returnOptions={returnOptions}
                    renewOptions={renewOptions}
                    onReserve={(name) => run(reserveCopy(book.id, copy.number, name))}
                    onCancelReservation={() => run(cancelReservation(book.id, copy.number))}
                    onConfirmDelivery={(option) =>
                      setPendingRental({ copy, plan: plans[returnOptions.indexOf(option)] })
                    }
                    onConfirmRenewal={(option) =>
                      run(
                        renewCopy(book.id, copy.number, renewPlans[renewOptions.indexOf(option)]),
                        '¡Alquiler renovado con éxito!'
                      )
                    }
                    onReturn={() => setPendingReturn(copy)}
                  />
                )
              })}
            </div>
          )}

          {tab === 1 && <BookHistory history={book.history ?? []} />}
        </div>

        <div className="book-actions">
          <Button variant="secondary" icon="edit-pencil" onClick={() => navigate(`/libros/${book.id}/editar`)}>
            Editar datos del libro
          </Button>
          <Button variant="danger-secondary" icon="trash" onClick={() => setDeleting(true)}>
            Eliminar libro
          </Button>
        </div>
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

      <Modal open={pendingReturn !== null} onClose={() => setPendingReturn(null)} label="Devolución del libro">
        {pendingReturn && (
          <>
            <section className="modal-section">
              <h2 className="modal-section__title">Devolución del libro</h2>
              <SummaryCard>
                <SummaryItem label="Libro" value={book.title} />
                <SummaryItem label="Devuelve" value={pendingReturn.borrower} />
                <div className="summary-card__row">
                  <SummaryItem label="Fecha pactada" value={pendingReturn.returnDate} />
                  <SummaryItem
                    label="Atraso"
                    value={
                      returnLateDays > 0
                        ? `${returnLateDays} ${returnLateDays === 1 ? 'día' : 'días'}`
                        : 'Sin atraso'
                    }
                  />
                </div>
              </SummaryCard>
            </section>
            <Button onClick={confirmReturn}>Devolver a la biblioteca</Button>
          </>
        )}
      </Modal>

      <Modal open={addingCopy} onClose={() => setAddingCopy(false)} label="Agregar ejemplar">
        {addingCopy && (
          <>
            <ConditionPicker
              label="Condición del nuevo ejemplar"
              boxed
              onChange={setNewCondition}
            />
            <Button onClick={confirmAddCopy}>Agregar ejemplar</Button>
          </>
        )}
      </Modal>

      <Modal
        open={deleting}
        onClose={() => setDeleting(false)}
        label={canDelete ? 'Eliminar libro' : 'Este libro está prestado'}
      >
        {deleting && canDelete && (
          <>
            <section className="modal-section">
              <h2 className="modal-section__title">¿Eliminar este libro?</h2>
              <SummaryCard>
                <SummaryItem label="Libro" value={book.title} />
                <SummaryItem label="Se va a borrar" value={deleteSummary} />
              </SummaryCard>
            </section>
            <p className="modal__note">
              También se borra su portada y deja de aparecer en el catálogo. Esta acción no se puede deshacer.
            </p>
            <div className="modal__actions">
              <Button variant="danger" icon="trash" onClick={confirmDelete}>
                Sí, eliminar libro
              </Button>
              <Button variant="secondary" onClick={() => setDeleting(false)}>
                Cancelar
              </Button>
            </div>
          </>
        )}

        {deleting && !canDelete && (
          <>
            <section className="modal-section">
              <h2 className="modal-section__title">Este libro está prestado</h2>
              <SummaryCard>
                <SummaryItem label="Libro" value={book.title} />
                <SummaryItem
                  label={lentCopies.length === 1 ? 'Lo tiene' : 'Lo tienen'}
                  value={lentCopies.map((copy) => `Ejemplar ${copy.number} · ${copy.borrower}`).join(', ')}
                />
              </SummaryCard>
            </section>
            <p className="modal__note">
              Para eliminarlo, primero registrá la devolución o cancelá la reserva de cada ejemplar.
            </p>
            <Button onClick={() => setDeleting(false)}>Entendido</Button>
          </>
        )}
      </Modal>
    </main>
  )
}

export default BookPage