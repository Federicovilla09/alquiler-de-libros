import { createContext, useContext, useEffect, useState } from 'react'
import * as db from '../lib/library'
import { useAuth } from './AuthContext'
import { addDays, daysBetween, parseDate, today } from '../utils/dates'

const LibraryContext = createContext(null)

export function LibraryProvider({ children }) {
  const { session } = useAuth()
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(null)

  async function refresh() {
    const { data, error } = await db.fetchBooks()
    if (error) {
      setLoadError('No pudimos cargar la biblioteca. Revisá tu conexión.')
    } else {
      setBooks(data)
      setLoadError(null)
    }
    setLoading(false)
  }

  // Cargar la biblioteca al iniciar sesión, y vaciarla al cerrarla
  useEffect(() => {
    if (!session) {
      setBooks([])
      setLoading(true)
      return
    }
    refresh()
  }, [session])

  function getBook(id) {
    return books.find((book) => book.id === Number(id))
  }

  function findCopy(bookId, number) {
    return getBook(bookId)?.copies.find((copy) => copy.number === number)
  }

  // Guarda en la base y, si salió bien, vuelve a leer la biblioteca
  async function save(operation) {
    const error = await operation
    if (!error) await refresh()
    return error
  }

  // Días de atraso de un ejemplar alquilado, a hoy
  function lateDaysOf(copy) {
    return Math.max(0, daysBetween(parseDate(copy.returnDate), today()))
  }

  function reserveCopy(bookId, number, borrower) {
    return save(db.reserveCopy(bookId, number, borrower))
  }

  function cancelReservation(bookId, number) {
    return save(db.cancelReservation(bookId, number))
  }

  function rentCopy(bookId, number, plan) {
    const copy = findCopy(bookId, number)
    const start = today()
    return save(
      db.rentCopy(bookId, number, {
        borrower: copy.borrower,
        price: plan.price,
        days: plan.days,
        start,
        end: addDays(start, plan.days),
      })
    )
  }

  function renewCopy(bookId, number, plan) {
    const copy = findCopy(bookId, number)
    const lateDays = lateDaysOf(copy)
    // El nuevo plazo siempre cuenta desde el día en que se renueva
    const start = today()
    return save(
      db.renewCopy(bookId, number, {
        borrower: copy.borrower,
        price: plan.price,
        days: plan.days,
        start,
        end: addDays(start, plan.days),
        lateDays,
      })
    )
  }

  function returnCopy(bookId, number) {
    const copy = findCopy(bookId, number)
    return save(db.returnCopy(bookId, number, lateDaysOf(copy)))
  }

  function addCopy(bookId, condition) {
    const book = getBook(bookId)
    const nextNumber = Math.max(0, ...book.copies.map((c) => c.number)) + 1
    return save(db.addCopy(bookId, nextNumber, condition))
  }

  async function addBook(values) {
    const result = await db.addBook(values)
    // Si el libro llegó a crearse, refrescar (aunque algo después haya fallado)
    if (result.id) await refresh()
    return result
  }

  function editBook(bookId, values) {
    return save(db.editBook(bookId, values))
  }

  const value = {
    books,
    loading,
    loadError,
    refresh,
    getBook,
    reserveCopy,
    cancelReservation,
    rentCopy,
    renewCopy,
    returnCopy,
    addCopy,
    addBook,
    editBook,
  }

  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>
}

export function useLibrary() {
  const context = useContext(LibraryContext)
  if (!context) {
    throw new Error('useLibrary tiene que usarse dentro de LibraryProvider')
  }
  return context
}