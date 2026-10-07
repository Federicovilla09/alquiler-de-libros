import { useNavigate, useParams } from 'react-router'
import NavigationHeader from '../components/NavigationHeader'
import BookForm from '../components/BookForm'
import PlaceholderPage from './PlaceholderPage'
import { useLibrary } from '../store/LibraryContext'
import { useNotice } from '../store/NoticeContext'

function EditBookPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getBook, editBook } = useLibrary()
  const { notify } = useNotice()
  const book = getBook(id)

  if (!book) {
    return <PlaceholderPage title="Libro no encontrado" />
  }

  function handleSubmit(values) {
    editBook(book.id, values)
    notify('¡Datos editados con éxito!')

    // Volver a la ficha de la que se vino, o abrirla si se llegó directo
    if (window.history.state?.idx > 0) {
      navigate(-1)
    } else {
      navigate(`/libros/${book.id}`, { replace: true })
    }
  }

  return (
    <main className="app">
      <NavigationHeader title="Editar datos del libro" backTo={`/libros/${book.id}`} />
      <BookForm book={book} submitLabel="Confirmar edición" onSubmit={handleSubmit} />
    </main>
  )
}

export default EditBookPage