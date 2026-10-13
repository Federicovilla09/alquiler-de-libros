import './CatalogFooter.css'

function CatalogFooter() {
  return (
    <footer className="catalog-footer">
      <figure className="catalog-footer__quote">
        <span className="catalog-footer__mark" aria-hidden="true">
          “
        </span>
        <blockquote>
          Hay que tener cuidado con los libros, y con lo que contienen, porque las palabras tienen el
          poder de cambiarnos
        </blockquote>
        <figcaption>— Cassandra Clare, Ángel mecánico</figcaption>
      </figure>
      <span className="catalog-footer__divider" aria-hidden="true" />
      <div className="catalog-footer__brand">
        <img className="catalog-footer__logo" width="140" height="111" src="/brand/logo.svg" alt="Biblioteca de Letrita" />
        <p className="catalog-footer__tagline">Federico Villanueva - Diseño y desarrollo web</p>
      </div>
    </footer>
  )
}

export default CatalogFooter