import { addDays, daysBetween, formatDate, parseDate, today } from './dates'

const RESERVATION_DAYS = 2 // las reservas se liberan a las 48 h

function shortDate(date) {
  return formatDate(date).slice(0, 5) // "22/10/2026" → "22/10"
}

function plural(n, one, many) {
  return `${n} ${n === 1 ? one : many}`
}

// Arma la lista de Seguimiento a partir de los ejemplares de todos los libros
export function getLoans(books) {
  const now = today()
  const loans = []

  for (const book of books) {
    for (const copy of book.copies) {
      const base = { id: `${book.id}-${copy.number}`, bookId: book.id }

      if (copy.state === 'reserved') {
        const reservedAt = copy.reservedAt ? parseDate(copy.reservedAt) : now
        const expires = addDays(reservedAt, RESERVATION_DAYS)
        const left = daysBetween(now, expires)

        loans.push({
          ...base,
          state: 'reserved',
          who: `Para ${copy.borrower}`,
          progress: (RESERVATION_DAYS - left) / RESERVATION_DAYS,
          status:
            left <= 0
              ? 'Se libera hoy si no se confirma'
              : `Se libera en ${plural(left, 'día', 'días')} si no se confirma`,
          date: expires,
          expiresToday: left <= 0,
        })
      }

      if (copy.state === 'rented') {
        const due = parseDate(copy.returnDate)
        const total = copy.days ?? 15
        const left = daysBetween(now, due)

        let state
        let status
        if (left < 0) {
          state = 'overdue'
          status = `${plural(-left, 'día', 'días')} de atraso · venció el ${shortDate(due)}`
        } else if (left === 0) {
          state = 'due-today'
          status = `Vuelve hoy · día ${total} de ${total}`
        } else {
          state = 'on-track'
          status = `Faltan ${plural(left, 'día', 'días')} · vuelve el ${shortDate(due)}`
        }

        loans.push({
          ...base,
          state,
          who: `Con ${copy.borrower}`,
          progress: (total - left) / total,
          status,
          date: due,
        })
      }
    }
  }

  // Lo más urgente primero
  return loans.sort((a, b) => a.date - b.date)
}