import { createContext, useContext, useEffect, useState } from 'react'
import { fetchBooks } from '../lib/library'
import { useAuth } from './AuthContext'
import { addDays, daysBetween, formatDate, parseDate, today } from '../utils/dates'

const LibraryContext = createContext(null)

export function LibraryProvider({ children }) {
  const { session } = useAuth()
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(null)

  async function refresh() {
    const { data, error } = await fetchBooks()
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

  // Aplica un cambio a un libro, sin tocar los demás
  function updateBook(bookId, update) {
    setBooks((current) =>
      current.map((book) => (book.id === Number(bookId) ? update(book) : book))
    )
  }

  function updateCopy(bookId, copyNumber, changes) {
    updateBook(bookId, (book) => ({
      ...book,
      copies: book.copies.map((copy) =>
        copy.number === copyNumber ? { ...copy, ...changes } : copy
      ),
    }))
  }

  // Cierra el alquiler en curso de un ejemplar en el historial
  function closeCurrentRental(history, copyNumber, lateDays) {
    return history.map((rental) =>
      rental.copy === copyNumber && rental.status === 'current'
        ? { ...rental, status: lateDays > 0 ? 'late' : 'on-time', lateDays }
        : rental
    )
  }

  function rentCopy(bookId, copyNumber, plan) {
    const start = today()
    const end = addDays(start, plan.days)

    updateBook(bookId, (book) => {
      const copy = book.copies.find((c) => c.number === copyNumber)

      const rental = {
        id: Date.now(),
        who: copy.borrower,
        price: plan.price,
        copy: copyNumber,
        days: plan.days,
        from: formatDate(start),
        to: formatDate(end),
        status: 'current',
      }

      return {
        ...book,
        copies: book.copies.map((c) =>
          c.number === copyNumber
            ? { ...c, state: 'rented', days: plan.days, returnDate: formatDate(end) }
            : c
        ),
        history: [rental, ...(book.history ?? [])],
      }
    })
  }

  function renewCopy(bookId, copyNumber, plan) {
    updateBook(bookId, (book) => {
      const copy = book.copies.find((c) => c.number === copyNumber)
      const due = parseDate(copy.returnDate)
      const lateDays = Math.max(0, daysBetween(due, today()))
      // Desde la fecha de devolución, o desde hoy si ya venció
      const start = lateDays > 0 ? today() : due
      const end = addDays(start, plan.days)

      const renewal = {
        id: Date.now(),
        who: copy.borrower,
        price: plan.price,
        copy: copyNumber,
        days: plan.days,
        from: formatDate(start),
        to: formatDate(end),
        status: 'current',
        renewed: true,
      }

      return {
        ...book,
        copies: book.copies.map((c) =>
          c.number === copyNumber ? { ...c, days: plan.days, returnDate: formatDate(end) } : c
        ),
        history: [renewal, ...closeCurrentRental(book.history ?? [], copyNumber, lateDays)],
      }
    })
  }

  function returnCopy(bookId, copyNumber) {
    updateBook(bookId, (book) => {
      const copy = book.copies.find((c) => c.number === copyNumber)
      const lateDays = Math.max(0, daysBetween(parseDate(copy.returnDate), today()))

      return {
        ...book,
        copies: book.copies.map((c) =>
          c.number === copyNumber ? { number: c.number, condition: c.condition, state: 'available' } : c
        ),
        history: closeCurrentRental(book.history ?? [], copyNumber, lateDays),
      }
    })
  }

  function addCopy(bookId, condition) {
    updateBook(bookId, (book) => {
      const nextNumber = Math.max(0, ...book.copies.map((c) => c.number)) + 1
      return {
        ...book,
        copies: [...book.copies, { number: nextNumber, condition, state: 'available' }],
      }
    })
  }

  function addBook(values) {
    const id = Math.max(0, ...books.map((b) => b.id)) + 1
    const { condition, copies, coverFile, ...data } = values

    const book = {
      ...data,
      id,
      coverColor: 'var(--blush-3)',
      copies: Array.from({ length: copies }, (_, i) => ({
        number: i + 1,
        condition,
        state: 'available',
      })),
      history: [],
    }

    setBooks((current) => [book, ...current])
    return id
  }

  function editBook(bookId, values) {
    const { conditions = {}, condition, copies, coverFile, ...data } = values

    updateBook(bookId, (book) => ({
      ...book,
      ...data,
      copies: book.copies.map((copy) => ({
        ...copy,
        condition: conditions[copy.number] ?? copy.condition,
      })),
    }))
  }

    const value = {
    books,
    loading,
    loadError,
    refresh,
    getBook,
    updateCopy,
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