import { useState } from 'react'
import { useNavigate } from 'react-router'
import NavigationHeader from '../components/NavigationHeader'
import BookForm from '../components/BookForm'
import { useLibrary } from '../store/LibraryContext'
import { useNotice } from '../store/NoticeContext'
import { normalize } from '../utils/text'
import { compactKey } from '../utils/text'

function NewBookPage() {
  const navigate = useNavigate()
  const { books, addBook } = useLibrary()
  const { notify } = useNotice()
  const [duplicate, setDuplicate] = useState(null)

  function handleSubmit(values) {
    const existing = books.find(
      (book) =>
        compactKey(book.title) === compactKey(values.title) &&
        compactKey(book.author) === compactKey(values.author)
    )

    if (existing) {
      setDuplicate(existing)
      return
    }

    const id = addBook(values)
    notify('¡Libro agregado con éxito!')
    navigate(`/libros/${id}`, { replace: true })
  }

  return (
    <main className="app">
      <NavigationHeader title="Agregar nuevo libro" />
      <BookForm
        submitLabel="Sumar a la biblioteca"
        onSubmit={handleSubmit}
        duplicate={duplicate}
        onDuplicateAction={() => navigate(`/libros/${duplicate.id}`, { state: { addCopy: true } })}
        onIdentityChange={() => setDuplicate(null)}
      />
    </main>
  )
}

export default NewBookPage