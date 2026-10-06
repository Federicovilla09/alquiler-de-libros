import { createContext, useContext, useState } from 'react'
import { books as initialBooks } from '../data/books'

const LibraryContext = createContext(null)

export function LibraryProvider({ children }) {
  const [books, setBooks] = useState(initialBooks)

  function getBook(id) {
    return books.find((book) => book.id === Number(id))
  }

  function updateCopy(bookId, copyNumber, changes) {
    setBooks((current) =>
      current.map((book) => {
        if (book.id !== Number(bookId)) return book

        return {
          ...book,
          copies: book.copies.map((copy) =>
            copy.number === copyNumber ? { ...copy, ...changes } : copy
          ),
        }
      })
    )
  }

  const value = { books, getBook, updateCopy }

  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>
}

export function useLibrary() {
  const context = useContext(LibraryContext)
  if (!context) {
    throw new Error('useLibrary tiene que usarse dentro de LibraryProvider')
  }
  return context
}