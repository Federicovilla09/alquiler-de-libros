import HomeHeader from '../components/HomeHeader'
import SearchBar from '../components/SearchBar'
import GenreFilters from '../components/GenreFilters'
import BookRow from '../components/BookRow'
import Button from '../components/Button'
import BottomNav from '../components/BottomNav'
import { getBookStatus } from '../data/books'
import { alerts } from '../data/alerts'
import { useLibrary } from '../store/LibraryContext'

function HomePage() {
  const { books } = useLibrary()

  return (
    <main className="app">
      <HomeHeader alerts={alerts} />
      <div className="content">
        <SearchBar />
        <GenreFilters />
        <section className="catalog">
          <h2 className="catalog__title">12 títulos en tu biblioteca</h2>
          <div className="catalog__list">
            {books.map((book) => (
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
          <Button variant="ghost" icon="arrows-button-down">
            Ver más (2)
          </Button>
        </section>
      </div>
      <BottomNav />
    </main>
  )
}

export default HomePage