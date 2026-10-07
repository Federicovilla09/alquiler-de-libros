import { createContext, useContext, useState } from 'react'
import { books as initialBooks } from '../data/books'
import { addDays, formatDate, today } from '../utils/dates'

const LibraryContext = createContext(null)

export function LibraryProvider({ children }) {
  const [books, setBooks] = useState(initialBooks)

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

  const value = { books, getBook, updateCopy, rentCopy }

  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>
}

export function useLibrary() {
  const context = useContext(LibraryContext)
  if (!context) {
    throw new Error('useLibrary tiene que usarse dentro de LibraryProvider')
  }
  return context
}