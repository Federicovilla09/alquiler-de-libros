import { Link, useOutletContext, useParams } from 'react-router'
import './CatalogBookPage.css'
import NavigationHeader from '../../components/NavigationHeader'
import Icon from '../../components/Icon'
import TagChoice from '../../components/TagChoice'
import { formatPrice } from '../../data/books'
import { askMessage, waitlistMessage, whatsappLink } from '../../utils/whatsapp'

const STARS = [1, 2, 3, 4, 5]

function CatalogBookPage() {
  const { id } = useParams()
  const { books } = useOutletContext()
  const book = books.find((b) => b.id === Number(id))

  if (!book) {
    return (
      <main className="catalog-page">
        <NavigationHeader title="Catálogo" backTo="/catalogo" />
        <p className="placeholder screen-error">No encontramos este libro.</p>
      </main>
    )
  }

  // Los tomos de la misma saga, en orden
  const saga = book.series
    ? books.filter((b) => b.series === book.series).sort((a, b) => (a.volume ?? 0) - (b.volume ?? 0))
    : []

  const message = book.available ? askMessage(book) : waitlistMessage(book)

  return (
    <main className="catalog-page">
      <NavigationHeader title="Catálogo" backTo="/catalogo" />

      <div className="catalog-book">
        <section className="catalog-book__hero">
          <div className="catalog-book__cover" style={{ backgroundColor: book.coverColor }}>
            {book.coverUrl && <img src={book.coverUrl} alt="" />}
          </div>

          <div className="catalog-book__info">
            <div className="catalog-book__badges">
              {book.genre && <span className="catalog-book__genre">{book.genre}</span>}
              {book.audience && book.audience !== 'Todo público' && (
                <span className={book.audience === '+15' ? 'content-badge' : 'content-badge content-badge--adult'}>
                  {book.audience}
                </span>
              )}
            </div>
            <h1 className="catalog-book__title">{book.title}</h1>
            <p className="catalog-book__author">{book.author}</p>
            <div
              className="catalog-book__rating"
              role="img"
              aria-label={`Puntaje de Mica: ${book.rating} de 5 estrellas`}
            >
              {STARS.map((n) => (
                <Icon key={n} name="star" filled={n <= book.rating} />
              ))}
            </div>
            <p
              className={
                book.available
                  ? 'catalog-book__availability catalog-book__availability--available'
                  : 'catalog-book__availability'
              }
            >
              <span className="catalog-book__dot" aria-hidden="true" />
              {book.available ? 'Disponible' : 'No disponible por ahora'}
            </p>
            {book.condition && <p className="catalog-book__condition">Estado: {book.condition}</p>}
          </div>
        </section>

        <section className="catalog-book__prices" aria-label="Precios de alquiler">
          <div className="catalog-book__price catalog-book__price--main">
            <p className="catalog-book__price-label">15 días</p>
            <p className="catalog-book__price-value">{formatPrice(book.price15)}</p>
          </div>
          <div className="catalog-book__price">
            <p className="catalog-book__price-label">30 días</p>
            <p className="catalog-book__price-value">{formatPrice(book.price30)}</p>
          </div>
        </section>

        <div className="catalog-book__cta">
          <a
            className="button button--primary"
            href={whatsappLink(message)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {book.available ? 'Consultar por WhatsApp' : 'Avisame cuando vuelva'}
          </a>
          <p className="catalog-book__helper">
            {book.available
              ? 'Se abre WhatsApp con un mensaje listo para enviarle a Mica.'
              : 'Le escribís a Mica por WhatsApp y te avisa apenas vuelva.'}
          </p>
        </div>

        {book.quote && <blockquote className="catalog-book__quote">{book.quote}</blockquote>}

        {book.tropes.length > 0 && (
          <section className="catalog-book__block">
            <h2>Tropes</h2>
            <div className="catalog-book__tropes">
              {book.tropes.map((t) => (
                <TagChoice key={t} variant="trope" readOnly>
                  {t}
                </TagChoice>
              ))}
            </div>
          </section>
        )}

        {book.synopsis && (
          <section className="catalog-book__block">
            <h2>Sinopsis</h2>
            <p className="catalog-book__synopsis">{book.synopsis}</p>
          </section>
        )}

        {saga.length > 1 && (
          <section className="catalog-saga">
            <div>
              <h2 className="catalog-saga__title">Parte de la saga {book.series}</h2>
              <p className="catalog-saga__subtitle">{saga.length} tomos · se alquilan por separado</p>
            </div>
            <div className="catalog-saga__list">
              {saga.map((tomo) => {
                const isCurrent = tomo.id === book.id
                const content = (
                  <>
                    <div className="saga-item__cover" style={{ backgroundColor: tomo.coverColor }}>
                      {tomo.coverUrl && <img src={tomo.coverUrl} alt="" />}
                    </div>
                    <p className="saga-item__volume">Vol. {tomo.volume ?? '–'}</p>
                    {isCurrent ? (
                      <p className="saga-item__status saga-item__status--current">Estás acá</p>
                    ) : (
                      <p
                        className={
                          tomo.available
                            ? 'saga-item__status saga-item__status--available'
                            : 'saga-item__status'
                        }
                      >
                        <span className="saga-item__dot" aria-hidden="true" />
                        {tomo.available ? 'Disponible' : 'No disponible'}
                      </p>
                    )}
                  </>
                )

                return isCurrent ? (
                  <div key={tomo.id} className="saga-item saga-item--current" aria-current="page">
                    {content}
                  </div>
                ) : (
                  <Link key={tomo.id} to={`/catalogo/libro/${tomo.id}`} className="saga-item">
                    {content}
                  </Link>
                )
              })}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}

export default CatalogBookPage