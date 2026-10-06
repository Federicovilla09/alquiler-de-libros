import { useParams } from 'react-router'
import NavigationHeader from '../components/NavigationHeader'
import BookForm from '../components/BookForm'
import PlaceholderPage from './PlaceholderPage'
import { findBook } from '../data/books'

function EditBookPage() {
  const { id } = useParams()
  const book = findBook(id)

  if (!book) {
    return <PlaceholderPage title="Libro no encontrado" />
  }

  return (
    <main className="app">
      <NavigationHeader title="Editar datos del libro" backTo={`/libros/${book.id}`} />
      <BookForm book={book} submitLabel="Confirmar edición" />
    </main>
  )
}

export default EditBookPage