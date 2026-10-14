import { useState } from 'react'
import HomeHeader from '../components/HomeHeader'
import SearchBar from '../components/SearchBar'
import GenreFilters from '../components/GenreFilters'
import BookRow from '../components/BookRow'
import LibraryBookCard from '../components/LibraryBookCard'
import Button from '../components/Button'
import ScreenLoader from '../components/ScreenLoader'
import EmptyLibrary from '../components/EmptyLibrary'
import { getBookStatus } from '../data/books'
import { useLibrary } from '../store/LibraryContext'
import { getLoans } from '../utils/loans'
import { getAlerts } from '../utils/alerts'
import { normalize } from '../utils/text'
import { useMediaQuery } from '../utils/useMediaQuery'

const PAGE_SIZE = 10 // celular: diez filas
const GRID_PAGE_SIZE = 12 // tablet y escritorio: tres filas de cuatro, o dos de seis

function HomePage() {
  // 1. Primero, todos los "use..."
  const { books, loading, loadError } = useLibrary()
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState('Todos')
  const [showAll, setShowAll] = useState(false)
  const isWide = useMediaQuery('(min-width: 600px)')

  // 2. Después, los casos especiales
  if (loading) return <ScreenLoader />
  if (loadError) return <p className="placeholder screen-error">{loadError}</p>

  // Home 00: la biblioteca todavía no tiene libros
  if (books.length === 0) {
    return (
      <main className="app">
        <HomeHeader welcome />
        <div className="content">
          <EmptyLibrary />
        </div>
      </main>
    )
  }

  // 3. Por último, los cálculos con los datos
  const alerts = getAlerts(getLoans(books))
  const search = normalize(query)

  const filteredBooks = books.filter((book) => {
    const matchesGenre = genre === 'Todos' || book.genre === genre
    const matchesSearch =
      normalize(book.title).includes(search) || normalize(book.author).includes(search)
    return matchesGenre && matchesSearch
  })

  const isFiltering = search !== '' || genre !== 'Todos'
  const pageSize = isWide ? GRID_PAGE_SIZE : PAGE_SIZE
  const visibleBooks = showAll ? filteredBooks : filteredBooks.slice(0, pageSize)
  const hiddenCount = filteredBooks.length - visibleBooks.length

  return (
    <main className="app">
      <HomeHeader alerts={alerts} />
      <div className="content">
        <div className="home-tools">
          <SearchBar value={query} onChange={setQuery} />
          <GenreFilters selected={genre} onChange={setGenre} />
        </div>

        <section className="catalog">
          <h2 className="catalog__title" aria-live="polite">
            {isFiltering
              ? `${filteredBooks.length} de ${books.length} títulos`
              : `${books.length} títulos en tu biblioteca`}
          </h2>

          {filteredBooks.length === 0 ? (
            <div className="catalog__empty">
              <img
                className="catalog__empty-illustration"
                width="184"
                height="160"
                src="/illustrations/no-results.svg"
                alt=""
              />
              <p>No encontramos libros con esa búsqueda. Probá con otro título, autor o género.</p>
            </div>
          ) : isWide ? (
            <div className="library-grid">
              {visibleBooks.map((book) => (
                <LibraryBookCard key={book.id} book={book} status={getBookStatus(book)} />
              ))}
            </div>
          ) : (
            <div className="catalog__list">
              {visibleBooks.map((book) => (
                <BookRow
                  key={book.id}
                  id={book.id}
                  title={book.title}
                  author={book.author}
                  status={getBookStatus(book)}
                  copies={book.copies.length}
                  coverColor={book.coverColor}
                  coverSrc={book.coverUrl}
                />
              ))}
            </div>
          )}

          {hiddenCount > 0 && (
            <Button variant="ghost" icon="arrows-button-down" onClick={() => setShowAll(true)}>
              Ver más ({hiddenCount})
            </Button>
          )}
        </section>
      </div>
    </main>
  )
}

export default HomePage