import './BookHistory.css'
import HistoryItem from './HistoryItem'
import { formatPrice } from '../data/books'

const STATUS_LABELS = {
  current: 'En curso',
  'on-time': 'Devuelto a tiempo',
  late: 'Devuelto con atraso',
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
            current={rental.status === 'current'}
            who={rental.who}
            price={formatPrice(rental.price)}
            copy={`Ejemplar ${rental.copy} · ${rental.days} días`}
            dates={`${rental.from} → ${rental.to}`}
            status={STATUS_LABELS[rental.status]}
          />
        ))}
      </ol>
    </div>
  )
}

export default BookHistory