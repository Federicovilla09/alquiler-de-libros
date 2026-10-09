import './SearchBar.css'
import Icon from './Icon'

function SearchBar({ value, onChange, placeholder = 'Busca por titulo o autor' }) {
  return (
    <label className="search">
      <Icon name="search" size={16} className="search__icon" />
      <input
        className="search__input"
        type="search"
        placeholder={placeholder}
        aria-label="Buscar libros por título o autor"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  )
}

export default SearchBar