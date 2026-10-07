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
  renewal: 'rented',
}

function BookCopyCard({
  state = 'available',
  copyNumber = 1,
  condition,
  borrower,
  returnDate,
  returnOptions = [],
  renewOptions = [],
  onReserve,
  onCancelReservation,
  onConfirmDelivery,
  onConfirmRenewal,
  onReturn,
}) {
  // El paso intermedio: ninguno, el formulario, el plazo de entrega o el de renovación
  const [mode, setMode] = useState('idle')
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState(null)
  const [plan, setPlan] = useState('')
  const [planError, setPlanError] = useState(null)

  let view = state
  if (state === 'available' && mode === 'form') view = 'reservation-form'
  if (state === 'reserved' && mode === 'delivery') view = 'delivery'
  if (state === 'rented' && mode === 'renew') view = 'renewal'

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

  function startPlan(nextMode) {
    setPlan('')
    setPlanError(null)
    setMode(nextMode)
  }

  function confirmDelivery() {
    if (mode !== 'delivery') {
      startPlan('delivery')
      return
    }
    if (plan === '') {
      setPlanError('Elegí un plazo para el alquiler')
      return
    }
    if (onConfirmDelivery) onConfirmDelivery(plan)
  }

  function confirmRenewal() {
    if (plan === '') {
      setPlanError('Elegí un plazo para renovar')
      return
    }
    setMode('idle')
    if (onConfirmRenewal) onConfirmRenewal(plan)
  }

  function handlePlanChange(option) {
    setPlan(option)
    setPlanError(null)
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
                onChange={handlePlanChange}
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

      {(view === 'rented' || view === 'renewal') && (
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

          {view === 'renewal' && (
            <SelectField
              label="Nuevo plazo"
              placeholder="Elegí un plazo"
              options={renewOptions}
              error={planError}
              onChange={handlePlanChange}
            />
          )}

          {view === 'rented' ? (
            <div className="copy-card__actions">
              <Button onClick={() => startPlan('renew')}>Renovar alquiler</Button>
              <Button variant="secondary" onClick={onReturn}>
                Devolver a la biblioteca
              </Button>
            </div>
          ) : (
            <div className="copy-card__actions">
              <Button onClick={confirmRenewal}>Confirmar renovación</Button>
              <Button variant="secondary" onClick={() => setMode('idle')}>
                Cancelar
              </Button>
            </div>
          )}
        </div>
      )}
    </article>
  )
}

export default BookCopyCard