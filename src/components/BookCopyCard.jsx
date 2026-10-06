import { useState } from 'react'
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
  onReserve,
  onCancelReservation,
  onConfirmDelivery,
  onRenew,
  onReturn,
}) {
  // El paso intermedio en el que está Micaela: ninguno, el formulario o el plazo
  const [mode, setMode] = useState('idle')
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState(null)
  const [plan, setPlan] = useState('')
  const [planError, setPlanError] = useState(null)

  // Qué variante mostrar: el dato del ejemplar más el paso intermedio
  let view = state
  if (state === 'available' && mode === 'form') view = 'reservation-form'
  if (state === 'reserved' && mode === 'delivery') view = 'delivery'

  function startReservation() {
    setName('')
    setNameError(null)
    setMode('form')
  }

  function confirmReservation() {
    if (name.trim() === '') {
      setNameError('Ingresá quién reserva el libro')
      return
    }
    setMode('idle')
    if (onReserve) onReserve(name.trim())
  }

  function cancelReservation() {
    setMode('idle')
    if (onCancelReservation) onCancelReservation()
  }

  function confirmDelivery() {
    if (mode !== 'delivery') {
      setPlan('')
      setPlanError(null)
      setMode('delivery')
      return
    }
    if (plan === '') {
      setPlanError('Elegí un plazo para el alquiler')
      return
    }
    if (onConfirmDelivery) onConfirmDelivery(plan)
  }

  return (
    <article className={`copy-card copy-card--${view}`}>
      <div className="copy-card__summary">
        <div className="copy-card__status">
          <StatusIndicator type="neutral">Ejemplar {copyNumber}</StatusIndicator>
          {condition && (
            <TagChoice variant="condition" readOnly>
              {condition}
            </TagChoice>
          )}
        </div>
        <StatusStepper step={STEP_BY_STATE[view]} />
      </div>

      {view === 'available' && <Button onClick={startReservation}>Reservar</Button>}

      {view === 'reservation-form' && (
        <div className="copy-card__content">
          <TextField
            label="¿Para quién?"
            placeholder="Nombre y apellido"
            autoFocus
            error={nameError}
            onChange={(event) => {
              setName(event.target.value)
              if (nameError) setNameError(null)
            }}
          />
          <div className="copy-card__actions">
            <Button onClick={confirmReservation}>Confirmar</Button>
            <Button variant="secondary" onClick={() => setMode('idle')}>
              Cancelar
            </Button>
          </div>
        </div>
      )}

      {(view === 'reserved' || view === 'delivery') && (
        <div className="copy-card__content">
          <div className="copy-card__fields">
            <TextField label="Para:" defaultValue={borrower} />
            {view === 'delivery' && (
              <SelectField
                label="Fecha de devolución"
                placeholder="Elegí un plazo"
                options={returnOptions}
                error={planError}
                onChange={(option) => {
                  setPlan(option)
                  setPlanError(null)
                }}
              />
            )}
          </div>
          <div className="copy-card__actions">
            <Button onClick={confirmDelivery}>Confirmar entrega</Button>
            <Button variant="secondary" onClick={cancelReservation}>
              Cancelar reserva
            </Button>
          </div>
        </div>
      )}

      {view === 'rented' && (
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
            <Button onClick={onRenew}>Renovar alquiler</Button>
            <Button variant="secondary" onClick={onReturn}>
              Devolver a la biblioteca
            </Button>
          </div>
        </div>
      )}
    </article>
  )
}

export default BookCopyCard