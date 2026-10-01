import './GenreFilters.css'
import { genres } from '../data/genres'

function GenreFilters() {
  const selected = 'Todos'

  return (
    <div className="genre-filters">
      {genres.map((genre) => (
        <button
          key={genre}
          className={genre === selected ? 'genre-chip genre-chip--selected' : 'genre-chip'}
          aria-pressed={genre === selected}
        >
          {genre}
        </button>
      ))}
    </div>
  )
}

export default GenreFilters