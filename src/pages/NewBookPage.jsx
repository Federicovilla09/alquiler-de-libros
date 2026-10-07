import { useNavigate } from 'react-router'
import NavigationHeader from '../components/NavigationHeader'
import BookForm from '../components/BookForm'
import { useLibrary } from '../store/LibraryContext'

function NewBookPage() {
  const navigate = useNavigate()
  const { addBook } = useLibrary()

  function handleSubmit(values) {
    const id = addBook(values)
    navigate(`/libros/${id}`, {
      replace: true,
      state: { notice: '¡Libro agregado con éxito!' },
    })
  }

  return (
    <main className="app">
      <NavigationHeader title="Agregar nuevo libro" />
      <BookForm submitLabel="Sumar a la biblioteca" onSubmit={handleSubmit} />
    </main>
  )
}

export default NewBookPage