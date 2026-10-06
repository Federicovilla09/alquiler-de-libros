import NavigationHeader from '../components/NavigationHeader'
import BookForm from '../components/BookForm'

function NewBookPage() {
  return (
    <main className="app">
      <NavigationHeader title="Agregar nuevo libro" />
      <BookForm submitLabel="Sumar a la biblioteca" />
    </main>
  )
}

export default NewBookPage