import './BookHistory.css'
import HistoryItem from './HistoryItem'
import { formatPrice } from '../data/books'

// ← CAMBIO 1: la tabla STATUS_LABELS se reemplazó por esta función
function getStatusText(rental) {
  if (rental.status === 'current') return 'En curso'

  if (rental.status === 'late') {
    const days = rental.lateDays
    return `Devuelto con ${days} ${days === 1 ? 'día' : 'días'} de atraso`
  }

  return 'Devuelto a tiempo'
}

function BookHistory({ history }) {
  if (history.length === 0) {
    return (
      <div className="book-history-empty">
        <p className="book-history-empty__title">Todavía no se alquiló este libro</p>
        <p className="book-history-empty__text">
          Cuando lo alquiles, vas a ver acá quién lo tuvo, cuándo y por cuánto.
        </p>
      </div>
    )
  }

  const total = history.reduce((sum, rental) => sum + rental.price, 0)

  return (
    <div className="book-history">
      <p className="book-history__summary">
        {history.length} {history.length === 1 ? 'alquiler' : 'alquileres'} · {formatPrice(total)} en total
      </p>
      <ol className="history-list">
        {history.map((rental) => (
          <HistoryItem
            key={rental.id}
            who={rental.who}
            price={formatPrice(rental.price)}
            copy={`Ejemplar ${rental.copy} · ${rental.days} días`}
            dates={`${rental.from} → ${rental.to}`}
            status={rental.status}
            statusText={getStatusText(rental)}
            renewed={rental.renewed}
          />
        ))}
      </ol>
    </div>
  )
}

export default BookHistory