import { useOutletContext } from 'react-router'

function CatalogHomePage() {
  const { books } = useOutletContext()

  return (
    <main className="app">
      <div className="content">
        <h1>Catálogo · {books.length} títulos</h1>
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              {book.title} — {book.available ? `Disponible (${book.condition})` : 'No disponible'}
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}

export default CatalogHomePage