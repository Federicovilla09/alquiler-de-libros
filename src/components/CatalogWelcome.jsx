import './CatalogWelcome.css'
import Button from './Button'

const STEPS = [
  'Explorá el catálogo y elegí tu próximo libro',
  'Consultá por WhatsApp con un toque',
  'Coordinás la entrega y el pago con Mica',
]

function CatalogWelcome({ onStart }) {
  return (
    <main className="welcome">
      <span className="welcome__deco welcome__deco--top" aria-hidden="true" />
      <span className="welcome__deco welcome__deco--bottom" aria-hidden="true" />

      <div className="welcome__content">
        <img className="welcome__logo" src="/brand/logo.svg" alt="Biblioteca de Letrita" />
        <p className="welcome__subtitle">Libros elegidos por Mica para alquilar por 15 o 30 días.</p>

        <ol className="welcome__steps">
          {STEPS.map((step, index) => (
            <li key={step} className="welcome__step">
              <span className="welcome__number" aria-hidden="true">
                {index + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>

        <Button onClick={onStart}>Recorrer la biblioteca</Button>
      </div>
    </main>
  )
}

export default CatalogWelcome