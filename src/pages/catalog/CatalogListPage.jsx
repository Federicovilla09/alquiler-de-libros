import { useOutletContext } from 'react-router'
import './CatalogHomePage.css'
import NavigationHeader from '../../components/NavigationHeader'
import CatalogBookCard from '../../components/CatalogBookCard'
import CatalogFooter from '../../components/CatalogFooter'

// Cada sección: su título, su subtítulo y cómo ordena los libros
const SECTIONS = {
  newest: {
    title: 'Recién llegados',
    subtitle: 'Lo último que sumó Mica',
    sort: (books) => books, // ya llegan del más nuevo al más viejo
  },
  topRated: {
    title: 'Mejor valorados',
    subtitle: 'Los que más le gustaron a Mica',
    sort: (books) => [...books].sort((a, b) => b.rating - a.rating),
  },
}

function CatalogListPage({ section }) {
  const { books } = useOutletContext()
  const { title, subtitle, sort } = SECTIONS[section]
  const list = sort(books)

  return (
    <main className="catalog-page">
      <NavigationHeader title={title} backTo="/catalogo" />

      <section className="catalog-grid-section">
        <div className="catalog-grid-section__title">
          <h2>{subtitle}</h2>
          <p>
            {list.length} {list.length === 1 ? 'título' : 'títulos'}
          </p>
        </div>
        <div className="catalog-grid">
          {list.map((book) => (
            <CatalogBookCard key={book.id} book={book} size="grid" />
          ))}
        </div>
      </section>

      <CatalogFooter />
    </main>
  )
}

export default CatalogListPage