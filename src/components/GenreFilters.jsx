import './GenreFilters.css'
import TagFilter from './TagFilter'
import { genres } from '../data/genres'

function GenreFilters() {
  const selected = 'Todos'

  return (
    <div className="genre-filters">
      {genres.map((genre) => (
        <TagFilter key={genre} selected={genre === selected}>
          {genre}
        </TagFilter>
      ))}
    </div>
  )
}

export default GenreFilters