import { useState } from 'react'
import { useOutletContext } from 'react-router'
import './CatalogHomePage.css'
import CatalogHeader from '../../components/CatalogHeader'
import GenreFilters from '../../components/GenreFilters'
import SectionHeader from '../../components/SectionHeader'
import CatalogBookCard from '../../components/CatalogBookCard'
import CatalogFooter from '../../components/CatalogFooter'
import Button from '../../components/Button'
import { genres } from '../../data/genres'
import { normalize } from '../../utils/text'

const ROW_SIZE = 8
const PAGE_SIZE = 6

function CatalogHomePage() {
  const { books } = useOutletContext()
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState('Todos')
  const [showAll, setShowAll] = useState(false)

  // Solo los géneros que tienen al menos un libro
  const genreOptions = genres.filter((g) => g === 'Todos' || books.some((b) => b.genre === g))

  // Las filas: los libros ya llegan ordenados del más nuevo al más viejo
  const newest = books.slice(0, ROW_SIZE)
  const topRated = [...books].sort((a, b) => b.rating - a.rating).slice(0, ROW_SIZE)

  // La grilla: filtrada por género y búsqueda
  const search = normalize(query)
  const filtered = books.filter((book) => {
    const matchesGenre = genre === 'Todos' || book.genre === genre
    const matchesSearch =
      normalize(book.title).includes(search) || normalize(book.author).includes(search)
    return matchesGenre && matchesSearch
  })

  const isFiltering = search !== '' || genre !== 'Todos'
  const visible = showAll ? filtered : filtered.slice(0, PAGE_SIZE)
  const hiddenCount = filtered.length - visible.length

  const countText = [
    `${filtered.length} ${filtered.length === 1 ? 'título' : 'títulos'}`,
    genre !== 'Todos' && genre,
  ]
    .filter(Boolean)
    .join(' · ')

  return (
    <main className="catalog-page">
      <CatalogHeader query={query} onQueryChange={setQuery} />

      <div className="catalog-filters">
        <GenreFilters selected={genre} onChange={setGenre} options={genreOptions} />
      </div>

      <section className="catalog-section">
        <div className="catalog-section__header">
          <SectionHeader
            title="Recién llegados"
            subtitle="Lo último que sumó Mica"
            to="/catalogo/recien-llegados"
          />
        </div>
        <div className="catalog-row">
          {newest.map((book) => (
            <CatalogBookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      <section className="catalog-section">
        <div className="catalog-section__header">
          <SectionHeader
            title="Mejor valorados"
            subtitle="Los que más le gustaron"
            to="/catalogo/mejor-valorados"
          />
        </div>
        <div className="catalog-row">
          {topRated.map((book) => (
            <CatalogBookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      <section className="catalog-grid-section">
        <div className="catalog-grid-section__title">
          <h2>{isFiltering ? 'Resultados' : 'Todos los libros'}</h2>
          <p aria-live="polite">{countText}</p>
        </div>

        {filtered.length === 0 ? (
          <p className="placeholder">No encontramos libros con esa búsqueda.</p>
        ) : (
          <div className="catalog-grid">
            {visible.map((book) => (
              <CatalogBookCard key={book.id} book={book} size="grid" />
            ))}
          </div>
        )}

        {hiddenCount > 0 && (
          <Button variant="ghost" icon="arrows-button-down" onClick={() => setShowAll(true)}>
            Ver más ({hiddenCount})
          </Button>
        )}
      </section>

      <CatalogFooter />
    </main>
  )
}

export default CatalogHomePage