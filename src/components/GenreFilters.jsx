import './GenreFilters.css'
import TagFilter from './TagFilter'
import { genres } from '../data/genres'

function GenreFilters({ selected, onChange }) {
  return (
    <div className="genre-filters">
      {genres.map((genre) => (
        <TagFilter key={genre} selected={genre === selected} onClick={() => onChange(genre)}>
          {genre}
        </TagFilter>
      ))}
    </div>
  )
}

export default GenreFilters