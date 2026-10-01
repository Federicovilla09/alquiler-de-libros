import './App.css'
import BookRow from './components/BookRow'
import { books } from './data/books'

function App() {
  return (
    <main className="app">
      <section className="catalog">
        <h2 className="catalog__title">12 títulos en tu biblioteca</h2>
        <div className="catalog__list">
          {books.map((book) => (
            <BookRow
              key={book.id}
              title={book.title}
              author={book.author}
              status={book.status}
              copies={book.copies}
              coverColor={book.coverColor}
            />
          ))}
        </div>
      </section>
    </main>
  )
}

export default App
