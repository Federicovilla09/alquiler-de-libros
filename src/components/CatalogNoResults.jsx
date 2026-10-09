import './CatalogNoResults.css'
import Icon from './Icon'
import { searchMessage, whatsappLink } from '../utils/whatsapp'

function CatalogNoResults({ query, onShowAll }) {
  return (
    <div className="catalog-no-results">
      <span className="catalog-no-results__icon">
        <Icon name="search" size={28} />
      </span>
      <h2 className="catalog-no-results__title">No encontramos «{query}»</h2>
      <p className="catalog-no-results__text">
        Puede que Mica todavía no lo tenga. Escribile: quizás lo consigue o te recomienda algo parecido.
      </p>
      <a
        className="button button--secondary"
        href={whatsappLink(searchMessage(query))}
        target="_blank"
        rel="noopener noreferrer"
      >
        Preguntarle a Mica por WhatsApp
      </a>
      <button type="button" className="catalog-no-results__link" onClick={onShowAll}>
        Ver todo el catálogo
      </button>
    </div>
  )
}

export default CatalogNoResults