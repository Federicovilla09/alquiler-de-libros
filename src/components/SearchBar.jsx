import './SearchBar.css'
import Icon from './Icon'

function SearchBar({ value, onChange }) {
  return (
    <label className="search">
      <Icon name="search" size={16} className="search__icon" />
      <input
        className="search__input"
        type="search"
        placeholder="Busca por titulo o autor"
        aria-label="Buscar libros por título o autor"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  )
}

export default SearchBar