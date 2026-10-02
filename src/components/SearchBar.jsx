import './SearchBar.css'
import Icon from './Icon'

function SearchBar() {
  return (
    <label className="search">
      <Icon name="search" size={16} className="search__icon" />
      <input
        className="search__input"
        type="search"
        placeholder="Busca por titulo o autor"
        aria-label="Buscar libros por título o autor"
      />
    </label>
  )
}

export default SearchBar