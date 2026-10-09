import { useNavigate, useParams } from 'react-router'
import NavigationHeader from '../components/NavigationHeader'
import BookForm from '../components/BookForm'
import ScreenLoader from '../components/ScreenLoader'
import PlaceholderPage from './PlaceholderPage'
import { useLibrary } from '../store/LibraryContext'
import { useNotice } from '../store/NoticeContext'

function EditBookPage() {
  // 1. Primero, todos los "use..."
  const { id } = useParams()
  const navigate = useNavigate()
  const { loading, getBook, editBook } = useLibrary()
  const { notify } = useNotice()

  // 2. Después, los casos especiales
  if (loading) return <ScreenLoader />

  const book = getBook(id)
  if (!book) {
    return <PlaceholderPage title="Libro no encontrado" />
  }

  // 3. Por último, las acciones y la pantalla
  async function handleSubmit(values) {
    const error = await editBook(book.id, values)
    if (error) {
      notify('No pudimos guardar los cambios. Revisá tu conexión y probá de nuevo.', 'error')
      return
    }

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