import './BookCopyCard.css'
import StatusIndicator from './StatusIndicator'
import TagChoice from './TagChoice'
import StatusStepper from './StatusStepper'
import TextField from './TextField'
import SelectField from './SelectField'
import Button from './Button'

const STEP_BY_STATE = {
  available: 'available',
  'reservation-form': 'available',
  reserved: 'reserved',
  delivery: 'reserved',
  rented: 'rented',
}

function BookCopyCard({
  state = 'available',
  copyNumber = 1,
  condition,
  borrower,
  returnDate,
  returnOptions = [],
}) {
  return (
    <article className={`copy-card copy-card--${state}`}>
      <div className="copy-card__summary">
        <div className="copy-card__status">
          <StatusIndicator type="neutral">Ejemplar {copyNumber}</StatusIndicator>
          {condition && (
            <TagChoice variant="condition" readOnly>
              {condition}
            </TagChoice>
          )}
        </div>
        <StatusStepper step={STEP_BY_STATE[state]} />
      </div>

      {state === 'available' && <Button>Reservar</Button>}

      {state === 'reservation-form' && (
        <div className="copy-card__content">
          <TextField label="¿Para quién?" placeholder="Nombre y apellido" />
          <div className="copy-card__actions">
            <Button>Confirmar</Button>
            <Button variant="secondary">Cancelar</Button>
          </div>
        </div>
      )}

      {(state === 'reserved' || state === 'delivery') && (
        <div className="copy-card__content">
          <div className="copy-card__fields">
            <TextField label="Para:" defaultValue={borrower} />
            {state === 'delivery' && (
              <SelectField
                label="Fecha de devolución"
                placeholder="Elegí un plazo"
                options={returnOptions}
              />
            )}
          </div>
          <div className="copy-card__actions">
            <Button>Confirmar entrega</Button>
            <Button variant="secondary">Cancelar reserva</Button>
          </div>
        </div>
      )}

      {state === 'rented' && (
        <div className="copy-card__content">
          <div className="copy-card__info">
            <div className="copy-card__info-item">
              <span className="copy-card__info-label">Lo tiene</span>
              <span className="copy-card__info-value">{borrower}</span>
            </div>
            <div className="copy-card__info-item">
              <span className="copy-card__info-label">Vuelve el</span>
              <span className="copy-card__info-value">{returnDate}</span>
            </div>
          </div>
          <div className="copy-card__actions">
            <Button>Renovar alquiler</Button>
            <Button variant="secondary">Devolver a la biblioteca</Button>
          </div>
        </div>
      )}
    </article>
  )
}

export default BookCopyCard