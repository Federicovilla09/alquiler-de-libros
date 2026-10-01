import './SearchBar.css'

function SearchBar() {
  return (
    <label className="search">
      <img className="search__icon" src="/icons/search.svg" alt="" />
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