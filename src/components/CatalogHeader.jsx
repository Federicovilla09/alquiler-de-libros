import './CatalogHeader.css'
import SearchBar from './SearchBar'

function CatalogHeader({ query, onQueryChange }) {
  return (
    <header className="catalog-header">
      <div className="catalog-header__brand">
        <img className="catalog-header__logo" src="/brand/logo.svg" alt="Biblioteca de Letrita" />
        <p className="catalog-header__tagline">Alquiler de libros · 15 o 30 días</p>
      </div>
      <SearchBar value={query} onChange={onQueryChange} placeholder="Buscá por título o autor/a" />
    </header>
  )
}

export default CatalogHeader