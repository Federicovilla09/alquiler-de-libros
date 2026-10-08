import { useState } from 'react'
import HomeHeader from '../components/HomeHeader'
import SearchBar from '../components/SearchBar'
import GenreFilters from '../components/GenreFilters'
import BookRow from '../components/BookRow'
import Button from '../components/Button'
import BottomNav from '../components/BottomNav'
import ScreenLoader from '../components/ScreenLoader'
import { getBookStatus } from '../data/books'
import { useLibrary } from '../store/LibraryContext'
import { getLoans } from '../utils/loans'
import { getAlerts } from '../utils/alerts'
import { normalize } from '../utils/text'

const PAGE_SIZE = 10

function HomePage() {
  // 1. Primero, todos los "use..."
  const { books, loading, loadError } = useLibrary()
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState('Todos')
  const [showAll, setShowAll] = useState(false)

  // 2. Después, los casos especiales
  if (loading) return <ScreenLoader />
  if (loadError) return <p className="placeholder screen-error">{loadError}</p>

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
  const visibleBooks = showAll ? filteredBooks : filteredBooks.slice(0, PAGE_SIZE)
  const hiddenCount = filteredBooks.length - visibleBooks.length

  return (
    <main className="app">
      <HomeHeader alerts={alerts} />
      <div className="content">
        <SearchBar value={query} onChange={setQuery} />
        <GenreFilters selected={genre} onChange={setGenre} />

        <section className="catalog">
          <h2 className="catalog__title" aria-live="polite">
            {isFiltering
              ? `${filteredBooks.length} de ${books.length} títulos`
              : `${books.length} títulos en tu biblioteca`}
          </h2>

          {filteredBooks.length === 0 ? (
            <div className="catalog__empty">
              <img className="catalog__empty-illustration" src="/illustrations/no-results.svg" alt="" />
              <p>No encontramos libros con esa búsqueda. Probá con otro título, autor o género.</p>
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
      <BottomNav />
    </main>
  )
}

export default HomePage