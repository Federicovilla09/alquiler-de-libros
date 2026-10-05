import { useParams } from 'react-router'
import PlaceholderPage from './PlaceholderPage'
import { books } from '../data/books'

function BookPage() {
  const { id } = useParams()
  const book = books.find((b) => b.id === Number(id))

  return <PlaceholderPage title={book ? book.title : 'Libro no encontrado'} />
}

export default BookPage