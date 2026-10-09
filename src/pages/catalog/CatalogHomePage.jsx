import { useState } from 'react'
import { useOutletContext } from 'react-router'
import './CatalogHomePage.css'
import CatalogHeader from '../../components/CatalogHeader'
import CatalogWelcome from '../../components/CatalogWelcome'
import FeaturedCarousel from '../../components/FeaturedCarousel'
import GenreFilters from '../../components/GenreFilters'
import TagChoice from '../../components/TagChoice'
import SectionHeader from '../../components/SectionHeader'
import CatalogBookCard from '../../components/CatalogBookCard'
import CatalogNoResults from '../../components/CatalogNoResults'
import CatalogFooter from '../../components/CatalogFooter'
import Button from '../../components/Button'
import { genres } from '../../data/genres'
import { normalize } from '../../utils/text'

const FEATURED_SIZE = 3
const ROW_SIZE = 8
const PAGE_SIZE = 6

// ← 1. La clave y la función van acá, junto a las constantes
const WELCOME_KEY = 'letrita:welcome-seen'

// ¿Ya vio la bienvenida en este navegador?
function hasSeenWelcome() {
  try {
    return localStorage.getItem(WELCOME_KEY) === 'yes'
  } catch {
    return true
  }
}

function CatalogHomePage() {
  const { books } = useOutletContext()
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState('Todos')
  const [trope, setTrope] = useState(null)
  const [showAll, setShowAll] = useState(false)
  // ← 2. El estado de la bienvenida, junto a los otros useState
  const [showWelcome, setShowWelcome] = useState(() => !hasSeenWelcome())

  // Al cambiar de género, el tropo elegido deja de tener sentido
  function changeGenre(nextGenre) {
    setGenre(nextGenre)
    setTrope(null)
  }

  // Los recomendados por Mica, hasta tres
  const featured = books.filter((book) => book.recommended).slice(0, FEATURED_SIZE)

  // Solo los géneros que tienen al menos un libro
  const genreOptions = genres.filter((g) => g === 'Todos' || books.some((b) => b.genre === g))

  // Los tropos de los libros del género elegido, sin repetir
  const genreTropes =
    genre === 'Todos'
      ? []
      : [...new Set(books.filter((b) => b.genre === genre).flatMap((b) => b.tropes))]

  // Las filas: los libros ya llegan ordenados del más nuevo al más viejo
  const newest = books.slice(0, ROW_SIZE)
  const topRated = [...books].sort((a, b) => b.rating - a.rating).slice(0, ROW_SIZE)

  // La grilla: filtrada por género, tropo y búsqueda
  const search = normalize(query)
  const filtered = books.filter((book) => {
    const matchesGenre = genre === 'Todos' || book.genre === genre
    const matchesTrope = !trope || book.tropes.includes(trope)
    const matchesSearch =
      normalize(book.title).includes(search) || normalize(book.author).includes(search)
    return matchesGenre && matchesTrope && matchesSearch
  })

  const isFiltering = search !== '' || genre !== 'Todos'
  const visible = showAll ? filtered : filtered.slice(0, PAGE_SIZE)
  const hiddenCount = filtered.length - visible.length

  const countText = [
    `${filtered.length} ${filtered.length === 1 ? 'título' : 'títulos'}`,
    genre !== 'Todos' && genre,
    trope,
  ]
    .filter(Boolean)
    .join(' · ')

  // ← 3. La primera visita muestra la bienvenida en lugar del catálogo
  if (showWelcome) {
    return (
      <CatalogWelcome
        onStart={() => {
          try {
            localStorage.setItem(WELCOME_KEY, 'yes')
          } catch {
            // Si el navegador no deja guardar, la bienvenida se cierra igual
          }
          setShowWelcome(false)
        }}
      />
    )
  }

  if (showWelcome) {
    return (
      <CatalogWelcome
        onStart={() => {
          try {
            localStorage.setItem(WELCOME_KEY, 'yes')
          } catch {
            // Si el navegador no deja guardar, la bienvenida se cierra igual
          }
          setShowWelcome(false)
        }}
      />
    )
  }

  // Una búsqueda sin resultados reemplaza todo el contenido
  if (search !== '' && filtered.length === 0) {
    return (
      <main className="catalog-page">
        <CatalogHeader query={query} onQueryChange={setQuery} />
        <CatalogNoResults query={query.trim()} onShowAll={() => setQuery('')} />
        <CatalogFooter />
      </main>
    )
  }

  return (
    <main className="catalog-page">
      <CatalogHeader query={query} onQueryChange={setQuery} />

      {featured.length > 0 && (
        <section className="catalog-featured">
          <h2 className="catalog-featured__title">Recomendados por Mica</h2>
          <FeaturedCarousel books={featured} />
        </section>
      )}

      <div className="catalog-filters">
        <GenreFilters selected={genre} onChange={changeGenre} options={genreOptions} />

        {genreTropes.length > 0 && (
          <div className="catalog-filters__tropes">
            <p className="catalog-filters__label">Tropes de {genre}</p>
            <div className="catalog-filters__trope-list">
              {genreTropes.map((t) => (
                <TagChoice key={t} selected={t === trope} onClick={() => setTrope(t === trope ? null : t)}>
                  {t}
                </TagChoice>
              ))}
            </div>
          </div>
        )}
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

        <div className="catalog-grid">
          {visible.map((book) => (
            <CatalogBookCard key={book.id} book={book} size="grid" />
          ))}
        </div>

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