import { Fragment } from 'react'
import './StatusStepper.css'

const STEPS = [
  { id: 'available', label: 'Disponible' },
  { id: 'reserved', label: 'Reservado' },
  { id: 'rented', label: 'Alquilado' },
]

function StatusStepper({ step = 'available' }) {
  const current = STEPS.findIndex((s) => s.id === step)

  function stateOf(index) {
    if (index < current) return 'done'
    if (index === current) return 'current'
    return 'future'
  }

  return (
    <div className="status-stepper">
      <div className="status-stepper__track" aria-hidden="true">
        {STEPS.map((s, index) => (
          <Fragment key={s.id}>
            {index > 0 && (
              <span className={`status-stepper__line status-stepper__line--${index <= current ? 'done' : 'pending'}`} />
            )}
            <span className={`status-stepper__dot status-stepper__dot--${stateOf(index)}`} />
          </Fragment>
        ))}
      </div>
      <ol className="status-stepper__labels">
        {STEPS.map((s, index) => (
          <li
            key={s.id}
            className={`status-stepper__label status-stepper__label--${stateOf(index)}`}
            aria-current={index === current ? 'step' : undefined}
          >
            {s.label}
          </li>
        ))}
      </ol>
    </div>
  )
}

export default StatusStepper